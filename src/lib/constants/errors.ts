import { ModalData } from '@/src/components/common/Modals'

// Success
const ClientSuccessModalData = {
  AUTH: {
    REGISTER: {
      id: 'info',
      title: '회원가입 완료',
      description: 'TRABOOK의 회원이 되신것을 진심으로 환영합니다!',
      isError: false,
    },
    SIGNOUT: {
      id: 'info',
      title: '회원탈퇴 완료',
      description: '더 좋은 서비스를 제공하기 위해 노력하겠습니다',
      isError: false,
    },
  },
  SEAT: {
    RESERVATION: (seat_number: number) => {
      return {
        id: 'confirm',
        title: `${seat_number}번 좌석`,
        description: '좌석을 배정하시겠습니까?',
        isError: false,
      } as ModalData
    },
  },
} as const
// Errors
const ClientErrorModalData = {
  AUTH: {
    LOGIN: {
      id: 'info',
      title: '로그인',
      description: '올바른 비밀번호가 아닙니다.',
      isError: true,
    },
  },
} as const

export const ClientModalData = {
  ...ClientSuccessModalData,
  ...ClientErrorModalData,
} as const
