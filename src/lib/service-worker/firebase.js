// lib/firebase.js
import { getApps, initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const initFirebaseApp = async () => {
  const apps = getApps()

  if (!apps.length) {
    const app = initializeApp(firebaseConfig)

    const messaging = await checkMessageSupport(app)
  }
}
export async function checkMessageSupport(app) {
  const supported = await isSupported()
  if (!supported) {
    console.warn('Firebase Messaging is not supported in this browser.')
    return null
  }

  return getMessaging(app)
}
export async function requestPermissionAndGetToken(messaging) {
  try {
    // 브라우저 지원 여부 확인
    const supported = await isSupported()
    if (!supported) {
      throw new Error('현재 브라우저는 Firebase Messaging을 지원하지 않습니다.')
    }

    // 알림 권한 요청
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      throw new Error('알림 권한이 거부되었습니다.')
    }

    // TODO: 서버의 토큰을 가져오고 / 서버에 토큰이 없으면 새로운 토큰을 반환, 서버에 저장
    // #1. 서버의 토큰을 가져오기

    // #2. 서버에 토큰이 없는 경우 새로운 토큰 발급받기
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })

    if (!token) {
      throw new Error('FCM 토큰을 가져올 수 없습니다.')
    }

    // #3. 서버에 토큰을 저장하기
    return token
  } catch (error) {
    console.error('FCM 토큰 요청 중 에러 발생:', error)
    return null
  }
}
