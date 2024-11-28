// lib/firebase.js
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export { getToken, messaging }

import { isSupported } from 'firebase/messaging'

export async function requestPermissionAndGetToken() {
  console.log('vapid key is:', process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY)
  const messaging = getMessaging(app)

  try {
    // 브라우저 지원 여부 확인
    const supported = await isSupported()
    if (!supported) {
      throw new Error('현재 브라우저는 Firebase Messaging을 지원하지 않습니다.')
    }
    console.log('is suported')

    // 알림 권한 요청
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      throw new Error('알림 권한이 거부되었습니다.')
    }

    // FCM 토큰 가져오기
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })

    if (!token) {
      throw new Error('FCM 토큰을 가져올 수 없습니다.')
    }

    return token
  } catch (error) {
    console.error('FCM 토큰 요청 중 에러 발생:', error)
    return null
  }
}
