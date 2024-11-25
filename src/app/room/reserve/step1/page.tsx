'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

import SPACE_A from '@/public/images/공용공간A.jpg'
import SPACE_B from '@/public/images/공용공간B.jpg'
import STUDY_ROOM_B from '@/public/images/스터디룸B.jpg'
import { Divider } from '@/src/components/common/Dividers'
import { Button } from '@/src/components/ui/button'
import { ROUTES } from '@/src/lib/constants/route'
import useCalenderDropdown from '@/src/lib/hooks/useCalenderDropdown'
import useSelectDropdown from '@/src/lib/hooks/useSelectDropdown'
import { cn } from '@/src/lib/utils/cn'

const generateTimeIntervals = (startTime = START_TIME, endTime = END_TIME, intervalMinutes = 30) => {
  const times = []
  let [hour, minute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  while (hour != endHour || minute != endMinute) {
    times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
    minute += intervalMinutes
    if (minute >= 60) {
      minute -= 60
      hour += 1
    }
    if (hour >= 24) {
      hour -= 24
    }
  }

  return times
}
const [START_TIME, END_TIME] = ['09:00', '01:00']
const timeSelections = generateTimeIntervals(START_TIME, END_TIME)

const ROOMS = [STUDY_ROOM_B, SPACE_A, SPACE_B]
interface StudyRoomReservePageProps {}

type reserveTime = {
  startTime: string | undefined
  endTime: string | undefined
}
const StudyRoomReservePage = ({}: StudyRoomReservePageProps): ReactNode => {
  const router = useRouter()
  const [isDone, setIsDone] = useState<boolean>(false) // Route Decider

  // #1. Input Values
  const { value: room_name, SelectDropdown: SelectRoomDropdown } = useSelectDropdown({
    placeHolder: '이용공간을 선택해주세요',
    candidates: ['스터리룸B', '공용공간A', '공용공간B'],
  })
  let room_number: number | undefined = undefined
  switch (room_name) {
    case '스터리룸B':
      room_number = 0
      break
    case '공용공간A':
      room_number = 1
      break
    case '공용공간B':
      room_number = 2
      break
  }

  const { date, CalenderDropdown } = useCalenderDropdown({
    placeHolder: '예약 날짜를 선택해주세요',
  })

  // const [reserveTime, setReserveTime] = useState<reserveTime>({
  //   startTime: undefined,
  //   endTime: undefined,
  // })

  useEffect(() => {
    if (room_name && date) {
      setIsDone(true)
    } else if (isDone) {
      setIsDone(false)
    }
  }, [room_name, date])

  // Functions
  const stepHandler = () => {
    router.push(ROUTES.ROOM.RESERVE.STEP2.url)
  }

  return (
    <div className='relative mt-24 grid w-[90%] max-w-[1800px] flex-grow grid-cols-1 place-items-center gap-8 py-6 md:grid-cols-2 lg:mt-0'>
      <div className='flex h-full w-full flex-col items-start justify-start gap-3'>
        <p className='text-2xl font-bold'>1. 이용공간</p>
        <div className='flex h-fit w-full flex-col items-start justify-start gap-2'>
          <SelectRoomDropdown className='h-16 w-64 bg-swWhite px-3 py-1' />
          {!room_name ? (
            <div className='flex aspect-card w-full items-center justify-center rounded-md bg-swGray text-2xl font-bold'>스터디룸 사진</div>
          ) : (
            <Image src={ROOMS[room_number as number]} alt='선택된 공간' />
          )}
        </div>
      </div>
      <Divider className='my-6 md:hidden' />

      <div className='flex h-full w-full flex-col items-start justify-start gap-3'>
        <p className='text-2xl font-bold'>2. 예약정보</p>
        <div className='flex flex-col gap-3 px-4 text-lg font-medium'>
          <p className='text-lg font-bold'>날짜 선택</p>
          <CalenderDropdown className='flex h-16 w-64 items-center justify-start gap-4' />
        </div>
        <Divider className='my-6 hidden md:block' />
        <div className='relative flex w-full max-w-xl flex-col gap-3 px-4 text-lg font-medium'>
          <p className='text-lg font-bold'>시간 선택</p>

          <div className='flex items-center justify-start gap-4'>
            <div className='flex items-center justify-between gap-2'>
              <span className='h-4 w-10 rounded-sm border border-solid border-swGrayDark bg-swWhite' />
              <span className='text-sm font-bold'>예약 가능</span>
            </div>
            <div className='flex items-center justify-between gap-2'>
              <span className='h-4 w-10 rounded-sm border border-solid border-swGrayDark bg-swGrayLight' />
              <span className='text-sm font-bold text-swGrayDark'>예약 확정</span>
            </div>
          </div>

          <div className='grid w-full grid-cols-4 items-start justify-start gap-x-2 gap-y-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
            {timeSelections.map(timeSelection => (
              <TimeSelector key={timeSelection} time={timeSelection} className='w-full px-3 py-2 text-sm' />
            ))}
          </div>

          <Button variant={isDone ? 'swBlack' : 'swBlackDisabled'} className='mt-5 w-full' disabled={!isDone} onClick={stepHandler}>
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StudyRoomReservePage

interface TimeSelectorProps {
  time: string
  className: string
}
const TimeSelector = ({ time, className }: TimeSelectorProps): ReactNode => {
  return (
    <p
      className={cn(
        'cursor-pointer rounded-sm border border-solid border-swGrayDark bg-swWhite text-center text-sm hover:bg-swHoverGreenLight',
        className,
      )}
    >
      {time}
    </p>
  )
}
