'use client'
// pages/index.js
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import SKKUCharacterImg from '../../public/images/skku_character.png'
import Asterisk from '../components/common/Asterisk'
import Eyes from '../components/common/Eyes'
import Loading from '../components/common/Loading'
import Logo from '../components/common/Logo'
import LucideIcon from '../components/provider/LucideIcon'
import { ClientModalData } from '../lib/constants/modal_data'
import { ROUTES, RouteType } from '../lib/constants/route'
import useAuthStore from '../lib/context/authContext'
import { requestPermissionAndGetToken } from '../lib/firebase'
import useModal from '../lib/hooks/useModal'
import { toast } from '../lib/hooks/useToast'
import { RoomUserReservation } from '../lib/HTTP/api/room/api'
import { SeatUnreserveType, SeatUserReservation } from '../lib/HTTP/api/seat/api'
import { QUERY_KEYS, useMutationStore } from '../lib/HTTP/api/tanstack-query'
import { cn } from '../lib/utils/cn'
import { formatDateRange } from '../lib/utils/date-utils'

const MainPage = () => {
  const { studentId } = useAuthStore()

  // States
  const [fcmToken, setFcmToken] = useState<string>()
  // #1. 좌석 정보 Fetch
  const { data: user_seat_data, isPending: isPendingSeat } = useQuery({
    queryKey: QUERY_KEYS.SEAT.USER_STATUS,
    queryFn: ({ signal }) => {
      return SeatUserReservation({ signal, studentId: studentId as string })
    },
    enabled: studentId != null,
  })
  let user_seat // 0 : no seat / 1 ~ 18: seat 배정
  if (user_seat_data) {
    user_seat = parseInt(user_seat_data.content?.seat_number as string)
  }

  // #2. 스터디룸 예약 정보 Fetch
  const { data: user_room_data, isPending: isPendingRoom } = useQuery({
    queryKey: QUERY_KEYS.ROOM.USER_STATUS,
    queryFn: ({ signal }) => {
      return RoomUserReservation({ signal, studentId: studentId as string })
    },
    enabled: studentId != null,
  })
  let user_room
  if (user_room_data) {
    user_room = user_room_data.content?.reserve.map((item: any) => ({
      startDate: item.startDate,
      endDate: item.endDate,
      cnt: item.companionData.length + 1, // 자기자신 넣기
    }))
  }

  //Functions
  const handleGetToken = async () => {
    try {
      const token = await requestPermissionAndGetToken()
      if (token) {
        console.log('FCM Token:', token)
        setFcmToken(token)
      }
    } catch (error) {
      console.log('error occured in handleGetToken', error)
    }
  }
  return (
    <div className='relative mt-24 flex w-screen flex-grow flex-col items-center justify-center gap-4 lg:mt-0'>
      <Logo text='SoKK' className='py-4 text-7xl lg:hidden' />
      <p className='w-fit text-center text-2xl font-bold text-swBlack sm:text-3xl lg:hidden'>
        소프트웨어 라운지
        <br />
        AI 통합 관리 시스템
      </p>
      <button onClick={handleGetToken}>알림 권한 요청 및 FCM 토큰 가져오기</button>
      <section className='relative flex h-44 w-[90%] max-w-[1800px] items-center justify-between lg:h-1/3'>
        <Asterisk className='w-20 self-start bg-[#DDFEC0] sm:w-24 lg:w-28' />
        <div className='flex h-max w-auto items-center justify-center self-end'>
          <Logo text='So' className='relative -right-6 hidden text-xl lg:block lg:text-9xl' />
          <Eyes className='hidden h-40 w-32 lg:block lg:h-80 lg:w-56' />
          <Logo text='KK' className='relative -left-6 hidden text-xl lg:block lg:text-9xl'>
            <p className='absolute -right-36 -top-6 w-max text-base font-medium text-swBlack'>AI로 관리하는 스마트한 라운지 생활</p>
          </Logo>
          <Image src={SKKUCharacterImg} alt='skku_character' className='lg:hidden' />
        </div>
        <Asterisk className='w-20 self-end bg-swWhite sm:w-24 lg:w-28' />
      </section>

      {/* TODO: 로그인 상태 확인 후 href 조정 */}
      <div className='relative z-30 -mt-4 grid w-[90%] max-w-[1800px] grid-cols-1 gap-4 sm:grid-cols-2 lg:-top-9 lg:grid-cols-3'>
        <Card
          title='좌석 배정'
          subtitle='라운지 좌석 배정하기'
          href={ROUTES.SEAT.RESERVE(-1).url}
          qr={true}
          qrHref={ROUTES.SEAT.QR.STEP1.url}
          isPendingSeat={isPendingSeat}
          user_seat={user_seat}
          className='h-60 w-full bg-swGreen hover:bg-swHoverGreen sm:col-span-2 lg:order-2 lg:col-span-1 lg:aspect-card lg:h-auto'
        />
        <Card
          title='스터디룸 예약'
          subtitle='스터디룸 예약하기'
          href={ROUTES.ROOM.RESERVE.STEP1.url}
          user_room={user_room}
          isPendingRoom={isPendingRoom}
          className='h-60 w-full bg-swGreenLight hover:bg-swHoverGreenLight lg:order-1 lg:aspect-card lg:h-auto'
        />
        <Card
          title='이용 수칙'
          subtitle='이용 수칙 확인하기'
          href={ROUTES.ETC.LOUNGE_RULES.url}
          className='h-60 w-full bg-swGray hover:bg-swHoverGray lg:order-3 lg:aspect-card lg:h-auto'
        />
      </div>
    </div>
  )
}

