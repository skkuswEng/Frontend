import React, { ReactNode } from 'react'

import { colorSet, ColorType } from '@/src/lib/constants/colors'
import { cn } from '@/src/lib/utils/cn'

interface BackdropProps {
  className?: string
  color?: ColorType // 백드롭 색상
  opacity?: string // 투명도 지정 옵션
  children?: React.ReactNode
}

const Backdrop = ({ className, color = 'swBackDrop', children }: BackdropProps): ReactNode => {
  const colorValue = colorSet[color]
  return (
    <div
      className={cn('absolute inset-0 z-10 flex items-center justify-center text-xl font-semibold text-black', className)}
      style={{
        backgroundColor: colorValue,
      }}
    >
      {children}
    </div>
  )
}

export default Backdrop
