import React, { ReactNode } from 'react'

import { cn } from '@/src/lib/utils/cn'

interface EyesProps {}

const Eyes = ({}: EyesProps): ReactNode => {
  return (
    <div className='flex items-center justify-center'>
      {/* Left Eye */}
      <Eye className='z-20' />
      {/* Right Eye */}
      <Eye className='z-10 -ml-8' />
    </div>
  )
}

export default Eyes

interface EyeProps {
  className?: string
}

const Eye = ({ className }: EyeProps) => {
  return (
    <div className={cn('relative flex h-80 w-56 items-center justify-center rounded-ellipse border-4 border-black bg-white', className)}>
      <div className='absolute bottom-16 right-7 aspect-square w-20 rounded-full bg-black' />
    </div>
  )
}
