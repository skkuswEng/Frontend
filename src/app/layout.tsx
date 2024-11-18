import './globals.css'

import type { Metadata } from 'next'

import { pretendard } from '../../public/fonts/fonts'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import { cn } from '../lib/utils/cn'

export const metadata: Metadata = {
  title: 'Sokk',
  description: '성균관대 지능형 소프트웨어학과 라운지 좌석 시스템',
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
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
    <html lang='en'>
      <body className={cn(pretendard.className)}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
