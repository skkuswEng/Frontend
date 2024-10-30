import Link from 'next/link'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/src/lib/constants/route'

import Logo from './Logo'
import LucideIcon from './LucideIcon'

interface HeaderProps {}

const Header = ({}: HeaderProps): ReactNode => {
  // Style
  const linkStyle = 'flex w-[10%] items-center justify-center text-base font-semibold'
  return (
    <div className='absolute top-8 z-10 flex h-11 w-[90%] max-w-[1600px] items-center justify-start gap-14 rounded-full bg-swWhite px-12 py-7'>
      <Link href={ROUTES.MAIN.url}>
        <Logo text='SoKK' />
      </Link>
      <p className='text-base font-semibold'>지능형 소프트웨어학과 라운지 AI 좌석 배정 시스템</p>
      <Link href={ROUTES.SEAT.url} className={linkStyle}>
        좌석 배정
      </Link>
      <Link href={ROUTES.ROOM.url} className={linkStyle}>
        스터디룸 예약
      </Link>
      <Link href={ROUTES.RULES.url} className={linkStyle}>
        이용 수칙
      </Link>
      <p className='ml-auto flex items-center justify-center gap-2 rounded-xl border border-solid border-[#808080] bg-[#F0F0F0] px-3 py-1 text-[#808080]'>
        <LucideIcon name='Clock' />
        스터디룸 예약내역
      </p>
    </div>
  )
}

export default Header
