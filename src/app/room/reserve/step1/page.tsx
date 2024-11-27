'use client'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

import SPACE_A from '@/public/images/공용공간A.jpg'
import SPACE_B from '@/public/images/공용공간B.jpg'
import STUDY_ROOM_B from '@/public/images/스터디룸B.jpg'
import { Divider } from '@/src/components/common/Dividers'
import Loading from '@/src/components/common/Loading'
import { Button } from '@/src/components/ui/button'
import { ClientModalData } from '@/src/lib/constants/modal_data'
import { ROUTES } from '@/src/lib/constants/route'
import useAuthStore from '@/src/lib/context/authContext'
import useRoomStateStore, { RoomReservationTime } from '@/src/lib/context/roomContext'
import useCalenderDropdown from '@/src/lib/hooks/useCalenderDropdown'
import useModal from '@/src/lib/hooks/useModal'
import useSelectDropdown from '@/src/lib/hooks/useSelectDropdown'
import { RoomStatus } from '@/src/lib/HTTP/api/room/api'
import { QUERY_KEYS } from '@/src/lib/HTTP/api/tanstack-query'
import { cn } from '@/src/lib/utils/cn'

const convertRoomNameToNumber = (room_name: string): number => {
  switch (room_name) {
    case '스터디룸B':
      return 1
    case '공용공간A':
      return 2
    case '공용공간B':
      return 3
  }
  return 0
}

