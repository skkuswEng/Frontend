import './globals.css'

import type { Metadata } from 'next'
import { Suspense } from 'react'

import { pretendard } from '../../public/fonts/fonts'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import { cn } from '../lib/utils/cn'
import InstallPrompt from '../lib/utils/install-prompt'

export const metadata: Metadata = {
  title: 'Sokk',
  description: '성균관대 지능형 소프트웨어학과 라운지 좌석 시스템',
  manifest: '/manifest.json',
  icons: {
    icon: '../../public/images/splash.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        url: '/images/splash.png',
      },
    ],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 


  return (
    <html lang='ko'>
      <body className={cn(pretendard.className)}>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <InstallPrompt />
        <Footer />
      </body>
    </html>
  )
}
