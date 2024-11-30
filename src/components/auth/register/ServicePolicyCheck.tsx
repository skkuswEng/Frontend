import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import { ROUTES } from '@/src/lib/constants/route'

import LucideIcon from '../../provider/LucideIcon'
import { Button } from '../../ui/button'
import { Checkbox } from '../../ui/checkbox'

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
      href: ROUTES.ETC.PERSONAL_INFO_RULES,
    },
    {
      pid: '2',
      name: '(필수) 개인정보 수집 및 이용 동의',
      href: ROUTES.ETC.PERSONAL_INFO_RULES,
    },
    {
      pid: '3',
      name: '(필수) 위치정보 수집 및 이용 동의',
      href: ROUTES.ETC.PERSONAL_INFO_RULES,
    },
  ]

  let INIT_CHECK_SERVICE_POLICIES: { [key: string]: boolean } = {}
  SERVICE_POLICIES.forEach(item => {
    INIT_CHECK_SERVICE_POLICIES[item.pid] = false
  })
  const [checkAllPolicy, setCheckAllPolicy] = useState(false)
  const [checkServicePolicy, setCheckServicePolicy] = useState(INIT_CHECK_SERVICE_POLICIES)
  const [isDone, setIsDone] = useState<boolean>(false)
  const serviceCheckHandler = (id: string) => {
    setCheckServicePolicy(prev => ({
      ...prev,
      [id]: !prev[id], // 이전 값의 반대로 설정
    }))
  }
  const allCheckHandler = () => {
    setCheckAllPolicy(prev => !prev)
  }

  useEffect(() => {
    if (!Object.values(checkServicePolicy).includes(false)) {
      setIsDone(true)
    } else if (isDone) {
      setIsDone(false)
    }
  }, [checkServicePolicy])

  useEffect(() => {
    const updatedPolicies = Object.keys(checkServicePolicy).reduce(
      (acc, key) => {
        acc[key] = checkAllPolicy ? true : false // 모든 값을 true로 설정
        return acc
      },
      {} as { [key: string]: boolean },
    )
    setCheckServicePolicy(updatedPolicies)
  }, [checkAllPolicy])

  return (
    <>
      <p className='text-sm text-swRed'>* 회원가입에 앞서 아래 약관에 대한 동의가 필요합니다.</p>
      <div className='relative flex w-full cursor-pointer items-center justify-start gap-2'>
        <Checkbox className='h-4 w-4' onClick={allCheckHandler} checked={checkAllPolicy} />
        <label className='font-medium'>모두 동의</label>
      </div>
      {SERVICE_POLICIES.map(policy => {
        return (
          <div key={policy.pid} className='relative flex w-full cursor-pointer items-center justify-start gap-2'>
            <Checkbox
              id={policy.pid}
              className='h-4 w-4'
              onClick={() => serviceCheckHandler(policy.pid)}
              checked={checkServicePolicy[policy.pid]}
            />
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

export default ServicePolicyCheck
