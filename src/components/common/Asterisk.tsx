import React, { ReactNode } from 'react'

import { cn } from '@/src/lib/utils/cn'

import LucideIcon from './LucideIcon'

interface AsteriskProps {
  className?: string
}

const Asterisk = ({ className }: AsteriskProps): ReactNode => {
  return (
    <div className={cn('flex aspect-square items-center justify-center rounded-full', className)}>
      <LucideIcon name='Asterisk' size={40} strokeWidth={4} />
    </div>
  )
}

export default Asterisk
