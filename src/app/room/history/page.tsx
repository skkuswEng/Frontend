'use client'
import React, { ReactNode } from 'react'

import { Divider } from '@/src/components/common/Dividers'
import { TMP_ROOM_DATA } from '@/src/lib/constants/dummy_data'
import { cn } from '@/src/lib/utils/cn'
import { formatDateToString, formatTimeRange } from '@/src/lib/utils/date-utils'

import { ROOM_TEXT_CANDIDATES } from '../reserve/step1/page'

interface RoomHistoryProps {}

const RoomHistory = ({}: RoomHistoryProps): ReactNode => {
  const now = new Date()
  // 지난 내역과 예약 내역 분리
  const pastReservations = TMP_ROOM_DATA.filter(data => new Date(data.startDate) < now)
  const upcomingReservations = TMP_ROOM_DATA.filter(data => new Date(data.startDate) >= now)

  return (
    <div className='relative mt-24 grid w-[90%] max-w-[1800px] flex-grow grid-cols-1 place-items-center gap-8 py-6 md:grid-cols-2 lg:mt-0'>
      {/* 왼쪽 */}
      <div className='relative flex h-full w-full flex-col items-start justify-start gap-5'>
        <p className='text-2xl font-bold'>스터디룸 예약현황</p>
        <span className='text-sm text-swBackDrop'>* 스터디룸 예약 현황, 지난 스터디룸 이용내역</span>
        {/* 예약 내역 */}
        {upcomingReservations.length > 0 ? (
          upcomingReservations.map((data, index) => <HistoryCard key={index} data={data} className='w-full' />)
        ) : (
          <p className='text-sm text-swGray'>예약된 내역이 없습니다.</p>
        )}
        <Divider />
        <p className='mt-5 text-2xl font-bold'>지난 예약 내역</p>

        {/* 지난 내역 */}
        {pastReservations.length > 0 ? (
          pastReservations.map((data, index) => <HistoryCard key={index} data={data} className='w-full' />)
        ) : (
          <p className='text-sm text-swGray'>지난 예약 내역이 없습니다.</p>
        )}
      </div>
      {/* 오른쪽 */}
      <div className='flex h-full w-full flex-col items-start justify-start gap-3'></div>
    </div>
  )
}

export default RoomHistory
// 백엔드가 보내주는 데이터 형식
export type tmp_room_data_type = {
  room_number: number
  startDate: Date
  endDate: Date
  leader: {
    student_id: string
    name: string
  }
  companion: {
    student_id: string
    name: string
  }[]
}
interface HistoryCardProps {
  data: tmp_room_data_type
  className?: string
}

const HistoryCard = ({ data, className }: HistoryCardProps): ReactNode => {
  // console.log(data)
  const { room_number, startDate, endDate, leader, companion } = data

  const cnt_users = 1 + companion.length
  return (
    <div
      className={cn(
        'relative flex flex-col items-start justify-start gap-2 rounded-md border border-solid border-swGrayDark bg-swGrayLight px-6 py-4',
        className,
      )}
    >
      <p className='text-base font-bold md:text-xl'>예약 정보</p>

      <Description text='스터디룸' value={ROOM_TEXT_CANDIDATES[room_number - 1]} />
      <Description text='예약날짜' value={formatDateToString(startDate)} />
      <Description text='예약시간' value={formatTimeRange(startDate, endDate)} />

      <p className='mt-2 text-base font-bold md:text-xl'>
        이용자 <span className='text-sm'>({cnt_users}명)</span>
      </p>
      <div className='flex flex-wrap items-center justify-start gap-2'>
        <NameCard name={leader.name} student_id={leader.student_id} className='border-swBlue' />
        {companion.map((item, index) => (
          <NameCard key={index} student_id={item.student_id} name={item.name} />
        ))}
      </div>
      <div className='absolute right-4 top-6 flex items-center justify-center gap-3'>
        <span className='cursor-pointer text-sm text-swRed hover:font-medium hover:text-swHoverRed hover:underline'>예약 취소</span>
        <span className='cursor-pointer text-sm hover:font-medium hover:underline'>수정</span>
      </div>
    </div>
  )
}

interface DescriptionProps {
  text: string
  value: string
}

const Description = ({ text, value }: DescriptionProps): ReactNode => {
  return (
    <div className='flex items-center justify-start gap-4 text-xs md:text-sm'>
      <span className='font-medium'>{text}</span>
      <span className='rounded-md border border-solid border-swGray px-5 py-3'>{value}</span>
    </div>
  )
}

interface NameCardProps {
  student_id: string
  name: string
  className?: string
}
const NameCard = ({ student_id, name, className }: NameCardProps): ReactNode => {
  return (
    <span
      className={cn('w-max rounded-md border-[1.5px] border-solid border-swGrayDark px-3 py-3 text-xs font-medium md:text-sm', className)}
    >
      {student_id} / {name}
    </span>
  )
}
