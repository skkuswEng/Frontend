'use client'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

import Loading from '@/src/components/common/Loading'
import LucideIcon from '@/src/components/provider/LucideIcon'
import { Button } from '@/src/components/ui/button'
import { ClientModalData } from '@/src/lib/constants/modal_data'
import { ROUTES } from '@/src/lib/constants/route'
import useAuthStore from '@/src/lib/context/authContext'
import useModal from '@/src/lib/hooks/useModal'
import { toast } from '@/src/lib/hooks/useToast'
import { dataToISOString } from '@/src/lib/HTTP'
import { FCMTokenType } from '@/src/lib/HTTP/api/auth/api'
import { SeatReserveType, SeatStatus } from '@/src/lib/HTTP/api/seat/api'
import { QUERY_KEYS, useMutationStore } from '@/src/lib/HTTP/api/tanstack-query'
import { checkMessageSupport, requestPermissionAndGetToken } from '@/src/lib/service-worker/firebase'
// import { initFirebaseApp, requestPermissionAndGetToken } from '@/src/lib/service-worker/firebase'
import { cn } from '@/src/lib/utils/cn'

interface SeatStatusAreaProps {
  onSeatClick: (seat_number: number) => void
}

type seat = {
  seat_number: number
  isSeated: boolean
}

const SeatStatusArea = ({ onSeatClick }: SeatStatusAreaProps): ReactNode => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: QUERY_KEYS.SEAT.STATUS,
    queryFn: ({ signal }) => SeatStatus(),
  })

  let contents
  if (isPending) {
    contents = (
      <div className='relative flex aspect-square w-full flex-grow flex-col items-center justify-center bg-swWhite md:aspect-auto'>
        <Loading size={40} />
      </div>
    )
  }
  if (data) {
    const WINDOW_SEAT_GROUP = Array.from({ length: 6 }, (_, idx) => {
      return { seat_number: idx + 1, isSeated: data.content?.seat_list[idx] } as seat
    })
    const DEST_SEAT_GROUP = Array.from({ length: 12 }, (_, idx) => {
      return { seat_number: idx + 7, isSeated: data.content?.seat_list[idx + 6] } as seat
    })

    contents = (
      <div className='relative flex aspect-square w-full flex-grow flex-col items-center justify-between bg-swWhite md:aspect-auto'>
        <div className='mx-4 my-6 grid h-[11%] w-fit grid-cols-6 grid-rows-1 gap-2 self-start md:mx-8 md:h-[15%] md:gap-4'>
          {WINDOW_SEAT_GROUP.map(seat => (
            <p
              key={seat.seat_number}
              onClick={() => onSeatClick(seat.seat_number)}
              className={cn(
                'flex aspect-square h-full cursor-pointer items-center justify-center rounded-sm text-base font-semibold md:text-lg',
                seat.isSeated ? 'bg-swGrayLight hover:bg-swGreenLight' : 'bg-swGreenLight hover:bg-swGrayLight',
              )}
            >
              {seat.seat_number}
            </p>
          ))}
        </div>
        <div className='flex aspect-video w-1/2 items-center justify-center rounded-lg bg-[#FFF495] text-lg font-semibold md:aspect-[6/2] md:text-2xl'>
          휴게 공간
        </div>
        <div className='mx-4 my-6 grid h-[24%] w-fit grid-cols-6 grid-rows-2 gap-2 self-end md:mx-8 md:h-[34%] md:gap-3'>
          {DEST_SEAT_GROUP.map(seat => (
            <p
              key={seat.seat_number}
              onClick={() => onSeatClick(seat.seat_number)}
              className={cn(
                'flex aspect-square h-full cursor-pointer items-center justify-center rounded-sm text-base font-semibold md:text-lg',
                seat.isSeated ? 'bg-swGrayLight hover:bg-swGreenLight' : 'bg-swGreenLight hover:bg-swGrayLight',
              )}
            >
              {seat.seat_number}
            </p>
          ))}
        </div>
      </div>
    )
  }

  return contents
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
  const router = useRouter()
  const searchParams = useSearchParams()
  const { studentId } = useAuthStore()
  // Hooks
  const { isOpen, modalData, Modal, openModal } = useModal()
  const [selectedSeat, setSelectedSeat] = useState<number>(-1)

  // Query & Mutation
  const { mutate: ReserveMutate, isPending: isReserving } = useMutationStore<SeatReserveType>(['seat_reserve'])
  const { mutate: TokenMutate, isPending: isSendingToken } = useMutationStore<FCMTokenType>(['fcm_token'])

  useEffect(() => {
    if (searchParams.has('n') && searchParams.get('n') != null) {
      const seat_number = parseInt(searchParams.get('n') as string)
      setSelectedSeat(seat_number)
      // QR코드를 찍고 방문한 경우
      if (seat_number != -1) {
        openModal(ClientModalData.SEAT.RESERVATION.RESERVE(seat_number))
      }
    }
  }, [])

  // Functions
  const seatSelectHandler = (seat_number: number) => {
    setSelectedSeat(seat_number)
    openModal(ClientModalData.SEAT.RESERVATION.RESERVE(seat_number))
  }

  const QRRouteHandler = () => {
    if (window.innerWidth >= 1024) {
      openModal(ClientModalData.SEAT.QR)
      return
    }
    router.push(ROUTES.SEAT.QR.STEP1.url)
  }
  //Functions
  const handleGetToken = async () => {
    try {
      // initFirebaseApp()
      const messaging = checkMessageSupport()
      const token = await requestPermissionAndGetToken(messaging)
      if (token && studentId) {
        // TODO: 백엔드로 토큰 보내기
        TokenMutate(
          {
            student_id: studentId,
            token: token,
          },
          {
            onSuccess(data, variables, context) {
              console.log('token을 정상적으로 보냈습니다.')
            },
          },
        )
      }
    } catch (error) {
      console.log('error occured in handleGetToken', error)
    }
  }
  // TODO:예약하기 API
  const reserveHandler = () => {
    switch (JSON.stringify(modalData)) {
      case JSON.stringify(ClientModalData.SEAT.RESERVATION.RESERVE(selectedSeat)):
        if (!studentId) {
          toast({ title: '로그인이 필요합니다' })
          router.push(ROUTES.AUTH.LOGIN.url)
          return
        }

        ReserveMutate(
          {
            studentId: studentId,
            seat_number: selectedSeat,
            reservation_date: dataToISOString(new Date()), // ISO String Format
          },
          {
            onSuccess(data, variables, context) {
              router.push(ROUTES.MAIN.url)
              handleGetToken() // 토큰 받아오기
            },
          },
        )
        break

      default:
        break
    }
  }
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

        <SeatStatusArea onSeatClick={seatSelectHandler} />
      </div>

      <div className='flex h-full w-full flex-col items-start justify-start gap-3 md:w-4/5'>
        <div className='flex w-full items-center justify-center gap-3 text-swRed md:justify-start'>
          <LucideIcon name='Hash' size={24} />
          <span className='text-lg font-bold'>공간 이용 시 주의사항</span>
        </div>
        <div className='relative flex w-full flex-col items-center justify-start gap-1 md:gap-2'>
          {SEAT_WARNINGS.map(warning => (
            <p
              key={warning}
              className='w-full rounded-lg border border-solid border-swGray bg-swGrayLight py-3 text-center text-sm font-medium lg:text-sm'
            >
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

        <Button variant='swGreen' className='mt-5 flex w-full items-center justify-center gap-2' onClick={QRRouteHandler}>
          <LucideIcon name='ScanLine' strokeWidth={2} />
          <span>QR코드 배정하기</span>
        </Button>
      </div>
      <Modal onConfirm={reserveHandler} />
    </div>
  )
}

export default ReservePage
