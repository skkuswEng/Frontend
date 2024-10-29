import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

import { sen } from '../../../public/fonts/fonts'

interface LogoProps {
  textSize?:
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl'
    | 'text-5xl'
    | 'text-6xl'
    | 'text-7xl'
    | 'text-8xl'
    | 'text-9xl'
}

const Logo = ({ textSize = 'text-4xl' }: LogoProps): ReactNode => {
  return <div className={cn('font-sen font-extrabold', sen.className, textSize)}>SoKK</div>
}

export default Logo
