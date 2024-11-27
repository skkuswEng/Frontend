'use client'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

import LucideIcon from '@/src/components/provider/LucideIcon'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Switch } from '@/src/components/ui/switch'
import { ClientModalData } from '@/src/lib/constants/modal_data'
import { ROUTES } from '@/src/lib/constants/route'
import useAuthStore from '@/src/lib/context/authContext'
import useRoomStateStore, { Companion, INIT_COMPANION } from '@/src/lib/context/roomContext'
import useModal from '@/src/lib/hooks/useModal'
import { toast } from '@/src/lib/hooks/useToast'
import { RoomReserveType } from '@/src/lib/HTTP/api/room/api'
import { useMutationStore } from '@/src/lib/HTTP/api/tanstack-query'
import { cn } from '@/src/lib/utils/cn'

interface StudyRoomReservePage2Props {}

const ROOM_WARNINGS = [
  '이용 시간을 필히 준수해주세요!',
  '핸드폰은 무음, 전화통화는 라운지 외부에서 부탁드립니다',
  '다음 이용자를 위해 깔끔하게 정리해주세요',
]
const PERSONAL_INFO_WARNING =
  '동반이용자의 개인정보 (학번/이름)를 동의없이 사용하여 예약 진행시, 당신은 개인정보 보호법 제 71조에 의거하여 개인정보 도용에 대한 처벌에 동의함 (비동의시 예약 불가)'

const StudyRoomReservePage2 = ({}: StudyRoomReservePage2Props): ReactNode => {
  const router = useRouter()
  const { studentId, name } = useAuthStore()
  const { room_number, date, time, leader, setLeader, companionList, setCompanion } = useRoomStateStore()
  const { modalData, Modal, openModal } = useModal()

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
  // State
  const [confirmWarning, setConfirmWarning] = useState<boolean>(false)
  const [isDone, setIsDone] = useState<boolean>(false)

  useEffect(() => {
    // TODO: 입력된 동반 이용자 정보가 companionCnt만큼 있는지 확인 조건 추가
    if (confirmWarning) {
      setIsDone(true)
    } else if (isDone) {
      setIsDone(false)
    }
  }, [confirmWarning])

  // Functions
  const decreaseCompanion = () => {
    const companionCnt = companionList.length
    // 1개는 최소 있어야 함
    if (companionCnt !== 1) {
      setCompanion(companionList?.slice(0, companionCnt - 1))
    } else {
      toast({ title: '혼자서는 이용할 수 없습니다' })
    }
  }
  const increaseCompanion = () => {
    const companionCnt = companionList.length
    // 최대 5개까지 가능
    if (companionCnt < 5) {
      setCompanion([...companionList, INIT_COMPANION])
    } else {
      toast({ title: '최대 6명이 이용가능합니다' })
    }
  }
  const deleteCompanion = (index: number) => {
    const companionCnt = companionList.length

    if (companionCnt !== 1) {
      const new_companionList = companionList.filter((companionList, idx) => idx !== index)
      setCompanion(new_companionList)
    } else {
      toast({ title: '혼자서는 이용할 수 없습니다' })
    }
  }

  const onChangeCompanion = (index: number, id: string, val: string) => {
    // index에 해당하는 companion의 id 값을 val로 바꾼다
    const new_companionList = companionList.map((companion, idx) => (idx === index ? { ...companion, [id]: val } : companion))
    setCompanion(new_companionList)
  }

  const onChangeConfirmWarning = () => setConfirmWarning(prev => !prev)

  const { mutate: ReserveMutate, isPending: isReserving } = useMutationStore<RoomReserveType>(['room_reserve'])
  const submitHandler = () => {
    openModal(ClientModalData.ROOM.RESERVE.ATTEMPT)
  }

  const confirmHandler = () => {
    switch (modalData) {
      case ClientModalData.ROOM.RESERVE.AUTH_REQUIRED:
        router.push(ROUTES.AUTH.LOGIN.url)
        break
      case ClientModalData.ROOM.RESERVE.ATTEMPT:
        if (studentId && room_number && date)
          ReserveMutate(
            {
              studentId,
              room_number,
              date,
              time,
              companion: companionList,
            },
            {
              onSuccess(data, variables, context) {
                toast({ title: '예약이 완료되었습니다', variant: 'success' })
                router.push(ROUTES.MAIN.url)
              },
            },
          )

        break
    }
  }
  return (
    <div className='relative mt-24 grid w-[90%] max-w-[1800px] flex-grow grid-cols-1 place-items-center gap-8 py-6 md:grid-cols-2 lg:mt-0'>
      {/* 왼쪽 */}
      <div className='relative flex h-full w-full flex-col items-start justify-start gap-8 xl:w-4/5'>
        <div className='flex items-center justify-start gap-4'>
          <LucideIcon name='UserRound' size={26} />
          <p className='text-xl font-bold'>스터리룸 이용자 대표*</p>
        </div>

        {leader && <NameTag isInfo={true} companion={leader as Companion} className='w-full xl:w-3/5' />}

        <div className='relative flex w-full items-center justify-start gap-4 xl:w-[70%]'>
          <LucideIcon name='UserRound' size={26} />
          <p className='text-xl font-bold'>동반 이용자</p>
          <span className='text-xs'>(1명 이상,5명 이하)</span>

          <div className='absolute right-0 flex items-center justify-evenly gap-2'>
            <LucideIcon name='CircleMinus' size={24} className='cursor-pointer' onClick={decreaseCompanion} />
            <span>{companionList?.length}</span>
            <LucideIcon name='CirclePlus' size={24} className='cursor-pointer' onClick={increaseCompanion} />
          </div>
        </div>
        <div className='relative flex w-full flex-col items-center justify-start gap-3 xl:w-[70%]'>
          {companionList.map((companion, index) => (
            <NameTag
              key={index}
              index={index}
              isInfo={false}
              companion={companion}
              onChangeCompanion={onChangeCompanion}
              deleteCompanion={deleteCompanion}
              className='w-full'
            />
          ))}
        </div>
      </div>
      {/* 오른쪽 */}
      <div className='flex h-full w-full flex-col items-start justify-start gap-3 md:w-4/5'>
        <div className='flex items-center justify-start gap-3 text-swRed'>
          <LucideIcon name='Hash' size={24} />
          <span className='text-lg font-bold'>공간 이용 시 주의사항</span>
        </div>
        <div className='relative flex w-full flex-col items-center justify-start gap-2'>
          {ROOM_WARNINGS.map(warning => (
            <p
              key={warning}
              className='w-full rounded-lg border border-solid border-swGray bg-swGrayLight py-3 text-center text-sm font-medium lg:text-base'
            >
              {warning}
            </p>
          ))}
        </div>

        <div className='mt-5 flex items-center justify-start gap-3 text-swRed'>
          <LucideIcon name='Hash' size={24} />
          <span className='text-lg font-bold'>동반이용자 개인정보 사용 동의</span>
        </div>
        <div className='flex w-full flex-col items-end justify-start gap-4 rounded-lg border border-solid border-swGray bg-swGray px-5 py-6'>
          <p className='text-pretty text-sm font-medium xl:text-base'>{PERSONAL_INFO_WARNING}</p>
          <div className='flex items-center justify-start gap-2'>
            <Switch checked={confirmWarning} onCheckedChange={onChangeConfirmWarning} />
            <p className={cn('font-medium', confirmWarning ? 'text-swBlack' : 'text-swRed')}>{confirmWarning ? '동의' : '미동의'}</p>
          </div>
        </div>

        <Button variant={isDone ? 'swBlack' : 'swBlackDisabled'} className='mt-5 w-full' disabled={!isDone} onClick={submitHandler}>
          예약하기
        </Button>
      </div>
      <Modal onConfirm={confirmHandler} />
    </div>
  )
}

