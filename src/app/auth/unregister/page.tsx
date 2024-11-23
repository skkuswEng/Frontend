'use client'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

import Asterisk from '@/src/components/common/Asterisk'
import { TextDivider } from '@/src/components/common/Dividers'
import Logo from '@/src/components/common/Logo'
import LucideIcon from '@/src/components/provider/LucideIcon'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Switch } from '@/src/components/ui/switch'
import { ROUTES } from '@/src/lib/constants/route'
import useAuthStore from '@/src/lib/context/authContext'
import { toast } from '@/src/lib/hooks/useToast'
import { UnregisterType } from '@/src/lib/HTTP/api/auth/api'
import { useMutationStore } from '@/src/lib/HTTP/api/tanstack-query'
import { cn } from '@/src/lib/utils/cn'

interface UnregisterProps {}

const UNREGISTER_WARNINGS = [
  '회원탈퇴를 되돌릴 수 없습니다',
  '회원이 포함된 스터디룸 예약이 모두 취소됩니다',
  '사용하고 있는 자리는 자동반납됩니다',
]
const PERSONAL_INFO_WARNING =
  '회원탈퇴 진행 시, SoKK에서의 회원님과 관련된 모든 데이터가 삭제되며, 해당 데이터는 복구할 수 없습니다. 이에 동의하십니까? (미동의시 회원탈퇴 불가)'

const Unregister = ({}: UnregisterProps): ReactNode => {
  const router = useRouter()

  const [password, setPassword] = useState<string>()
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const [isDone, setIsDone] = useState<boolean>(false)
  const { name, studentId, clearAuthData } = useAuthStore()

  useEffect(() => {
    if (password && password?.length !== 0 && isChecked) {
      setIsDone(true)
    } else if (isDone) {
      setIsDone(false)
    }
  }, [password, isChecked])

  const { mutate: UnregisterMutate, isPending: isUnregistering } = useMutationStore<UnregisterType>(['unregister'])

  const unregisterHandler = () => {
    if (!isDone) {
      toast({ title: '비밀번호 및 동의서를 확인해주세요' })
      return
    }
    if (!name || !studentId) {
      toast({ title: '로그인 해주세요' })
      return
    }
    UnregisterMutate(
      {
        student_id: studentId,
        password: password as string,
      },
      {
        onSuccess(data, variables, context) {
          clearAuthData()
          toast({ title: '회원탈퇴 성공' })
          router.push(ROUTES.MAIN.url)
        },
      },
    )
  }

  return (
    <div className='relative mt-24 grid w-[90%] max-w-[1800px] flex-grow grid-cols-1 place-items-center py-6 lg:mt-0 lg:grid-cols-2'>
      {/* Logo */}
      <div className='relative flex w-[90%] flex-col items-start justify-center gap-4 lg:w-full lg:items-center'>
        <Asterisk className='hidden w-20 self-end bg-[#DDFEC0] sm:w-24 lg:flex lg:w-28' />

        <div className='relative flex h-max w-auto flex-col items-center justify-center'>
          <Logo text='SoKK' className='text-8xl' />
          <p className='w-full text-start text-2xl font-bold'>AI가 관리하는</p>
          <p className='w-full text-start text-2xl font-bold'>스마트한 라운지 생활</p>
        </div>
        <Asterisk className='hidden w-20 self-start bg-swWhite sm:w-24 lg:flex lg:w-28' />
      </div>

      {/* 회원탈퇴 동의 */}
      <div className='relative flex h-full w-[90%] flex-col items-center justify-center gap-5'>
        <TextDivider text='회원탈퇴' />

        <div className='flex w-full flex-col items-start justify-start gap-2 md:w-4/5'>
          <Label className='font-bold text-swBlack'>비밀번호</Label>
          <Input
            type='text'
            id='password'
            placeholder='비밀번호를 입력해주세요'
            onChange={e => setPassword(e.target.value)}
            className='h-12 w-full rounded-md border border-solid border-swBlack'
          />
        </div>

        <div className='flex h-full w-full flex-col items-start justify-start gap-3 md:w-4/5'>
          <div className='flex w-full items-center justify-start gap-3 text-swRed'>
            <LucideIcon name='Hash' size={24} />
            <span className='text-lg font-bold'>회원탈퇴 이용 시 주의사항</span>
          </div>
          <div className='relative flex w-full flex-col items-center justify-start gap-2'>
            {UNREGISTER_WARNINGS.map(warning => (
              <p
                key={warning}
                className='w-full rounded-lg border border-solid border-swGray bg-swGrayLight py-3 text-center text-sm font-medium lg:text-base'
              >
                {warning}
              </p>
            ))}
          </div>

          <div className='mt-5 flex w-full items-center justify-start gap-3 text-swRed'>
            <LucideIcon name='Hash' size={24} />
            <span className='text-lg font-bold'>회원탈퇴 동의</span>
          </div>
          <div className='flex w-full flex-col items-end justify-start gap-4 rounded-lg border border-solid border-swGray bg-swGray px-5 py-6'>
            <p className='text-pretty text-sm font-medium xl:text-base'>{PERSONAL_INFO_WARNING}</p>
            <div className='flex items-center justify-start gap-2'>
              <Switch checked={isChecked} onCheckedChange={() => setIsChecked(prev => !prev)} />
              <p className={cn('font-semibold', isChecked ? 'text-swBlack' : 'text-swRed')}>{isChecked ? '동의' : '미동의'}</p>
            </div>
          </div>

          <Button onClick={unregisterHandler} variant={isDone ? 'swRed' : 'swRedDisabled'} className='mt-5 w-full'>
            회원탈퇴
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Unregister
