'use client'
import React, { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/src/components/common/Logo'

interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps): ReactNode => {
  return (
    <div className='relative flex w-screen flex-grow flex-col items-center justify-start'>
      {/* Logo */}
      <div className='relative mt-20 flex w-[90%] flex-col items-start justify-start'>
        <p className='text-2xl font-bold'>AI가 관리하는</p>
        <p className='text-2xl font-bold'>스마트한 라운지 생활</p>
        <Logo text='SoKK' className='text-8xl' />
      </div>

      {/* 입력폼 */}
      <div className='relative flex h-max w-[90%] flex-col items-start justify-center'>
        <Label htmlFor='StudentId' className='text-bold text-[#5B5B5B]'>
          학번 (아이디)
        </Label>
        <Input type='number' id='StudentId' placeholder='학번을 입력해주세요' className='h-12 w-full' />
        <Label htmlFor='StudentId' className='text-bold text-[#5B5B5B]'>
          비밀번호
        </Label>
        <Input type='number' id='StudentId' placeholder='비밀번호를 입력해주세요' className='h-12 w-full' />
        <Button variant='default' className='w-full'>
          로그인
        </Button>
      </div>
    </div>
  )
}

export default LoginPage