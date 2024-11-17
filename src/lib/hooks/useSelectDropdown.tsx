'use client'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'

import LucideIcon from '@/src/components/provider/LucideIcon'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu'

import { cn } from '../utils/cn'
import { useDropdown } from './useToggle'

interface useSelectDropdownProps {
  placeHolder: string
  candidates: string[]
}

const useSelectDropdown = ({ placeHolder, candidates }: useSelectDropdownProps) => {
  const {
    isOpen,
    refs: [buttonRef, dropdownRef],
    toggleDropdown,
  } = useDropdown()

  const [value, setvalue] = useState<string | undefined>()

  const SelectDropdown = ({ className }: { className?: string }) => {
    return (
      <DropdownMenu open={isOpen} onOpenChange={toggleDropdown}>
        <DropdownMenuTrigger
          ref={buttonRef as any}
          className={cn(
            'relative flex cursor-pointer items-center justify-between gap-2 rounded-md border border-solid border-swGray text-base font-medium',
            className,
          )}
        >
          <p>{!value ? placeHolder : value}</p>
          <LucideIcon name={!isOpen ? 'ChevronDown' : 'ChevronUp'} size={26} />
        </DropdownMenuTrigger>
        {/* 드롭다운 */}
        <DropdownMenuContent
          ref={dropdownRef}
          style={{
            minWidth: 'var(--radix-dropdown-menu-trigger-width)',
            maxHeight: 'calc(4*var(--radix-dropdown-menu-trigger-height))',
          }}
          className='relative max-h-[28px] overflow-y-auto bg-swWhite'
        >
          {candidates.map((candidate, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => setvalue(candidate)}
              className='relative z-10 cursor-pointer px-3 py-2 font-medium hover:bg-swGrayLight'
            >
              {candidate}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return { value, SelectDropdown }
}

export default useSelectDropdown
