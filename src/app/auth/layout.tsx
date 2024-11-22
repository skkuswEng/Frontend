'use client'
import React, { ReactNode } from 'react'

import CustomQueryClientProvider from '@/src/components/provider/QueryClientProvider'
import { ToastProvider } from '@/src/components/ui/toast'
import { Toaster } from '@/src/components/ui/toaster'

interface LoginLayoutProps {
  children: React.ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps): ReactNode => {
  return (
    <CustomQueryClientProvider>
      <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
    </CustomQueryClientProvider>
  )
}

export default LoginLayout
