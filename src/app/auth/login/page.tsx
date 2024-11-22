'use client'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useState } from 'react'

import Asterisk from '@/src/components/common/Asterisk'
import { Divider, TextDivider } from '@/src/components/common/Dividers'
import Logo from '@/src/components/common/Logo'
import LucideIcon from '@/src/components/provider/LucideIcon'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { ROUTES } from '@/src/lib/constants/route'
import useAuthStore from '@/src/lib/context/authContext'
import { LoginType } from '@/src/lib/HTTP/api/auth/api'
import { useMutationStore } from '@/src/lib/HTTP/api/tanstack-query'

interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps): ReactNode => {
  const router = useRouter()
  const { setAuthData } = useAuthStore()

  // States
  const [studentId, setStudentId] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [showPassword, setShowPassword] = useState<boolean>(false)

  // Functions
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, id: 'studentId' | 'password'): void => {
    if (id === 'studentId') {
      setStudentId(event.target.value)
      return
    }
    if (id === 'password') {
      setPassword(event.target.value)
      return
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  // Mutations
  const { mutate: LoginMutate, isPending } = useMutationStore<LoginType>(['login'])

  // TODO: 로그인 기능 넣기
  const loginHandler = () => {
    if (studentId && password)
      LoginMutate(
        { student_id: studentId, password: password },
        {
          onSuccess(data, variables, context) {
            if (data.content?.student_id && data.content?.name) {
              const { student_id, name } = data.content
              setAuthData(student_id, name)
              router.push(ROUTES.MAIN.url)
            } else {
              console.error('Content is missing required fields:', data.content)
            }
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

      {/* 입력폼 */}
      <div className='relative flex h-full w-[90%] flex-col items-center justify-center gap-5'>
        <TextDivider text='로그인' />
        <div className='flex w-full flex-col items-start justify-start gap-2'>
          <Label htmlFor='StudentId' className='font-bold text-swBlack'>
            아이디(학번)
          </Label>
          <Input
            type='text'
            id='StudentId'
            placeholder='학번을 입력해주세요'
            onChange={e => inputChangeHandler(e, 'studentId')}
            className='h-12 w-full rounded-md border border-solid border-swBlack'
          />
        </div>
        <div className='flex w-full flex-col items-start justify-start gap-2'>
          <Label htmlFor='StudentId' className='font-bold text-swBlack'>
            비밀번호
          </Label>
          <div className='relative h-12 w-full rounded-md border border-solid border-swBlack'>
            <Input
              type={!showPassword ? 'password' : 'text'}
              id='StudentId'
              placeholder='비밀번호를 입력해주세요'
              onChange={e => inputChangeHandler(e, 'password')}
              className='h-full w-full border-none'
            />
            <LucideIcon
              name={!showPassword ? 'EyeOff' : 'Eye'}
              onClick={toggleShowPassword}
              className='absolute right-4 top-0 h-full opacity-40'
              size={24}
            />
          </div>
        </div>
        <Button variant='swBlack' className='mb-4 mt-10 w-full' onClick={loginHandler}>
          로그인
        </Button>

        <Divider />
        <p className='mt-4 cursor-pointer text-swGrayDark hover:text-swBlack'>계정이 없으신가요?</p>

        <Button variant='swLightGreen' className='w-full' onClick={() => router.push(ROUTES.AUTH.REGISTER.url)}>
          회원가입
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
