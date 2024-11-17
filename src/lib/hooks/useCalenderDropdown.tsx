'use client'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import React from 'react'

import LucideIcon from '@/src/components/provider/LucideIcon'
import { Button } from '@/src/components/ui/button'
import { Calendar } from '@/src/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover'

import { cn } from '../utils/cn'

interface useCalenderDropdownProps {
  placeHolder?: string
}

const useCalenderDropdown = ({ placeHolder }: useCalenderDropdownProps) => {
  const [date, setDate] = React.useState<Date | undefined>()

  const CalenderDropdown = ({ className }: { className?: string }) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className={cn('border border-solid border-swGray text-left font-normal', !date && 'text-muted-foreground', className)}>
            <LucideIcon name='Calendar' size={26} />
            {date ? format(date, 'PPP', { locale: ko }) : <span className='text-base text-swGrayDark'>{placeHolder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    )
  }

  return { date, CalenderDropdown }
}

export default useCalenderDropdown
