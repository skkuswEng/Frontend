'use client'
import { useRouter } from 'next/navigation' // Next.js 라우팅 훅 사용
import QrScanner from 'qr-scanner'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

const ROUTES = {
  SEAT: {
    RESERVE: '/seat/reserve', // 라우팅할 경로
  },
}

interface QRReservePageProps {}

/**
 * QR코드를 인식하는 페이지
 * @param param0
 * @returns
 */
const QRReservePage = ({}: QRReservePageProps): ReactNode => {
  const [scanResult, setScanResult] = useState<string | null>(null) // 문자열로 저장
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  const router = useRouter() // 라우터 인스턴스 생성

  // QR 스캔 결과 처리 함수
  const handleScanResult = (result: { data: string; cornerPoints: any[] }) => {
    setScanResult(result.data) // 필요한 데이터만 상태에 저장

    // 스캔 결과가 유효하면 라우팅
    if (result.data) {
      router.push(result.data)
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      // QRScanner 초기화
      const qrScanner = new QrScanner(videoRef.current, result => handleScanResult(result), {
        highlightScanRegion: true, // 스캔 영역 강조
        highlightCodeOutline: true, // QR코드 경계 강조
      })
      scannerRef.current = qrScanner
      qrScanner.start().catch(console.error) // 카메라 시작

      return () => {
        qrScanner.stop()
      }
    }
  }, [])

  return (
    <div className='relative mt-24 flex w-[90%] max-w-[1800px] flex-grow flex-col items-start justify-start gap-4 py-6'>
      <p className='text-2xl font-bold'>QR코드 좌석 배정</p>
      <div className='flex flex-col items-start justify-start gap-2 text-2xl font-bold'>
        <span>2. QR코드 인식</span>
        <span className='ml-4 text-sm text-swBackDrop'>* 좌석의 QR코드를 인식해주세요.</span>
      </div>

      {/* QR 스캔 비디오 영역 */}
      <div className='relative mt-4 flex aspect-[9/16] flex-col items-center justify-start gap-2 md:aspect-video'>
        <video ref={videoRef} className='border border-gray-300' style={{ width: '100%', height: 'auto' }}></video>
      </div>
    </div>
  )
}

export default QRReservePage
