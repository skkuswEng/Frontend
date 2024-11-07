import React, { ReactNode } from 'react'

import { cn } from '@/src/lib/utils/cn'

import LucideIcon from '../provider/LucideIcon'

interface AsteriskProps {
  className?: string
}

const Asterisk = ({ className }: AsteriskProps): ReactNode => {
  return (
    <div className={cn('flex aspect-square items-center justify-center rounded-full', className)}>
      <MobileAsterisk className='block sm:hidden' />
      <TabletAsterisk className='hidden sm:block lg:hidden' />
      <DesktopAsterisk className='hidden lg:block' />
    </div>
  )
}

export default Asterisk

// Desktop 전용 Asterisk
const DesktopAsterisk = ({ className }: { className?: string }) => (
  <LucideIcon name='Asterisk' className={className} size={40} strokeWidth={4} />
)

// Tablet 전용 Asterisk
const TabletAsterisk = ({ className }: { className?: string }) => (
  <LucideIcon name='Asterisk' className={className} size={30} strokeWidth={4} />
)

// Mobile 전용 Asterisk
const MobileAsterisk = ({ className }: { className?: string }) => (
  <LucideIcon name='Asterisk' className={className} size={30} strokeWidth={4} />
)