export default StudyRoomReservePage2

interface NameTagProps {
  isInfo: boolean
  index?: number
  companion: Companion
  onChangeCompanion?: (index: number, id: string, val: string) => void
  deleteCompanion?: (index: number) => void
  className?: string
}

const NameTag = ({ isInfo, index, companion, onChangeCompanion, deleteCompanion, className }: NameTagProps) => {
  const changeName = (val: string) => {
    if (onChangeCompanion && index !== undefined) {
      onChangeCompanion(index, 'name', val)
    }
  }
  const changeStudentId = (val: string) => {
    if (onChangeCompanion && index !== undefined) {
      onChangeCompanion(index, 'studentId', val)
    }
  }
  const deleteHandler = () => {
    if (deleteCompanion && index !== undefined) {
      deleteCompanion(index)
    }
  }
  return (
    <div className={cn('grid gap-y-2 rounded-lg bg-swGrayLight px-3 py-2', !isInfo ? 'grid-cols-[6fr_1fr]' : 'grid-cols-1', className)}>
      <div className='flex h-full w-full items-center justify-start gap-3'>
        <span className='w-24 text-center text-sm font-semibold'>이름</span>
        {isInfo ? (
          <span className='flex-grow rounded-md border border-solid border-swGrayDark bg-swWhite px-3 py-2 text-sm'>
            {companion.name || '이름 없음'}
          </span>
        ) : (
          <Input
            type='text'
            placeholder='이름을 입력해주세요'
            disabled={isInfo}
            onChange={e => changeName(e.target.value)}
            className='flex-grow rounded-md border border-solid border-swGrayDark bg-swWhite'
          />
        )}
      </div>
      {!isInfo && (
        <Button
          variant='swRedDisabled'
          onClick={deleteHandler}
          className='row-span-2 ml-2 h-full border-none px-0 writing-mode-vertical text-orientation-upright hover:bg-swRed'
        >
          삭제
        </Button>
      )}
      <div className='flex h-full w-full items-center justify-start gap-3'>
        <span className='w-24 text-center text-sm font-semibold'>학번</span>
        {isInfo ? (
          <span className='flex-grow rounded-md border border-solid border-swGrayDark bg-swWhite px-3 py-2 text-sm'>
            {companion.studentId || '학번 없음'}
          </span>
        ) : (
          <Input
            type='text'
            placeholder='학번을 입력해주세요'
            disabled={isInfo}
            onChange={e => changeStudentId(e.target.value)}
            className='flex-grow rounded-md border border-solid border-swGrayDark bg-swWhite'
          />
        )}
      </div>
    </div>
  )
}
