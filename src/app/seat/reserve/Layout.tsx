import React, { ReactNode, Suspense } from 'react'

interface ReservePageLayoutProps {
  children: ReactNode
}

const ReservePageLayout = ({ children }: ReservePageLayoutProps): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default ReservePageLayout

export const Loading = () => {
  return <div>Loading...</div>
}
