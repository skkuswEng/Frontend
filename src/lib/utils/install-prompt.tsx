'use client'
import React, { ReactNode, useEffect, useState } from 'react'

import Backdrop from '@/src/components/common/Backdrop'
import Logo from '@/src/components/common/Logo'
import LucideIcon from '@/src/components/provider/LucideIcon'
import { Button } from '@/src/components/ui/button'

import { BeforeInstallPromptEvent, useInstallPromptStore } from '../context/deffered-prompt'
import { cn } from './cn'

const InstallPrompt = () => {
  const { deferredPrompt, setDeferredPrompt, showPrompt, setShowPrompt, triggerInstall } = useInstallPromptStore()
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    console.log('useEffect entered!')
    const handleBeforeInstallPrompt = (e: Event) => {
      // e.preventDefault()
      console.log('added handleBeforeInstallPrompt listener')

      setDeferredPrompt(prev => {
        return prev || (e as BeforeInstallPromptEvent)
      })
      if (!window.matchMedia('(display-mode: standalone)').matches && showPrompt) {
        setIsShow(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])
  useEffect(() => {
    console.log('deferredPrompt:', deferredPrompt)
  }, [deferredPrompt])

  useEffect(() => {
    console.log('isShow:', isShow)
  }, [isShow])
  useEffect(() => {
    console.log('showPrompt:', showPrompt)
  }, [showPrompt])

  //Functions
  const closeHandler = () => {
    setIsShow(false)
    setShowPrompt(false)
  }

  if (!isShow) return null

  return (
    <>
      <Backdrop className='fixed z-[60] h-screen w-screen' />
      <div className='fixed bottom-8 z-[60] flex aspect-card w-4/5 max-w-[350px] flex-col items-center justify-start gap-4 rounded-2xl bg-swWhite py-4'>
        <LucideIcon name='X' className='self-end px-4' size={26} onClick={closeHandler} />
        <Logo text='SoKK' className='font-sen text-6xl font-bold' />
        <p className='text-center font-semibold'>
          홈 화면에 SoKK 앱을 추가하고
          <br />
          편리하게 사용하세요.
        </p>
        <Button variant='swLightGreen' className='rounded-full' onClick={triggerInstall}>
          홈 화면에 추가하기
        </Button>
        <p className='cursor-pointer border-b border-solid border-swGrayDark text-sm text-swGrayDark' onClick={closeHandler}>
          오늘은 웹으로 볼게요
        </p>
      </div>
    </>
  )
}

export default InstallPrompt

interface InstallLinkProps {
  className?: string
  onClick?: () => void
  children: ReactNode
}
export const InstallLink = ({ className, onClick, children }: InstallLinkProps): ReactNode => {
  const { triggerInstall } = useInstallPromptStore()

  return (
    <p
      onClick={() => {
        // if (onClick) onClick()
        triggerInstall()
        // console.log('clciekd')
      }}
      className={cn(className)}
    >
      {children}
    </p>
  )
}
