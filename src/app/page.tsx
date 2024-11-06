// pages/index.js
import Link from 'next/link'
import React from 'react'

import Asterisk from '../components/common/Asterisk'
import Eyes from '../components/common/Eyes'
import Logo from '../components/common/Logo'
import LucideIcon from '../components/common/LucideIcon'
import { ROUTES, RouteType } from '../lib/constants/route'
import { cn } from '../lib/utils/cn'

const MainPage = () => {
  return (
    <div className='relative flex w-screen flex-grow flex-col items-center justify-center gap-4'>
      <p className='mt-14 w-fit text-2xl font-bold text-swBlack sm:text-3xl lg:hidden'>지능형 소프트웨어학과 라운지</p>
      <p className='mb-14 w-fit text-2xl font-bold text-swBlack sm:text-3xl lg:hidden'>AI 좌석 배정 시스템</p>
      <section className='relative flex h-1/3 w-[90%] max-w-[1600px] items-center justify-between'>
        <Asterisk className='w-20 self-start bg-[#DDFEC0] sm:w-24 lg:w-28' />
        <div className='flex h-full w-auto items-center justify-center'>
          <Logo text='So' className='relative -right-6 hidden text-xl lg:block lg:text-9xl' />
          <Eyes className='h-40 w-32 lg:h-80 lg:w-56' />
          <Logo text='KK' className='relative -left-6 hidden text-xl lg:block lg:text-9xl'>
            <p className='absolute -right-36 -top-6 w-max text-base font-medium text-swBlack'>AI로 관리하는 스마트한 라운지 생활</p>
          </Logo>
        </div>
        <Asterisk className='w-20 self-end bg-swWhite sm:w-24 lg:w-28' />
      </section>

      {/* TODO: 로그인 상태 확인 후 href 조정 */}
      <div className='relative -top-9 z-30 grid w-[90%] max-w-[1600px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <Card
          title='좌석 배정'
          subtitle='라운지 좌석 배정하기'
          href={ROUTES.SEAT.url}
          qr={true}
          className='hover:bg-swHoverGreen h-52 w-full bg-swGreen sm:col-span-2 lg:order-2 lg:col-span-1 lg:aspect-card lg:h-auto'
        />
        <Card
          title='스터디룸 예약'
          subtitle='스터디룸 예약하기'
          href={ROUTES.ROOM.url}
          className='hover:bg-swHoverGreenLight h-52 w-full bg-swGreenLight lg:order-1 lg:aspect-card lg:h-auto'
        />
        <Card
          title='이용 수칙'
          subtitle='이용 수칙 확인하기'
          href={ROUTES.RULES.url}
          className='hover:bg-swHoverGray h-52 w-full bg-swGray lg:aspect-card lg:h-auto'
        />
      </div>
    </div>
  )
}

export default MainPage

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
