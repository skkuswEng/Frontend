import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/src/lib/constants/route'
import { InstallLink } from '@/src/lib/utils/install-prompt'

import LogoImg from '../../../public/images/skku_logo.png'
import TextLogoImg from '../../../public/images/skku_textlogo.png'

interface FooterProps {}

const Footer = ({}: FooterProps): ReactNode => {
  return (
    <div className='relative flex w-screen flex-col items-start justify-start bg-swWhite px-8 py-4 lg:px-20'>
      <div className='flex w-full items-center justify-center lg:justify-start'>
        <Image alt='성균관대 로고' src={LogoImg} width={65} height={65} className='w-12' />
        <Image alt='성균관대 글귀' src={TextLogoImg} width={177} height={65} className='' />
      </div>
      <div className='relative flex w-full flex-col items-start justify-start text-xs'>
        <p className='w-full text-pretty text-center text-swGrayDark lg:text-left'>
          (16419) 경기도 수원시 장안구 서부로 2066 자연과학캠퍼스 산학협력센터 4층 85445호
        </p>
        <p className='w-full text-pretty text-center text-swGrayDark lg:text-left'>
          COPYRIGHT &copy; School of Software, Sungkyunkwan University(SKKU) All Rights Reserved
        </p>
      </div>
      <div className='mt-4 flex w-full items-center justify-center gap-6 text-sm lg:justify-start'>
        <InstallLink className='cursor-pointer font-medium'>앱 다운로드</InstallLink>
        <Link className='cursor-pointer font-medium' target='_blank' href={ROUTES.ETC.PERSONAL_INFO_RULES.url}>
          개인정보 처리방침
        </Link>
        <Link href={ROUTES.ETC.SERVICE_CENTER.url} target='_blank' className='cursor-pointer font-medium'>
          문의하기
        </Link>
        {/* 
        TODO: 개인정보 처리방침 및 문의하기 페이지 만들어서 Link 달기 
        <Link href={앱 다운로드 링크}>앱 다운로드</Link>
        <Link href={개인정보 처리 방침 링크}>개인정보 처리방침</Link>
        <Link href={문의하기}>문의하기</Link> 
        */}
      </div>
    </div>
  )
}
export default Footer
