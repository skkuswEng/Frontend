import React, { ReactNode } from 'react'

import { cn } from '@/src/lib/utils/cn'

import LucideIcon from '../provider/LucideIcon'

interface LoadingProps {
  size?: number
  className?: string
}
const Loading = ({ size, className }: LoadingProps): ReactNode => {
  return <LucideIcon name='LoaderCircle' className={cn('animate-spin', className)} size={size || 16} />
}

export default Loading
