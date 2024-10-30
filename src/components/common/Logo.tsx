import React, { ReactNode } from 'react'

import { cn } from '@/src/lib/utils/cn'

import { sen } from '../../../public/fonts/fonts'

interface LogoProps {
  text: string
  className?: string
  children?: ReactNode
}

const Logo = ({ text, className, children }: LogoProps): ReactNode => {
  return (
    <div className={cn('font-sen font-extrabold', sen.className, className)}>
      {text}
      {children}
    </div>
  )
}

export default Logo
