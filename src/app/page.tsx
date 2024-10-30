// pages/index.js
import Link from 'next/link'
import React from 'react'

import Asterisk from '../components/common/Asterisk'
import Eyes from '../components/common/Eyes'
import Logo from '../components/common/Logo'
import { colorSet, ColorType } from '../lib/constants/colors'
import { ROUTES, RouteType } from '../lib/constants/route'
import { cn } from '../lib/utils/cn'

const Main = () => {
  // TODO: QR 코드 생성방법
  return (
    <div className='flex min-h-screen w-screen flex-col items-center justify-center bg-gray-50'>
      <section className='flex items-center justify-center'>
        <Asterisk className='mr-32 self-start bg-[#DDFEC0]' />
        <Logo text='So' textSize='text-8xl' className='relative -right-4' />
        <Eyes />
        <Logo text='KK' textSize='text-8xl' className='relative -left-4'>
          <p className='absolute -right-32 -top-6 w-max text-sm font-medium text-swBlack'>AI로 관리하는 스마트한 라운지 생활</p>
        </Logo>
        <Asterisk className='ml-32 self-end bg-swWhite' />
      </section>

      <div className='mt-8 flex space-x-4'>
        <Card title='스터디룸 예약' subtitle='좌석 보고 배정하기' link={ROUTES.ROOM.url} color='swLightGreen' />
        <Card title='좌석 배정' subtitle='19 석 이용 가능' link={ROUTES.SEAT.url} color='swGreen' qr='123' />
        <Card title='이용 수칙' subtitle='이용 수칙 확인하기' link={ROUTES.RULES.url} color='swGray' />
      </div>
    </div>
  )
}

export default Main

//TODO: QR 링크 만들기
interface CardProps {
  title: string
  subtitle: string
  link: RouteType
  color: ColorType
  qr?: string
}
const Card = ({ title, subtitle, link, color, qr }: CardProps) => {
  const colorValue = colorSet[color]

  return (
    <div
      className={cn('relative flex h-64 w-60 flex-col items-start rounded-xl p-5 shadow-md')}
      style={{
        backgroundColor: colorValue,
      }}
    >
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='text-sm text-gray-600'>{subtitle}</p>
      {qr && <div className='absolute right-5 top-5 rounded-lg bg-white p-2 font-bold text-black'>QR</div>}
      <Link href={link} className='absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-gray-500'>
        →
      </Link>
    </div>
  )
}
