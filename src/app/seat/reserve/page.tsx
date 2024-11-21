'use client'
import React, { ReactNode } from 'react'

import LucideIcon from '@/src/components/provider/LucideIcon'
import { Button } from '@/src/components/ui/button'
interface SeatStatusAreaProps {}

export const SeatStatusArea = ({}: SeatStatusAreaProps): ReactNode => {
  const WINDOW_SEAT_GROUP = Array.from({ length: 6 }, (_, idx) => idx + 1)
  const DEST_SEAT_GROUP = Array.from({ length: 12 }, (_, idx) => idx + 7)
  return (
    <div className='relative flex w-full flex-grow flex-col items-center justify-between bg-swWhite'>
      <div className='mx-4 my-6 grid h-[11%] w-fit grid-cols-6 grid-rows-1 gap-2 self-start md:mx-8 md:h-[15%] md:gap-4'>
        {WINDOW_SEAT_GROUP.map(seat => (
          <p
            key={seat}
            className='flex aspect-square h-full cursor-pointer items-center justify-center bg-swGrayLight text-base font-semibold hover:bg-swGreenLight md:text-xl'
          >
            {seat}
          </p>
        ))}
      </div>
      <div className='flex aspect-video w-1/2 items-center justify-center bg-[#FFF495] text-lg font-semibold md:aspect-[5/2] md:text-2xl'>휴게 공간</div>
      <div className='mx-4 my-6 grid h-[24%] w-fit grid-cols-6 grid-rows-2 gap-2 self-end md:mx-8 md:h-[30%] md:gap-4'>
        {DEST_SEAT_GROUP.map(seat => (
          <p
            key={seat}
            className='flex aspect-square h-full cursor-pointer items-center justify-center bg-swGrayLight text-base font-semibold hover:bg-swGreenLight md:text-xl'
          >
            {seat}
          </p>
        ))}
      </div>
    </div>
  )
}

interface ReservePageProps {}

const SEAT_WARNINGS = [
  '장기간 비어있는 좌석은 AI에 의해 자동반납될 수 있습니다.',
  '수업 이동시 짐을 정리해주세요.',
  '핸드폰은 무음, 전화 통화는 밖에서!',
  '취식을 삼가해주세요.',
  '다음 이용자를 위해 깔끔하게 정리해주세요.',
]
const INFORMAL_USER_WARNING = '좌석 배정 이후, AI에 의해 긴 시간 부재로 인해 자동반납될 경우, SoKK 규정에 의해 좌석이 정리될 수 있습니다.'
const ReservePage = ({}: ReservePageProps): ReactNode => {
  const QRReserveHandler = () => {}
  return (
    <div className='relative mt-24 grid w-[90%] max-w-[1800px] flex-grow grid-cols-1 place-items-center gap-8 py-6 md:grid-cols-[7fr,3fr] lg:mt-0'>
      <div className='flex h-full w-full flex-col items-start justify-start gap-3'>
        <p className='text-2xl font-bold'>좌석 선택</p>
        <span className='text-sm text-swBackDrop'>* 원하시는 좌석을 선택해주세요</span>
        <div className='flex items-center justify-start gap-4'>
          <div className='flex items-center justify-between gap-2'>
            <span className='h-4 w-10 rounded-sm border border-solid border-swGrayDark bg-swGreenLight' />
            <span className='text-sm font-bold'>배정 가능</span>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <span className='h-4 w-10 rounded-sm border border-solid border-swGrayDark bg-swGrayLight text-swGrayDark' />
            <span className='text-sm font-bold text-swGrayDark'>배정 확정</span>
          </div>
        </div>

        <SeatStatusArea />
      </div>

      <div className='flex h-full w-full flex-col items-start justify-start gap-3 md:w-4/5'>
        <div className='flex w-full items-center justify-center gap-3 text-swRed md:justify-start'>
          <LucideIcon name='Hash' size={24} />
          <span className='text-lg font-bold'>공간 이용 시 주의사항</span>
        </div>
        <div className='relative flex w-full flex-col items-center justify-start gap-1 md:gap-2'>
          {SEAT_WARNINGS.map(warning => (
            <p key={warning} className='w-full rounded-lg border border-solid border-swGray bg-swGrayLight py-3 text-center text-sm font-medium lg:text-sm'>
              {warning}
            </p>
          ))}
        </div>

        <div className='mt-5 flex w-full items-center justify-center gap-3 text-swRed md:justify-start'>
          <LucideIcon name='Hash' size={24} />
          <span className='text-lg font-bold'>부정 이용자 좌석 정리 동의</span>
        </div>
        <div className='flex w-full flex-col items-end justify-start gap-4 rounded-lg border border-solid border-swGray bg-swGray px-5 py-6'>
          <p className='text-pretty text-sm font-medium xl:text-sm'>{INFORMAL_USER_WARNING}</p>
        </div>

        <Button variant='swGreen' className='mt-5 flex w-full items-center justify-center gap-2' onClick={QRReserveHandler}>
          <LucideIcon name='ScanLine' strokeWidth={2} />
          <span>QR코드 배정하기</span>
        </Button>
      </div>
    </div>
  )
}

export default ReservePage
