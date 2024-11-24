'use client'
import React, { ReactNode } from 'react'

interface LoginLayoutProps {
  children: React.ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps): ReactNode => {
  return <>{children}</>
}

export default LoginLayout
