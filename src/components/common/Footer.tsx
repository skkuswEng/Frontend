import Image from 'next/image'
import React, { ReactNode } from 'react'

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
      <div className='relative flex w-full flex-col items-start justify-start text-sm'>
        <p className='w-full text-pretty text-center text-swGrayDark lg:text-left'>
          (16419) 경기도 수원시 장안구 서부로 2066 자연과학캠퍼스 산학협력센터 4층 85445호
        </p>
        <p className='w-full text-pretty text-center text-swGrayDark lg:text-left'>
          COPYRIGHT &copy; School of Software, Sungkyunkwan University(SKKU) All Rights Reserved
        </p>
      </div>
      <div className='mt-4 flex w-full items-center justify-center gap-6 lg:justify-start'>
        <InstallLink className='cursor-pointer font-semibold'>앱 다운로드</InstallLink>
        <span className='cursor-pointer font-semibold'>개인정보 처리방침</span>
        <span className='cursor-pointer font-semibold'>문의하기</span>
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
