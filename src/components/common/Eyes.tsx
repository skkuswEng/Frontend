import React, { ReactNode } from 'react'

import { cn } from '@/src/lib/utils/cn'

interface EyesProps {
  className?: string
}

const Eyes = ({ className }: EyesProps): ReactNode => {
  return (
    <div className='flex items-center justify-center'>
      {/* Left Eye */}
      <Eye className={cn('z-20', className)} />
      {/* Right Eye */}
      <Eye className={cn('z-10 -ml-8', className)} />
    </div>
  )
}

export default Eyes

interface EyeProps {
  className?: string
}

const Eye = ({ className }: EyeProps) => {
  return (
    <div className={cn('relative flex items-center justify-center rounded-ellipse border-4 border-black bg-white', className)}>
      <div className='absolute bottom-1/4 right-1/4 aspect-square w-1/3 rounded-full bg-black' />
    </div>
  )
}
