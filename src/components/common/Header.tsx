'use client'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/src/lib/constants/route'
import useAuthStore from '@/src/lib/context/authContext'
import ToggleWrapper, { useDropdown } from '@/src/lib/hooks/useToggle'
import { cn } from '@/src/lib/utils/cn'
import { InstallLink } from '@/src/lib/utils/install-prompt'
import { Nullable } from '@/src/lib/utils/typeUtils'

import LucideIcon from '../provider/LucideIcon'
import { Button } from '../ui/button'
import Backdrop from './Backdrop'
import Logo from './Logo'

const Header = (): ReactNode => {
  const { studentId, name } = useAuthStore()
  return (
    <>
      <MobileHeader studentId={studentId} name={name} className='flex lg:hidden' />
      <DesktopHeader studentId={studentId} name={name} className='hidden lg:flex' />
    </>
  )
}

interface HeaderProps {
  studentId: Nullable<string>
  name: Nullable<string>
  className?: string
}
export default Header

const DesktopHeader = ({ studentId, name, className }: HeaderProps) => {
  let isLogin: boolean = false
  if (studentId && name) {
    isLogin = true
  }
  const linkStyle = 'flex items-center justify-center text-lg font-bold hover:border-b hover:border-black hover:border-solid'
  return (
    <div
      className={cn(
        'relative z-10 mt-8 flex h-16 w-[90%] max-w-[1800px] items-center justify-between gap-14 rounded-full bg-swWhite px-12 py-7',
        className,
      )}
    >
      <Link href={ROUTES.MAIN.url}>
        <Logo text='SoKK' className='text-4xl' />
      </Link>
      {/* <p className='text-base font-semibold'>지능형 소프트웨어학과 라운지 AI 좌석 배정 시스템</p> */}
      <div className='flex w-max items-center justify-between gap-36'>
        <Link href={ROUTES.ROOM.RESERVE.STEP1.url} className={linkStyle}>
          스터디룸 예약
        </Link>
        <Link href={ROUTES.SEAT.RESERVE(-1).url} className={linkStyle}>
          좌석 배정
        </Link>
        <Link href={ROUTES.RULES.url} className={linkStyle}>
          이용 수칙
        </Link>
      </div>
      <div className='flex cursor-pointer items-center justify-center gap-8 px-3 py-1 text-lg font-bold'>
        <LucideIcon name='Bell' size={20} />
        {!isLogin ? (
          <Link href={ROUTES.AUTH.LOGIN.url}>로그인</Link>
        ) : (
          <span>
            {studentId} / {name}
          </span>
        )}
      </div>
    </div>
  )
}

const MobileHeader = ({ studentId, name, className }: HeaderProps) => {
  const {
    refs: [buttonRef, dropdownRef],
    isOpen: isOpenMenu,
    toggleDropdown,
  } = useDropdown()
  let isLogin: boolean = false
  if (studentId && name) {
    isLogin = true
  }
  return (
    <>
      <div className={cn('fixed z-50 flex h-24 w-screen items-center justify-between bg-swWhite px-8 py-7', className)}>
        <Link href={ROUTES.MAIN.url}>
          <Logo text='SoKK' className='text-4xl' />
        </Link>
        {/* Todo: 버거 메뉴 만들기 */}
        <LucideIcon name='Menu' size={30} className='cursor-pointer' onClick={toggleDropdown} ref={buttonRef} />
      </div>
      {isOpenMenu && <Backdrop className='absolute z-40 mt-24 h-[calc(100%-6rem)] w-screen' />}

      <ToggleWrapper
        isOpen={isOpenMenu}
        ref={dropdownRef}
        className='absolute z-40 mr-3 mt-28 flex h-fit w-1/2 flex-col items-center justify-start self-end rounded-lg bg-swWhite'
      >
        <div className='relative flex w-4/5 flex-col items-center justify-center gap-4 border-b border-solid border-swGray py-8'>
          <LucideIcon name='CircleUserRound' size={100} strokeWidth={0.5} />
          {isLogin ? (
            <>
              <p className='mt-4 text-center text-xl font-medium'>{name}</p>
              <p className='text-center text-swGrayDark'>{studentId}</p>
            </>
          ) : (
            <Link className='font-s relative h-12 w-4/5' href={ROUTES.AUTH.LOGIN.url} onClick={toggleDropdown}>
              <Button variant='swLightGreen' className='h-full w-full'>
                로그인
              </Button>
            </Link>
          )}
        </div>

        <div className='flex w-4/5 flex-col items-center justify-start gap-6 border-b border-solid border-swGray py-8 text-lg font-semibold'>
          <Link href={ROUTES.SEAT.RESERVE(-1).url} onClick={toggleDropdown}>
            좌석 배정
          </Link>
          <Link href={ROUTES.SEAT.QR.STEP2.url} className='flex items-center justify-center gap-2' onClick={toggleDropdown}>
            <LucideIcon name='ScanLine' size={24} />
            QR 좌석 배정
          </Link>
        </div>

        <div className='flex w-4/5 flex-col items-center justify-start gap-6 border-b border-solid border-swGray py-8 text-lg font-semibold'>
          <Link href={ROUTES.ROOM.RESERVE.STEP1.url} onClick={toggleDropdown}>
            스터디룸 예약
          </Link>
          <Link href={ROUTES.ROOM.HISTORY.url} onClick={toggleDropdown}>
            스터디룸 예약 내역
          </Link>
        </div>

        <div className='flex w-4/5 flex-col items-center justify-start gap-6 border-b border-solid border-swGray py-8 text-lg font-normal text-swGrayDark'>
          {/* TODO: 아래 3가지 Route 추가하기*/}
          <Link href={ROUTES.RULES.url} onClick={toggleDropdown} className='w-full text-center'>
            이용 수칙
          </Link>
          <InstallLink className='w-full text-center'>앱 다운로드</InstallLink>
          <Link href={ROUTES.ROOM.RESERVE.STEP1.url} onClick={toggleDropdown} className='w-full text-center'>
            개인정보 처리방침
          </Link>
          <Link href={ROUTES.RULES.url} onClick={toggleDropdown} className='w-full text-center'>
            문의하기
          </Link>
        </div>
      </ToggleWrapper>
    </>
  )
}
