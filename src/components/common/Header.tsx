'use client'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/src/lib/constants/route'
import ToggleWrapper, { useDropdown } from '@/src/lib/hooks/useToggle'
import { cn } from '@/src/lib/utils/cn'

import LucideIcon from '../provider/LucideIcon'
import Backdrop from './Backdrop'
import Logo from './Logo'

interface HeaderProps {}

const Header = ({}: HeaderProps): ReactNode => {
  return (
    <>
      <MobileHeader className='flex lg:hidden' />
      <DesktopHeader className='hidden lg:flex' />
    </>
  )
}

export default Header

const DesktopHeader = ({ className }: { className: string }) => {
  const linkStyle = 'flex items-center justify-center text-xl font-bold hover:border-b hover:border-black hover:border-solid'
  return (
    <div
      className={cn('relative z-10 mt-8 flex h-20 w-[90%] max-w-[1800px] items-center justify-between gap-14 rounded-full bg-swWhite px-12 py-7', className)}
    >
      <Link href={ROUTES.MAIN.url}>
        <Logo text='SoKK' className='text-4xl' />
      </Link>
      {/* <p className='text-base font-semibold'>지능형 소프트웨어학과 라운지 AI 좌석 배정 시스템</p> */}
      <div className='flex w-max items-center justify-between gap-36'>
        <Link href={ROUTES.SEAT.PLAIN.url} className={linkStyle}>
          좌석 배정
        </Link>
        <Link href={ROUTES.ROOM.url} className={linkStyle}>
          스터디룸 예약
        </Link>
        <Link href={ROUTES.RULES.url} className={linkStyle}>
          이용 수칙
        </Link>
      </div>
      <div className='flex cursor-pointer items-center justify-center gap-8 px-3 py-1 text-xl font-bold'>
        <LucideIcon name='Bell' size={30} />
        <Link href={ROUTES.AUTH.LOGIN.url}>로그인</Link>
      </div>
    </div>
  )
}

const MobileHeader = ({ className }: { className: string }) => {
  const {
    refs: [buttonRef, dropdownRef],
    isOpen: isOpenMenu,
    toggleDropdown,
  } = useDropdown()

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
        className='absolute z-40 mt-24 flex h-[calc(100%-6rem)] w-1/2 flex-col items-center justify-start self-end bg-swWhite'
      >
        <div className='flex w-4/5 flex-col items-center justify-center border-b border-solid border-swGray py-8'>
          <LucideIcon name='CircleUserRound' size={100} strokeWidth={1} />
          <p className='mt-4 text-center text-xl font-medium'>박인찬</p>
          <p className='text-center text-swGrayDark'>2019311945</p>
        </div>

        <div className='flex w-4/5 flex-col items-center justify-start gap-6 border-b border-solid border-swGray py-8 text-lg font-semibold'>
          <Link href={ROUTES.SEAT.PLAIN.url}>좌석 배정</Link>
          <Link href={ROUTES.SEAT.QR.url} className='flex items-center justify-center gap-2'>
            <LucideIcon name='ScanLine' size={24} />
            QR 좌석 배정
          </Link>
          <Link href={ROUTES.ROOM.url}>스터디룸 예약</Link>
          <Link href={ROUTES.RULES.url}>이용 수칙</Link>
        </div>

        <div className='flex w-4/5 flex-col items-center justify-start gap-6 border-b border-solid border-swGray py-8 text-lg font-semibold text-swGrayDark'>
          {/* TODO: 아래 3가지 Route 추가하기*/}
          <Link href={ROUTES.SEAT.PLAIN.url}>앱 다운로드</Link>
          <Link href={ROUTES.ROOM.url}>개인정보 처리방침</Link>
          <Link href={ROUTES.RULES.url}>문의하기</Link>
        </div>
      </ToggleWrapper>
    </>
  )
}
