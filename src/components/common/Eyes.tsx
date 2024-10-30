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
    <div className={cn('relative flex h-56 w-40 items-center justify-center rounded-ellipse border-4 border-black bg-white', className)}>
      <div className='absolute bottom-16 right-5 h-12 w-12 rounded-full bg-black' />
    </div>
  )
}