const generateTimeIntervals = (startTime: string, endTime: string, intervalMinutes = 30) => {
  const times = []
  let [hour, minute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  while (true) {
    times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
    minute += intervalMinutes
    if (minute >= 60) {
      minute -= 60
      hour += 1
    }
    if (hour >= 24) {
      hour -= 24
    }
    // 마지막 더하기
    if (hour == endHour && minute == endMinute) {
      times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
      break
    }
  }

  return times
}

const ROOM_IMAGES = [STUDY_ROOM_B, SPACE_A, SPACE_B]
export const ROOM_TEXT_CANDIDATES = ['스터디룸B', '공용공간A', '공용공간B']
interface StudyRoomReservePageProps {}

const StudyRoomReservePage = ({}: StudyRoomReservePageProps): ReactNode => {
  const router = useRouter()
  const { studentId, name } = useAuthStore()

  const { room_number, setRoomNumber, date, setDate, time, setTime, leader, setLeader } = useRoomStateStore()

  const { modalData, openModal, Modal } = useModal()
  // #0. 대표자는 본인
  useEffect(() => {
    if (studentId !== null && name !== null) {
      if (!studentId || !name) {
        openModal(ClientModalData.ROOM.RESERVE.AUTH_REQUIRED)
      }
      // 로그인 상태
      else {
        setLeader({
          studentId,
          name,
        })
      }
    }
  }, [studentId, name])

  // #1. 이용공간 State
  const { value: room_name, SelectDropdown: SelectRoomDropdown } = useSelectDropdown<string>({
    placeHolder: '이용공간을 선택해주세요',
    candidates: ROOM_TEXT_CANDIDATES,
  })
  useEffect(() => {
    if (room_name) {
      const converted_room_number = convertRoomNameToNumber(room_name)
      setRoomNumber(converted_room_number)
    }
    setTime(undefined, undefined)
  }, [room_name])

  // #2. 날짜 State
  const { date: tmp_date, CalenderDropdown } = useCalenderDropdown({
    placeHolder: '예약 날짜를 선택해주세요',
  })

  useEffect(() => {
    if (tmp_date) {
      setDate(tmp_date)
    }
    setTime(undefined, undefined)
  }, [tmp_date])

  // #3. 시간 State
  const isDone: boolean = Boolean(leader && room_number && date && time && time.startTime && time.endTime) // 모든게 있으면 완료 상태

  const {
    data,
    isPending: isPendingRoomStatus,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.ROOM.STATUS, room_number, date],
    queryFn: ({ signal }) => {
      return RoomStatus({ signal, room_number: room_number as number, date: date?.toLocaleDateString('en-CA') as string })
    },
    enabled: room_number !== undefined && date !== undefined,
  })
  let time_contents
  if (isPendingRoomStatus) {
    time_contents = <Loading className='flex items-center justify-center' />
  }
  if (data && data.content) {
    const [START_TIME, END_TIME] = ['09:00', '20:00']
    const timeSelections = generateTimeIntervals(START_TIME, END_TIME)

    const isOccupiedObj = data.content

    time_contents = timeSelections.map(timeSelection => (
      <TimeSelector
        key={timeSelection}
        value={timeSelection}
        isOccupied={isOccupiedObj[timeSelection]}
        time={time}
        setTime={setTime}
        className='w-full px-3 py-2 text-sm'
      />
    ))
  }

  // Functions
  const onConfirmHandler = () => {
    switch (modalData) {
      case ClientModalData.ROOM.RESERVE.AUTH_REQUIRED:
        router.push(ROUTES.AUTH.LOGIN.url)
        break
    }
  }

  const stepHandler = () => {
    // console.log('leader is ', leader)

    router.push(ROUTES.ROOM.RESERVE.STEP2.url)
  }

  return (
    <div className='relative mt-24 grid w-[90%] max-w-[1800px] flex-grow grid-cols-1 place-items-center gap-8 py-6 md:grid-cols-2 lg:mt-0'>
      <div className='flex h-full w-full flex-col items-start justify-start gap-3'>
        <p className='text-2xl font-bold'>1. 이용공간</p>
        <div className='flex h-fit w-full flex-col items-start justify-start gap-2'>
          <SelectRoomDropdown className='h-16 w-64 bg-swWhite px-3 py-1' />
          {!room_number ? (
            <div className='flex aspect-card w-full items-center justify-center rounded-md bg-swGrayLight text-2xl font-bold'>
              예약하고자 하는 공간을 선택해주세요
            </div>
          ) : (
            <Image src={ROOM_IMAGES[room_number - 1]} alt='선택된 공간' />
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
              <span className='h-4 w-10 rounded-sm border border-solid border-swGrayDark bg-swBackDrop' />
              <span className='text-sm font-bold text-swGrayDark'>예약 확정</span>
            </div>
          </div>

          {room_number == undefined || date == undefined ? (
            <div className='flex h-11 items-center justify-start font-semibold'>이용공간과 날짜를 선택해주세요.</div>
          ) : (
            <div className='grid w-full grid-cols-4 items-start justify-start gap-x-2 gap-y-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
              {time_contents}
            </div>
          )}

          <Button variant={isDone ? 'swBlack' : 'swBlackDisabled'} className='mt-5 w-full' disabled={!isDone} onClick={stepHandler}>
            다음
          </Button>
        </div>
      </div>
      <Modal onConfirm={onConfirmHandler} />
    </div>
  )
}

export default StudyRoomReservePage

interface TimeSelectorProps {
  value: string
  isOccupied: boolean
  time?: RoomReservationTime
  setTime: (startTime: string, endTime: string | undefined) => void
  className: string
}
const TimeSelector = ({ value, isOccupied, time, setTime, className }: TimeSelectorProps): ReactNode => {
  const clickHandler = () => {
    // 시작시간이 없거나, 시작과 끝 시간이 둘 다 있는 경우 (초기화)
    if (!time?.startTime || (time.startTime && time.endTime)) {
      setTime(value, undefined) // 새로운 시작 시간 설정
      return
    }

    // 시작 시간은 있지만 끝 시간이 없는 경우
    if (!time?.endTime) {
      const [startHour, startMin] = time.startTime.split(':').map(Number)
      const [valueHour, valueMin] = value.split(':').map(Number)

      // 선택한 시간이 시작 시간보다 이른 경우
      if (valueHour < startHour || (valueHour === startHour && valueMin < startMin)) {
        setTime(value, time.startTime)
      } else {
        setTime(time.startTime, value)
      }
      return
    }
  }

  const isColored = (): boolean => {
    // 시작시간인 경우
    if (time?.startTime && time.startTime === value) {
      return true
    }
    if (!time?.startTime || !time.endTime || !value) {
      return false
    }

    // 시간 문자열을 [시, 분] 숫자 배열로 변환
    const [startHour, startMin] = time.startTime.split(':').map(Number)
    const [endHour, endMin] = time.endTime.split(':').map(Number)
    const [valueHour, valueMin] = value.split(':').map(Number)

    // value가 시작 시간과 같으면 true
    if (valueHour === startHour && valueMin === startMin) {
      return true
    }

    // value가 두 시간 사이에 포함되는지 확인
    if (
      (valueHour > startHour || (valueHour === startHour && valueMin >= startMin)) &&
      (valueHour < endHour || (valueHour === endHour && valueMin <= endMin))
    ) {
      return true
    }

    return false
  }

  return (
    <p
      className={cn(
        'cursor-pointer rounded-sm border border-solid border-swGrayDark text-center text-sm',
        isOccupied ? 'bg-swBackDrop' : 'bg-swWhite',
        isColored() ? 'bg-swGreenLight' : '',
        className,
      )}
      onClick={clickHandler}
    >
      {value}
    </p>
  )
}
