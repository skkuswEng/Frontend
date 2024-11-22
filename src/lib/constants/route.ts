import { ExtractValueByKey } from '../utils/typeUtils'

/**
 * Route vs ApiEndpoint
 * - Route: 클라이언트에서 사용하는 path
 * - ApiEndpoint: 서버와 접속하기 위한 path
 */
export interface Route {
  name: string // 링크 버튼에 표시될 Text
  url: string
}

/**
 * 새로운 Route 생성시 추가
 */
export const ROUTES = {
  MAIN: {
    name: '메인',
    url: '/',
  },
  AUTH: {
    LOGIN: {
      name: '로그인',
      url: '/auth/login',
    },
    REGISTER: {
      name: '로그인',
      url: '/auth/register',
    },
  },
  SEAT: {
    RESERVE: (n: number) => {
      return { name: '좌석 배정', url: `/seat/reserve?n=${n}` }
    },
    QR: {
      STEP1: {
        name: '좌석 배정',
        url: '/seat/qr/step1',
      },
      STEP2: {
        name: '좌석 배정',
        url: '/seat/qr/step2',
      },
    },
  },
  ROOM: {
    RESERVE: {
      STEP1: {
        name: '스터디룸 예약',
        url: '/room/reserve/step1',
      },
      STEP2: {
        name: '스터디룸 예약',
        url: '/room/reserve/step2',
      },
    },
    HISTORY: {
      name: '스터디룸 예약내역',
      url: '/room/history',
    },
  },
  ETC: {
    LOUNGE_RULES: {
      name: '이용수칙',
      url: '/rules',
    },
    PERSONAL_INFO_RULES: {
      name: '이용수칙',
      url: 'https://short-adapter-fc5.notion.site/SOKK-145a9bbfc70780f39253ef114413f353?pvs=4',
    },
    SERVICE_CENTER: {
      name: '이용수칙',
      url: 'http://pf.kakao.com/_TIqMn/chat',
    },
  },
} as const

// 자동으로 갱신되는 Url 타입
export type RouteType = ExtractValueByKey<typeof ROUTES, 'url'>
