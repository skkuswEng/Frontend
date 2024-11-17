'use client'
import React, { ReactNode, useState } from 'react'

import LucideIcon from '@/src/components/provider/LucideIcon'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { cn } from '@/src/lib/utils/cn'

interface StudyRoomReservePage2Props {}

const StudyRoomReservePage2 = ({}: StudyRoomReservePage2Props): ReactNode => {
  const [companionCnt, setCompanionCnt] = useState<number>(1)

  // Functions
  const decreaseCompanion = () => setCompanionCnt(prev => Math.max(1, prev - 1))
  const increaseCompanion = () => setCompanionCnt(prev => Math.min(5, prev + 1))
  return (
    <div className='relative mt-24 grid w-[90%] max-w-[1800px] flex-grow grid-cols-1 place-items-center gap-8 py-6 lg:mt-0 lg:grid-cols-2'>
      {/* 왼쪽 */}
      <div className='relative flex h-full w-4/5 flex-col items-start justify-start gap-8'>
        <div className='flex items-center justify-start gap-4'>
          <LucideIcon name='UserRound' size={26} />
          <p className='text-xl font-bold'>스터리룸 이용자 대표*</p>
        </div>

        {/* TODO: 로그인한 유저의 정보로 변경 */}
        <NameTag isInfo={true} studentId='2019311945' className='w-3/5' />

        <div className='relative flex w-[70%] items-center justify-start gap-4'>
          <LucideIcon name='UserRound' size={26} />
          <p className='text-xl font-bold'>동반 이용자</p>
          <span className='text-xs'>(1명 이상,5명 이하)</span>

          <div className='absolute right-0 flex items-center justify-evenly gap-2'>
            <LucideIcon name='CircleMinus' size={24} className='cursor-pointer' onClick={decreaseCompanion} />
            <span>{companionCnt}</span>
            <LucideIcon name='CirclePlus' size={24} className='cursor-pointer' onClick={increaseCompanion} />
          </div>
        </div>
        <div className='relative flex w-[70%] flex-col items-center justify-start gap-3'>
          {Array.from(Array(companionCnt), (_, index) => (
            <NameTag key={index} isInfo={false} studentId={`동반자 ${index + 1}`} className='w-full' />
          ))}
        </div>
      </div>
      {/* 오른쪽 */}
      <div className='flex h-full w-4/5 flex-col items-start justify-start gap-3'></div>
    </div>
  )
}

export default StudyRoomReservePage2

interface NameTagProps {
  isInfo: boolean
  studentId?: string
  className?: string
}

const NameTag = ({ isInfo, studentId, className }: NameTagProps) => {
  return (
    <div className={cn('grid gap-y-2 rounded-md bg-swGrayLight px-3 py-2', !isInfo ? 'grid-cols-[6fr_1fr]' : 'grid-cols-1', className)}>
      <div className='flex h-full w-full items-center justify-start gap-3'>
        <span className='w-24 text-center text-sm font-semibold'>이름</span>
        <Input
          type='text'
          placeholder='이름을 입력해주세요'
          disabled={isInfo}
          className='flex-grow rounded-md border border-solid border-swGrayDark bg-swWhite'
        />
      </div>{' '}
      {!isInfo && (
        <Button variant='swRedDisabled' className='row-span-2 ml-2 h-full border-none px-0 writing-mode-vertical text-orientation-upright'>
          삭제
        </Button>
      )}
      <div className='flex h-full w-full items-center justify-start gap-3'>
        <span className='w-24 text-center text-sm font-semibold'>학번</span>
        <Input
          type='text'
          placeholder='학번을 입력해주세요'
          disabled={isInfo}
          className='flex-grow rounded-md border border-solid border-swGrayDark bg-swWhite'
        />
      </div>
    </div>
  )
}
