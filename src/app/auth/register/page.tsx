'use client'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

import Asterisk from '@/src/components/common/Asterisk'
import { TextDivider } from '@/src/components/common/Dividers'
import Logo from '@/src/components/common/Logo'
import LucideIcon from '@/src/components/provider/LucideIcon'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { UnregisterType } from '@/src/lib/HTTP/api/auth/api'
import { useMutationStore } from '@/src/lib/HTTP/api/tanstack-query'

interface RegisterPageProps {}

const RegisterPage = ({}: RegisterPageProps): ReactNode => {
  const router = useRouter()

  // States
  const [step, setStep] = useState<number>(1)

  // Functions
  const stepHandler = () => {
    setStep(prev => prev + 1)
  }

  let contents
  switch (step) {
    case 1:
      contents = <ServicePolicyCheck stepHandler={stepHandler} />
      break
    case 2:
      contents = <RegisterCheck />
      break
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

      {/* 회원가입폼 */}
      <div className='relative flex h-full w-[90%] flex-col items-start justify-center gap-5'>
        <TextDivider text='회원가입' />
        {contents}
      </div>
    </div>
  )
}

export default RegisterPage

interface ServicePolicyCheckProps {
  stepHandler: () => void
}
const ServicePolicyCheck = ({ stepHandler }: ServicePolicyCheckProps): ReactNode => {
  const router = useRouter()
  // constants
  // TODO: 각 이용약관 내용 정리한 노션으로 링크
  const SERVICE_POLICIES = [
    {
      pid: '1',
      name: '(필수) 이용약관 동의',
      href: '미정',
    },
    {
      pid: '2',
      name: '(필수) 개인정보 수집 및 이용 동의',
      href: '미정',
    },
    {
      pid: '3',
      name: '(필수) 위치정보 수집 및 이용 동의',
      href: '미정',
    },
  ]

  let INIT_CHECK_SERVICE_POLICIES: { [key: string]: boolean } = {}
  SERVICE_POLICIES.forEach(item => {
    INIT_CHECK_SERVICE_POLICIES[item.pid] = false
  })
  const [checkServicePolicy, setCheckServicePolicy] = useState(INIT_CHECK_SERVICE_POLICIES)
  const [isDone, setIsDone] = useState<boolean>(false)
  const serviceCheckHandler = (id: string) => {
    setCheckServicePolicy(prev => ({
      ...prev,
      [id]: !prev[id], // 이전 값의 반대로 설정
    }))
  }

  useEffect(() => {
    if (!Object.values(checkServicePolicy).includes(false)) {
      setIsDone(true)
    } else if (isDone) {
      setIsDone(false)
    }
  }, [checkServicePolicy])

  return (
    <>
      <p className='text-sm text-swRed'>* 회원가입에 앞서 아래 약관에 대한 동의가 필요합니다.</p>

      {SERVICE_POLICIES.map(policy => {
        return (
          <div key={policy.pid} className='relative flex w-full cursor-pointer items-center justify-start gap-2'>
            <Checkbox id={policy.pid} className='h-4 w-4' onClick={() => serviceCheckHandler(policy.pid)} />
            <label htmlFor={policy.pid} className='font-medium'>
              {policy.name}
            </label>
            <LucideIcon name='ChevronRight' className='absolute right-0' onClick={() => router.push(policy.href)} />
          </div>
        )
      })}

      <Button variant={isDone ? 'swBlack' : 'swBlackDisabled'} className='mt-5 w-full' disabled={!isDone} onClick={stepHandler}>
        다음단계
      </Button>
    </>
  )
}

interface RegisterCheckProps {}
const RegisterCheck = ({}: RegisterCheckProps): ReactNode => {
  const router = useRouter()

  // Constants
  const INIT_INFO = { name: null, studentId: null, password: null, email: null }

  // States
  const [userInfo, setUserInfo] = useState<{ [key: string]: string | null }>(INIT_INFO)
  const [isDone, setIsDone] = useState<boolean>(false)

  // Functions
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, id: keyof typeof INIT_INFO): void => {
    const val = event.target.value

    setUserInfo(prev => ({
      ...prev,
      [id]: val,
    }))
  }

  useEffect(() => {
    if (!Object.values(userInfo).includes(null)) {
      setIsDone(true)
    } else if (isDone) {
      setIsDone(false)
    }
  }, [userInfo])

  // Mutations
  // const { mutate: RegisterMutate, isPending } = useMutationStore<RegisterType>(['register'])

  // const registerHandler = () => {
  //   console.log('executed')

  //   RegisterMutate(
  //     {
  //       student_id: '2019311945',
  //       password: 'swe1234!',
  //       student_name: '김지호',
  //       email: 'swe@naver.com',
  //     },
  //     {
  //       onSuccess: () => {
  //         console.log('Success!')
  //       },
  //     },
  //   )
  // }
  const { mutate: UnregisterMutate, isPending } = useMutationStore<UnregisterType>(['unregister'])

  const registerHandler = () => {
    console.log('executed')

    UnregisterMutate(
      {
        student_id: '2019311945',
        password: 'swe1234!',
      },
      {
        onSuccess(data, variables, context) {
          console.log(data)
        },
      },
    )
  }

  return (
    <>
      <div className='flex w-full flex-col items-start justify-start gap-2'>
        <Label htmlFor='name' className='font-bold text-swBlack'>
          이름(실명)
        </Label>
        <Input
          type='text'
          id='name'
          placeholder='이름을 입력해주세요'
          onChange={e => inputChangeHandler(e, 'name')}
          className='h-12 w-full rounded-md border border-solid border-swBlack'
        />
      </div>
      <div className='flex w-full flex-col items-start justify-start gap-2'>
        <Label htmlFor='studentId' className='font-bold text-swBlack'>
          아이디(학번)
        </Label>
        <Input
          type='text'
          id='studentId'
          placeholder='학번을 입력해주세요'
          onChange={e => inputChangeHandler(e, 'studentId')}
          className='h-12 w-full rounded-md border border-solid border-swBlack'
        />
      </div>

      <p className='text-sBlack mt-4 w-full text-center text-sm'>
        안전한 비밀번호를 위해
        <br />
        영문자, 숫자, 특수문자를 포함해야 합니다
      </p>

      <div className='flex w-full flex-col items-start justify-start gap-2'>
        <Label htmlFor='password' className='font-bold text-swBlack'>
          비밀번호
        </Label>
        <Input
          type='text'
          id='password'
          placeholder='비밀번호를 입력해주세요'
          onChange={e => inputChangeHandler(e, 'password')}
          className='h-12 w-full rounded-md border border-solid border-swBlack'
        />
      </div>

      <div className='flex w-full flex-col items-start justify-start gap-2'>
        <Label htmlFor='email' className='font-bold text-swBlack'>
          이메일 (학교 이메일)
        </Label>
        <Input
          type='text'
          id='email'
          placeholder='이메일을 입력해주세요'
          onChange={e => inputChangeHandler(e, 'email')}
          className='h-12 w-full rounded-md border border-solid border-swBlack'
        />
      </div>

      <Button onClick={registerHandler} variant={isDone ? 'swBlack' : 'swBlackDisabled'} disabled={!isDone} className='w-full'>
        가입하기
      </Button>
    </>
  )
}
