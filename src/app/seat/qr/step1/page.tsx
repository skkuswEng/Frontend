'use client'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

import LucideIcon from '@/src/components/provider/LucideIcon'
import { ClientModalData } from '@/src/lib/constants/modal_data'
import { ROUTES } from '@/src/lib/constants/route'
import useModal from '@/src/lib/hooks/useModal'

interface LocationCheckPageProps {}

// 성균관대학교 SW 라운지 좌표와 반경 정의
const SW_LOUNGE_COORDS = { lat: 37.29595244638191, lng: 126.97582572698593 } // 예시 좌표
const RADIUS_KM = 10000 // 반경 300m

// 원형 반경 계산 함수 (하버사인 공식)
const isWithinLocation = (lat: number, lng: number, center: { lat: number; lng: number }, radius: number): boolean => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180
  const earthRadius = 6371 // 지구 반지름 (km)

  const dLat = toRadians(lat - center.lat)
  const dLng = toRadians(lng - center.lng)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(center.lat)) * Math.cos(toRadians(lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = earthRadius * c

  return distance <= radius
}

const LocationCheckPage = ({}: LocationCheckPageProps): ReactNode => {
  const router = useRouter()
  const [isInLocation, setIsInLocation] = useState<boolean | null>(null) // 위치 확인 상태
  const [loading, setLoading] = useState(true) // 로딩 상태

  const { modalData, Modal, openModal } = useModal()

  // 위치 확인 함수
  const checkLocation = () => {
    if (!navigator.geolocation) {
      setIsInLocation(false)
      setLoading(false)
      openModal(ClientModalData.SEAT.RESERVATION.AUTHORITY_REQUIRED)

      return
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        const isWithinRadius = isWithinLocation(latitude, longitude, SW_LOUNGE_COORDS, RADIUS_KM) // 현재 위치 확인
        setIsInLocation(isWithinRadius)
        setLoading(false)
      },
      error => {
        openModal(ClientModalData.SEAT.RESERVATION.AUTHORITY_REQUIRED)
        setIsInLocation(null)
        setLoading(false)
      },
    )
  }
  useEffect(() => {
    if (isInLocation) {
      setTimeout(() => {
        router.push(ROUTES.SEAT.QR.STEP2.url)
      }, 1000)
    }
    console.log(isInLocation)
  }, [isInLocation])

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      openModal(ClientModalData.SEAT.QR)
      return
    }
    checkLocation()
  }, [])

  const confirmHandler = () => {
    switch (modalData) {
      case ClientModalData.SEAT.RESERVATION.AUTHORITY_REQUIRED:
        break
      case ClientModalData.SEAT.QR:
        router.push(ROUTES.MAIN.url) // 메인으로 강제 Redirect
        break

      default:
        break
    }
  }

  return (
    <div className='relative mt-24 flex w-[90%] max-w-[1800px] flex-grow flex-col items-start justify-start gap-4 py-6'>
      <p className='text-2xl font-bold'>QR코드 좌석 배정</p>
      <div className='flex flex-col items-start justify-start gap-2 text-2xl font-bold'>
        <span>1. 위치 확인</span>
        <span className='ml-4 text-sm text-swBackDrop'>* SW 라운지에 위치하고 있는지 확인합니다.</span>
      </div>
      <div className='mt-10 flex w-full items-center justify-center gap-6'>
        <LucideIcon name={!isInLocation ? 'MapPin' : 'CircleCheckBig'} size={26} />
        <div className='flex flex-col items-start justify-start gap-2 text-xl font-bold'>
          {loading ? (
            <>
              <span>위치를 확인중입니다</span>
              <span>잠시만 기다려주세요...</span>
            </>
          ) : isInLocation ? (
            <>
              <span className='text-swBlue'>위치 확인 완료</span>
              <span className='text-swBlue'>SW 라운지 내에 있습니다.</span>
            </>
          ) : (
            <>
              <span className='text-swRed'>해당 위치는 라운지가 아닙니다</span>
              <span className='text-swRed'>SW 라운지에 위치해주세요</span>
            </>
          )}
        </div>
      </div>
      <Modal onConfirm={confirmHandler} />
    </div>
  )
}

export default LocationCheckPage
