'use client'
// PushNotificationLayout.tsx
import { onMessage } from 'firebase/messaging'
import { ReactNode, useEffect } from 'react'

import { checkMessageSupport, initFirebaseApp } from '@/src/lib/service-worker/firebase'

export const PushNotificationLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    initFirebaseApp()

    const initialize = async () => {
      try {
        // Firebase 초기화
        initFirebaseApp()

        // 메시지 지원 확인
        const messaging = await checkMessageSupport()
        if (messaging) {
          // 메시지 이벤트 등록
          onMessage(messaging, payload => {
            // 메시지 이벤트 발생 시
            if (payload.notification) {
              const { title, body } = payload.notification
              console.log('포그라운드 알림', payload.notification)

              // 서비스 워커를 통해 푸시 알림 노출
              navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title as string, { body })
              })
            }
          })
        }
      } catch (error) {
        console.error('Error initializing messaging:', error)
      }
    }

    initialize() // 비동기 함수 호출
  }, [])

  return <>{children}</>
}
