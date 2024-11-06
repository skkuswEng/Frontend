import './globals.css'

import type { Metadata } from 'next'

import { pretendard } from '../../public/fonts/fonts'
import Header from '../components/common/Header'
import { cn } from '../lib/utils/cn'

export const metadata: Metadata = {
  title: 'Sokk',
  description: '성균관대 지능형 소프트웨어학과 라운지 좌석 시스템',
  icons: {
    icon: '../app/favicon.ico',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={cn(pretendard.className)}>
        <Header />
        {children}
      </body>
    </html>
  )
}
