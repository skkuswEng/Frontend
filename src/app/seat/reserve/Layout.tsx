'use client'
import React, { ReactNode } from 'react'

import CustomQueryClientProvider from '@/src/components/provider/QueryClientProvider'
import { ToastProvider } from '@/src/components/ui/toast'
import { Toaster } from '@/src/components/ui/toaster'

interface ReservePageLayoutProps {
  children: ReactNode
}

const ReservePageLayout = ({ children }: ReservePageLayoutProps) => {
  return (
    <CustomQueryClientProvider>
      <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
    </CustomQueryClientProvider>
  )
}

export default ReservePageLayout
