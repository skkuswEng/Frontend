import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import { ClientModalData } from '@/src/lib/constants/modal_data'
import useModal from '@/src/lib/hooks/useModal'
import { RegisterType } from '@/src/lib/HTTP/api/auth/api'
import { useMutationStore } from '@/src/lib/HTTP/api/tanstack-query'
import { NullableObject } from '@/src/lib/utils/typeUtils'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'

interface RegisterCheckProps {}
const RegisterCheck = ({}: RegisterCheckProps): ReactNode => {
  const router = useRouter()
  const { isOpen, modalData, Modal, openModal } = useModal()

  // Constants
  const INIT_INFO: NullableObject<RegisterType> = { student_name: null, student_id: null, password: null, email: null }

  // States
  const [userInfo, setUserInfo] = useState(INIT_INFO)
  const [isDone, setIsDone] = useState<boolean>(false)

  // Functions
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, id: keyof typeof INIT_INFO): void => {
    setUserInfo(prev => ({
      ...prev,
      [id]: event.target.value,
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
  const { mutate: RegisterMutate, isPending: isRegistering } = useMutationStore<RegisterType>(['register'])

  const registerHandler = () => {
    // #1. Check if data is missing
    for (const [key, val] of Object.entries(userInfo)) {
      // Missing Input
      if (val === null || val === '') {
        openModal(ClientModalData.AUTH.REGISTER.NO_INPUT(key))
        return
      }
      // Check Each input
      else if (key === 'student_name') {
        const invalidCharRegex = /[0-9!@#$%^&*(),.?":{}|<>]/
        if (invalidCharRegex.test(val)) {
          openModal(ClientModalData.AUTH.REGISTER.INVALID_STUDENT_NAME)
          return
        }
      } else if (key === 'student_id') {
        const studentIdRegex = /^\d{10}$/
        if (!studentIdRegex.test(val)) {
          openModal(ClientModalData.AUTH.REGISTER.INVALID_STUDENT_ID)
          return
        }
      } else if (key === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(val)) {
          openModal(ClientModalData.AUTH.REGISTER.INVALID_EMAIL)
          return
        }
      } else if (key === 'password') {
        const hasLetter = /[a-zA-Z]/.test(val) // 영문자 확인
        const hasNumber = /[0-9]/.test(val) // 숫자 확인
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val) // 특수문자 확인

        if (!(hasLetter && hasNumber && hasSpecialChar)) {
          openModal(ClientModalData.AUTH.REGISTER.INVALID_PASSWORD)
          return
        }
      }
    }
    // #2. Register
    RegisterMutate(userInfo as RegisterType, {
      // Save User Data
      onSuccess: (data, variables) => {
        console.log(data)
      },
    })
  }
  // const { mutate: UnregisterMutate, isPending: isUnregistering } = useMutationStore<UnregisterType>(['unregister'])

  // const unregisterHandler = () => {
  //   console.log('executed')

  //   UnregisterMutate(
  //     {
  //       student_id: '2019311945',
  //       password: 'swe1234!',
  //     },
  //     {
  //       onSuccess(data, variables, context) {
  //         console.log(data)
  //       },
  //     },
  //   )
  // }

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
          onChange={e => inputChangeHandler(e, 'student_name')}
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
          onChange={e => inputChangeHandler(e, 'student_id')}
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
      <Modal onConfirm={() => {}} />
    </>
  )
}

export default RegisterCheck
