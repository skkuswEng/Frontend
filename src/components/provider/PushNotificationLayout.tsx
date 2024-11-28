'use client'
// PushNotificationLayout.tsx
import { getMessaging, onMessage } from 'firebase/messaging'
import { ReactNode, useEffect } from 'react'

import { initFirebaseApp } from '@/src/lib/service-worker/firebase'

export const PushNotificationLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    initFirebaseApp()
    const messaging = getMessaging() // 메시지 인스턴스 가져오기

    onMessage(messaging, payload => {
      // 메시지 이벤트 발생 시
      if (payload.notification) {
        const { title, body } = payload.notification
        console.log('포그라운드 알림', payload.notification)

        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title as string, { body }) // 푸시 알림 노출
        })
      }
    })
  }, [])

  return <>{children}</>
}
