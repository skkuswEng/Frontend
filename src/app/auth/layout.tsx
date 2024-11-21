'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

import { queryClient } from '@/src/lib/HTTP/api/tanstack-query'

interface LoginLayoutProps {
  children: React.ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps): ReactNode => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default LoginLayout
