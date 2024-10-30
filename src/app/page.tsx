// pages/index.js
import Link from 'next/link'
import React from 'react'

import Asterisk from '../components/common/Asterisk'
import Eyes from '../components/common/Eyes'
import Logo from '../components/common/Logo'
import LucideIcon from '../components/common/LucideIcon'
import { ROUTES, RouteType } from '../lib/constants/route'
import { cn } from '../lib/utils/cn'

const Main = () => {
  return (
    <div className='relative flex min-h-screen w-screen flex-col items-center justify-center bg-gray-50'>
      <section className='flex h-1/3 items-center justify-center'>
        <Asterisk className='mr-32 w-28 self-start bg-[#DDFEC0]' />
        <Logo text='So' textSize='text-9xl' className='relative -right-6' />
        <Eyes />
        <Logo text='KK' textSize='text-9xl' className='relative -left-6'>
          <p className='absolute -right-36 -top-6 w-max text-base font-medium text-swBlack'>AI로 관리하는 스마트한 라운지 생활</p>
        </Logo>
        <Asterisk className='ml-32 w-28 self-end bg-swWhite' />
      </section>

      <div className='relative -top-12 z-30 flex w-[90%] max-w-[1600px] items-center justify-center gap-10'>
        <Card
          title='스터디룸 예약'
          subtitle='스터디룸 예약하기'
          href={ROUTES.ROOM.url}
          className='aspect-card w-1/3 bg-swLightGreen hover:bg-swLightGreenHover'
        />
        <Card
          title='좌석 배정'
          subtitle='라운지 좌석 배정하기'
          href={ROUTES.SEAT.url}
          qr={true}
          className='aspect-card w-1/3 bg-swGreen hover:bg-swGreenHover'
        />
        <Card
          title='이용 수칙'
          subtitle='이용 수칙 확인하기'
          href={ROUTES.RULES.url}
          className='aspect-card w-1/3 bg-swGray hover:bg-swGrayHover'
        />
      </div>
    </div>
  )
}

export default Main

interface CardProps {
  title: string
  subtitle: string
  href: RouteType
  qr?: boolean
  className?: string
}
const Card = ({ title, subtitle, href, qr, className }: CardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex cursor-pointer flex-col items-start gap-2 rounded-xl border-2 border-solid border-swBlack p-7 shadow-lg',
        className,
      )}
      style={{
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // 커스텀 그림자
      }}
    >
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='text-base text-gray-600'>{subtitle}</p>
      <div className='absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-swBlack group-hover:bg-swWhite'>
        <LucideIcon name='ArrowUpRight' size={26} />
      </div>
      {qr && (
        <div className='absolute bottom-5 right-5 flex items-center justify-center gap-2 rounded-full bg-swBlack px-5 py-3 font-bold text-swWhite hover:border hover:border-solid hover:border-swBlack hover:bg-swWhite hover:text-swBlack'>
          <LucideIcon name='ScanLine' strokeWidth={4} />
          QR
        </div>
      )}
    </Link>
  )
}
