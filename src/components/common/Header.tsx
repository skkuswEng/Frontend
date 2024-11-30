'use client'
import Link from 'next/link'
import React, { ReactNode, useEffect } from 'react'

import { ROUTES } from '@/src/lib/constants/route'
import useAuthStore, { AuthState } from '@/src/lib/context/authContext'
import ToggleWrapper, { useDropdown } from '@/src/lib/hooks/useToggle'
import { cn } from '@/src/lib/utils/cn'
import { InstallLink } from '@/src/lib/utils/install-prompt'

import LucideIcon from '../provider/LucideIcon'
import { Button } from '../ui/button'
import Logo from './Logo'

const Header = (): ReactNode => {
  const authData = useAuthStore()
  const dropdownData = useDropdown()
  const initializeAuth = useAuthStore(state => state.initializeAuth)

  useEffect(() => {
    // 로컬 스토리지에서 데이터 불러오기
    initializeAuth()
  }, [initializeAuth])

  return (
    <>
      <MobileHeader dropdownData={dropdownData} authData={authData} className='flex lg:hidden' />
      <DesktopHeader dropdownData={dropdownData} authData={authData} className='hidden lg:flex' />
    </>
  )
}

interface HeaderProps {
  dropdownData: {
    refs: React.RefObject<HTMLDivElement>[]
    isOpen: boolean
    toggleDropdown: () => void
  }
  authData: AuthState
  className?: string
}
export default Header

const DesktopHeader = ({ dropdownData, authData, className }: HeaderProps) => {
  const {
    refs: [buttonRef, dropdownRef],
    toggleDropdown,
  } = dropdownData
  const { studentId, name } = authData

  let isLogin: boolean = false
  if (studentId && name) {
    isLogin = true
  }

  const linkStyle = 'flex items-center justify-center text-base font-bold hover:border-b hover:border-black hover:border-solid'
  return (
    <div
      className={cn(
        'relative z-50 mt-8 flex h-16 w-[90%] max-w-[1800px] items-center justify-between gap-14 rounded-full px-12 py-7',
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
        <Link href={ROUTES.ETC.LOUNGE_RULES.url} className={linkStyle}>
          이용 수칙
        </Link>
      </div>
      <div className='flex h-full cursor-pointer items-center justify-center gap-8 px-3 py-1 text-base font-bold'>
        <LucideIcon name='Bell' size={20} />
        {!isLogin ? (
          <Link href={ROUTES.AUTH.LOGIN.url}>로그인</Link>
        ) : (
          <>
            <div onClick={toggleDropdown} ref={buttonRef} className='flex h-full items-center justify-center'>
              {studentId} / {name}
            </div>
          </>
        )}
      </div>
      <HeaderToggleMenu
        authData={authData}
        dropdownData={dropdownData}
        className='absolute right-0 top-0 mr-3 mt-20 flex h-fit w-1/2 max-w-56 flex-col items-center justify-start self-end rounded-xl border border-solid border-swGrayLight bg-swWhite'
      />
    </div>
  )
}

const MobileHeader = ({ dropdownData, authData, className }: HeaderProps) => {
  const {
    isOpen,
    toggleDropdown,
    refs: [buttonRef, dropdownRef],
  } = dropdownData
  const { studentId, name } = authData

  let isLogin: boolean = false
  if (studentId && name) {
    isLogin = true
  }

  return (
    <div
      className={cn(
        'absolute z-50 flex h-24 w-screen items-center justify-between border-b border-solid border-swGray bg-swWhite px-8 py-7',
        className,
      )}
    >
      <Link href={ROUTES.MAIN.url}>
        <Logo text='SoKK' className='text-4xl' />
      </Link>
      {/* Todo: 버거 메뉴 만들기 */}
      <div
        ref={buttonRef}
        onClick={e => {
          toggleDropdown()
        }}
      >
        <LucideIcon name='Menu' size={30} className='cursor-pointer' />
      </div>
      {/* {isOpen && <Backdrop className='fixed top-0 z-40 h-screen w-screen' />} */}
      <HeaderToggleMenu
        authData={authData}
        dropdownData={dropdownData}
        className='absolute right-0 top-0 z-50 mr-3 mt-28 flex h-fit w-1/2 max-w-56 flex-col items-center justify-start self-end rounded-lg border border-solid border-swGrayLight bg-swWhite'
      />
    </div>
  )
}

interface HeaderToggleMenuProps {
  dropdownData: {
    refs: React.RefObject<HTMLDivElement>[]
    isOpen: boolean
    toggleDropdown: () => void
  }
  authData: AuthState
  className: string
}
const HeaderToggleMenu = ({ dropdownData, authData, className }: HeaderToggleMenuProps) => {
  // const router = useRouter()
  const {
    isOpen,
    refs: [_, dropdownRef],
    toggleDropdown,
  } = dropdownData
  const { studentId, name } = authData

  let isLogin: boolean = false
  if (studentId && name) {
    isLogin = true
  }

  // Functions
  const logoutHandler = () => {
    localStorage.removeItem('authData')
    toggleDropdown()
    location.reload()
  }

  return (
    <ToggleWrapper isOpen={isOpen} className={cn(className)}>
      <div className='relative flex w-4/5 flex-col items-center justify-center gap-2 border-b border-solid border-swGray py-8'>
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

      <div className='flex w-4/5 flex-col items-center justify-start gap-6 py-8 text-lg font-normal text-swGrayDark'>
        <Link
          href={ROUTES.ETC.LOUNGE_RULES.url}
          target='_blank'
          onClick={toggleDropdown}
          className='w-full cursor-pointer text-center hover:text-swBlack'
        >
          이용 수칙
        </Link>
        <InstallLink onClick={toggleDropdown} className='w-full cursor-pointer text-center hover:text-swBlack'>
          앱 다운로드
        </InstallLink>
        <Link
          href={ROUTES.ETC.PERSONAL_INFO_RULES.url}
          target='_blank'
          onClick={toggleDropdown}
          className='w-full cursor-pointer text-center hover:text-swBlack'
        >
          개인정보 처리방침
        </Link>
        <Link
          href={ROUTES.ETC.SERVICE_CENTER.url}
          target='_blank'
          onClick={toggleDropdown}
          className='w-full cursor-pointer text-center hover:text-swBlack'
        >
          문의하기
        </Link>
        {isLogin && (
          <>
            <Link
              href={ROUTES.AUTH.UNREGISTER.url}
              className='flex w-full cursor-pointer items-center justify-center text-center hover:text-swBlack'
              onClick={toggleDropdown}
            >
              회원탈퇴
            </Link>
            <div onClick={logoutHandler} className='flex w-full cursor-pointer items-center justify-center text-center hover:text-swBlack'>
              로그아웃
            </div>
          </>
        )}
      </div>
    </ToggleWrapper>
  )
}
