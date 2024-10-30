import React, { ReactNode } from 'react'

import { cn } from '@/src/lib/utils/cn'

import { sen } from '../../../public/fonts/fonts'

interface LogoProps {
  text: string
  className?: string
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
  children?: ReactNode
}

const Logo = ({ text, className, textSize = 'text-4xl', children }: LogoProps): ReactNode => {
  return (
    <div className={cn('font-sen font-extrabold', sen.className, textSize, className)}>
      {text}
      {children}
    </div>
  )
}

export default Logo
