'use client'
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'

import { cn } from '../utils/cn'

/**
 *  드롭다운 열고 닫기 제어하는 커스텀 훅
 */
export function useDropdown(): {
  refs: React.RefObject<HTMLDivElement>[]
  isOpen: boolean
  toggleDropdown: () => void
} {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null) // 드롭다운 여는 버튼 ref
  const dropdownRef = useRef<HTMLDivElement>(null) // 드롭다운 전체 ref
  const toggleDropdown = () => setIsOpen(prev => !prev)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        dropdownRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside) // 정리
    }
  }, [])

  return { refs: [buttonRef, dropdownRef], isOpen, toggleDropdown }
}

/**
 * 드롭다운 적용할 Element에 적용할 Wrapper
 */
interface ToggleWrapperProps {
  ref?: React.Ref<HTMLDivElement> // ref를 HTMLDivElement로 명시
  isOpen: boolean // 드롭다운이 열렸는지 여부
  children: ReactNode
  style?: CSSProperties // Optional style prop
  className?: string
}

const ToggleWrapper = React.forwardRef<HTMLDivElement, ToggleWrapperProps>(({ children, className, isOpen, style }, ref) => {
  if (!isOpen) return null

  return (
    <div className={cn('absolute z-10', className)} style={style} ref={ref}>
      {children}
    </div>
  )
})

ToggleWrapper.displayName = 'ToggleWrapper'

export default ToggleWrapper
