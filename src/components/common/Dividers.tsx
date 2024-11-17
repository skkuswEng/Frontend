import React, { ReactNode } from 'react'

import { cn } from '@/src/lib/utils/cn'

interface TextDividerProps {
  text?: string
}

export const TextDivider = ({ text }: TextDividerProps): ReactNode => {
  return (
    <div className='my-4 flex w-full items-center justify-center'>
      <div className='flex-grow border-t border-solid border-swGrayDark' />
      <span className='px-4 text-swGrayDark'>{text}</span>
      <div className='flex-grow border-t border-solid border-swGrayDark' />
    </div>
  )
}

interface DividerProps {
  className?: string
}

export const Divider = ({ className }: DividerProps): ReactNode => {
  return <div className={cn('w-full border-t border-solid bg-swGrayDark', className)} />
}