export default MainPage

interface CardProps {
  title: string
  subtitle: string
  href: RouteType | string
  qrHref?: RouteType // QR 버튼 전용 링크를 추가
  qr?: boolean
  user_seat?: number
  isPendingSeat?: boolean
  user_room?: {
    startDate: Date
    endDate: Date
    cnt: number
  }[]
  isPendingRoom?: boolean
  className?: string
}

const Card = ({ title, subtitle, href, qrHref, qr, user_seat, isPendingSeat, user_room, isPendingRoom, className }: CardProps) => {
  const router = useRouter()
  const { isOpen, modalData, Modal, openModal } = useModal()
  const { studentId } = useAuthStore()

  const { mutate: UnreserveMutate, isPending } = useMutationStore<SeatUnreserveType>(['seat_unreserve'])

  // 메인 링크로 이동하는 함수
  const handleCardClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      if (title == '이용 수칙') {
        window.open(ROUTES.ETC.LOUNGE_RULES.url, '_blank')
        return
      }
      router.push(href)
    }
  }

  // QR 버튼 전용 링크로 이동하는 함수
  const handleQRClick = (e: React.MouseEvent) => {
    // e.stopPropagation() // 이벤트 전파 방지 (부모로 전파되지 않도록)
    // let route = true
    if (window.innerWidth >= 1024) {
      openModal(ClientModalData.SEAT.QR)
      return
    }
    if (qrHref) {
      router.push(qrHref)
    }
  }

  const confirmHandler = () => {
    switch (JSON.stringify(modalData)) {
      case JSON.stringify(ClientModalData.SEAT.RESERVATION.UNRESERVE(user_seat as number)):
        if (!user_seat) {
          toast({ title: '배정된 좌석이 없습니다' })
          return
        }
        if (!studentId) {
          toast({ title: '로그인 해주세요' })
          return
        }

        UnreserveMutate(
          { studentId: studentId, seat_number: user_seat },
          {
            onSuccess(data, variables, context) {
              toast({ title: '좌석이 반납되었습니다' })
              router.refresh()
            },
          },
        )
        break

      default:
        break
    }
  }

  let btnContent
  if (qr) {
    if (isPendingSeat) {
      btnContent = (
        <Loading className='absolute bottom-5 right-5 flex items-center justify-center gap-2 rounded-full font-bold text-swWhite' />
      )
    } else if (user_seat) {
      btnContent = (
        <button
          onClick={() => openModal(ClientModalData.SEAT.RESERVATION.UNRESERVE(user_seat))} // QR 버튼 클릭 시 전용 링크로 이동
          className='absolute bottom-5 right-5 flex items-center justify-center gap-2 rounded-full bg-swBlack px-5 py-3 font-bold text-swWhite hover:border hover:border-solid hover:border-swBlack hover:bg-swWhite hover:text-swBlack'
        >
          <LucideIcon name='Undo2' strokeWidth={4} />
          반납
        </button>
      )
    } else {
      btnContent = (
        <button
          onClick={handleQRClick} // QR 버튼 클릭 시 전용 링크로 이동
          className='absolute bottom-5 right-5 flex items-center justify-center gap-2 rounded-full bg-swBlack px-5 py-3 font-bold text-swWhite hover:border hover:border-solid hover:border-swBlack hover:bg-swWhite hover:text-swBlack'
        >
          <LucideIcon name='ScanLine' strokeWidth={4} />
          QR
        </button>
      )
    }
  }

  let seat_text
  if (qr && user_seat) {
    seat_text = <p className='absolute bottom-8 border-b border-solid border-swBlack font-semibold'>{user_seat}번 좌석 이용 중</p>
  }

  let room_text
  if (isPendingRoom) {
    room_text = <Loading className='absolute bottom-5 left-5 flex items-center justify-center gap-2 rounded-full font-bold text-swWhite' />
  }
  if (user_room) {
    room_text = [...user_room].reverse().map((item, index) => (
      <p key={index} className='font-semibold'>
        {formatDateRange(new Date(item.startDate), new Date(item.endDate))} ({item.cnt}명)
      </p>
    ))
  }
  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'group relative flex cursor-pointer flex-col items-start gap-2 rounded-xl border-2 border-solid border-swBlack p-7 shadow-sw-shadow',
        className,
      )}
    >
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='text-base text-gray-600'>{subtitle}</p>
      {<div className='absolute bottom-4'>{room_text}</div>}
      {seat_text}
      {title === '이용 수칙' && (
        <div className='absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-swBlack group-hover:bg-swWhite'>
          <LucideIcon name='ArrowUpRight' size={26} />
        </div>
      )}
      {btnContent}
      <Modal onConfirm={confirmHandler} />
    </div>
  )
}
