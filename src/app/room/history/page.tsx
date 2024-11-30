'use client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

import { Divider } from '@/src/components/common/Dividers'
import Loading from '@/src/components/common/Loading'
import { ClientModalData } from '@/src/lib/constants/modal_data'
import { ROUTES } from '@/src/lib/constants/route'
import useAuthStore from '@/src/lib/context/authContext'
import useModal from '@/src/lib/hooks/useModal'
import { toast } from '@/src/lib/hooks/useToast'
import { RoomUnreserveType, RoomUserReservation } from '@/src/lib/HTTP/api/room/api'
import { QUERY_KEYS, useMutationStore } from '@/src/lib/HTTP/api/tanstack-query'
import { cn } from '@/src/lib/utils/cn'
import { formatDateToString, formatTimeRange } from '@/src/lib/utils/date-utils'

// 백엔드가 보내주는 데이터 형식
export type RoomDataType = {
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
interface RoomHistoryProps {}

const RoomHistory = ({}: RoomHistoryProps): ReactNode => {
  const { studentId, name } = useAuthStore()

  // #1. 스터디룸 예약 정보 Fetch
  const { data, isPending: isPendingRoom } = useQuery({
    queryKey: QUERY_KEYS.ROOM.USER_STATUS,
    queryFn: ({ signal }) => {
      return RoomUserReservation({ signal, studentId: studentId as string })
    },
    enabled: studentId != null,
  })

  let room_data: RoomDataType[] = []
  if (data && data.content) {
    // console.log(data)
    const datas: any = data.content.reserve
    room_data = [...datas].reverse().map((item: any) => ({
      room_number: item.room_number,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      leader: {
        student_id: item.leader.student_id,
        name: item.leader.name,
      },
      companion: item.companionData.map((comp: any) => ({
        student_id: comp.student_id,
        name: comp.name,
      })),
    }))
  }

  return (
    <div className='relative mt-24 flex w-[90%] max-w-[1700px] flex-grow flex-col items-start justify-start gap-4 py-6 lg:mt-0'>
      <p className='text-2xl font-bold'>스터디룸 예약현황</p>
      <span className='text-sm text-swBackDrop'>* 앞으로 다가오는 스터디룸 예약 정보입니다.</span>

      <div className='relative grid h-full w-full grid-cols-1 place-items-start gap-5 md:grid-cols-2'>
        {/* 예약 내역 */}
        {room_data.length > 0 ? (
          room_data.map((data, index) => <HistoryCard key={index} data={data} userStudentId={studentId} className='h-full w-full' />)
        ) : (
          <p className='text-sm text-swGray'>예약된 내역이 없습니다.</p>
        )}
        <Divider className='md:hidden' />
      </div>
    </div>
  )
}

export default RoomHistory

interface HistoryCardProps {
  data: RoomDataType
  userStudentId: string | null
  prev?: boolean
  className?: string
}

const HistoryCard = ({ data, prev, userStudentId, className }: HistoryCardProps): ReactNode => {
  const router = useRouter()
  const { modalData, openModal, Modal } = useModal()

  // Static Data
  const { room_number, startDate, endDate, leader, companion } = data
  const cnt_users = 1 + companion.length

  const updateHandler = () => {
    // TODO: RoomContext를 해당 정보 (data)로 변경 후 이동.
    router.push(ROUTES.ROOM.RESERVE.STEP1.url)
  }

  const { mutate: UnreserveMutate, isPending: isDeleting } = useMutationStore<RoomUnreserveType>(['room_unreserve'])

  const confirmHandler = () => {
    switch (modalData) {
      case ClientModalData.ROOM.UNRESERVE.CONFIRM:
        // 로그인하지 않은 경우
        if (!userStudentId) {
          toast({ title: '로그인이 필요합니다!' })
          router.push(ROUTES.AUTH.LOGIN.url)
          return
        }
        // 대표가 아닌 경우
        if (userStudentId !== leader.student_id) {
          toast({ title: '예약 대표만이 취소할 수 있습니다!' })
          return
        }
        if (userStudentId) {
          UnreserveMutate(
            {
              student_id: userStudentId,
              room_number,
              startDate,
              endDate,
            },
            {
              onSuccess(data, variables, context) {
                toast({ title: '스터디룸 예약을 취소하였습니다', variant: 'success' })
                router.push(ROUTES.ROOM.HISTORY.url) // 내경로로
              },
            },
          )
        }
    }
  }

  return (
    <div
      className={cn(
        'relative flex flex-col items-start justify-start gap-2 rounded-md border border-solid border-swGrayDark bg-swGrayLight px-6 py-4',
        className,
      )}
    >
      <p className='text-base font-bold md:text-xl'>예약 정보</p>

      <Description text='스터디룸' value={['스터디룸B', '공용공간A', '공용공간B'][room_number - 1]} />
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
      {!prev && (
        <div className='absolute right-6 top-6 flex items-center justify-center gap-3'>
          {!isDeleting ? (
            <span
              onClick={() => openModal(ClientModalData.ROOM.UNRESERVE.CONFIRM)}
              className='cursor-pointer text-sm text-swRed hover:font-medium hover:text-swHoverRed hover:underline'
            >
              예약 취소
            </span>
          ) : (
            <Loading />
          )}
          <span onClick={updateHandler} className='cursor-pointer text-sm hover:font-medium hover:underline'>
            수정
          </span>
        </div>
      )}
      <Modal onConfirm={confirmHandler} />
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
