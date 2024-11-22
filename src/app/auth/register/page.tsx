'use client'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useState } from 'react'

import RegisterCheck from '@/src/components/auth/register/RegisterCheck'
import ServicePolicyCheck from '@/src/components/auth/register/ServicePolicyCheck'
import Asterisk from '@/src/components/common/Asterisk'
import { TextDivider } from '@/src/components/common/Dividers'
import Logo from '@/src/components/common/Logo'

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
