import React, { ReactNode } from 'react'

interface LoginLayoutProps {
  children: React.ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps): ReactNode => {
  return <div>{children}</div>
}

export default LoginLayout
