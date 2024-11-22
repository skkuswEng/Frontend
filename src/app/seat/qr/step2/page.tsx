'use client'
import React, { ReactNode } from 'react'

interface QRReservePageProps {}

/**
 * QR코드를 인식하는 페이지
 * @param param0
 * @returns
 */
const QRReservePage = ({}: QRReservePageProps): ReactNode => {
  return (
    <div className='relative mt-24 flex w-[90%] max-w-[1800px] flex-grow flex-col items-start justify-start gap-4 py-6'>
      <p className='text-2xl font-bold'>QR코드 좌석 배정</p>
      <div className='flex flex-col items-start justify-start gap-2 text-2xl font-bold'>
        <span>2. 위치 확인</span>
        <span className='ml-4 text-sm text-swBackDrop'>* 좌석의 QR코드를 인식해주세요.</span>
      </div>
    </div>
  )
}

export default QRReservePage
