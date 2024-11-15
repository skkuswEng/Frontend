'use client'
import React, { ReactNode } from 'react'

import useSelectDropdown from '@/src/lib/hooks/useDropdown'

interface StudyRoomReservePageProps {}

const StudyRoomReservePage = ({}: StudyRoomReservePageProps): ReactNode => {
  const { value, SelectDropdown } = useSelectDropdown({ placeHolder: '이용공간을 선택해주세요', candidates: ['스터리룸B', '공용공간A', '공용공간B'] })

  return (
    <div className='relative mt-24 grid w-[90%] max-w-[1800px] flex-grow grid-cols-1 place-items-center py-6 lg:mt-0 lg:grid-cols-2'>
      <div className='flex h-full w-full flex-col items-start justify-start gap-3'>
        {/* 순서컴포넌트화 시켜서 사용하기 */}
        <p className='text-2xl font-bold'>1. 이용공간</p>
        <SelectDropdown className='ml-4 h-16 w-64 bg-swWhite px-3 py-1' />
        {/* <Select>
          <SelectTrigger className='ml-4 h-16 w-64 border border-solid border-swGrayDark text-lg font-medium'>
            <SelectValue placeholder='이용공간을 선택해주세요' />
          </SelectTrigger>
          <SelectContent className='h-max w-64 rounded-md border-none'>
            <SelectGroup>
              <SelectItem value='StudyRoomB' className='flex h-12 items-center justify-start bg-swWhite px-3'>
                스터디룸B
              </SelectItem>
              <SelectItem value='공용공간A' className='flex h-12 items-center justify-start bg-swWhite px-3'>
                공용공간A
              </SelectItem>
              <SelectItem value='공용공간B' className='flex h-12 items-center justify-start bg-swWhite px-3'>
                공용공간B
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}

        <div className='flex aspect-card w-full items-center justify-center rounded-md bg-swGray text-2xl font-bold'>스터디룸 사진</div>
      </div>
    </div>
  )
}

export default StudyRoomReservePage
