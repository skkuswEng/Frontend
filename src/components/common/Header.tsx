import Link from 'next/link'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/src/lib/constants/route'
import { cn } from '@/src/lib/utils/cn'

import LucideIcon from '../provider/LucideIcon'
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

const MobileHeader = ({ className }: { className: string }) => {
  return (
    <div className={cn('relative z-10 flex h-24 w-screen items-center justify-between bg-swWhite px-8 py-7', className)}>
      <Link href={ROUTES.MAIN.url}>
        <Logo text='SoKK' className='text-4xl' />
      </Link>
      {/* Todo: 버거 메뉴 만들기 */}
      <LucideIcon name='Menu' size={30} />
    </div>
  )
}

const DesktopHeader = ({ className }: { className: string }) => {
  const linkStyle = 'flex items-center justify-center text-xl font-bold hover:border-b hover:border-black hover:border-solid'
  return (
    <div
      className={cn(
        'relative z-10 mt-8 flex h-20 w-[90%] max-w-[1800px] items-center justify-between gap-14 rounded-full bg-swWhite px-12 py-7',
        className,
      )}
    >
      <Link href={ROUTES.MAIN.url}>
        <Logo text='SoKK' className='text-4xl' />
      </Link>
      {/* <p className='text-base font-semibold'>지능형 소프트웨어학과 라운지 AI 좌석 배정 시스템</p> */}
      <div className='flex w-max items-center justify-between gap-36'>
        <Link href={ROUTES.SEAT.url} className={linkStyle}>
          좌석 배정
        </Link>
        <Link href={ROUTES.ROOM.url} className={linkStyle}>
          스터디룸 예약
        </Link>
        <Link href={ROUTES.RULES.url} className={linkStyle}>
          이용 수칙
        </Link>
      </div>
      <p className='flex cursor-pointer items-center justify-center gap-8 px-3 py-1 text-xl font-bold'>
        <LucideIcon name='Bell' size={30} />
        <Link href={ROUTES.AUTH.LOGIN.url}>로그인</Link>
      </p>
    </div>
  )
}
