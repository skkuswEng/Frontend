import { ModalData } from '@/src/components/common/Modals'

export const ClientModalData = {
  AUTH: {
    REGISTER: {
      SUCCESS: {
        id: 'info',
        title: '회원가입 완료',
        description: 'TRABOOK의 회원이 되신것을 진심으로 환영합니다!',
        isError: false,
      },

      NO_INPUT: (input_type: string) => {
        return {
          id: 'info',
          title: '회원가입 정보 부족',
          description: `${input_type}를 입력해주세요`,
          isError: true,
        } as ModalData
      },
      INVALID_STUDENT_NAME: {
        id: 'info',
        title: '이름 형식 오류',
        description: `이름에는 숫자,특수문자를 포함할 수 없습니다`,
        isError: true,
      },
      INVALID_STUDENT_ID: {
        id: 'info',
        title: '학번 형식 오류',
        description: `학번은 10글자 숫자여야 합니다`,
        isError: true,
      },
      INVALID_EMAIL: {
        id: 'info',
        title: '이메일 형식 오류',
        description: `올바른 이메일 형식이 아닙니다`,
        isError: true,
      },
      INVALID_PASSWORD: {
        id: 'info',
        title: '비밀번호 형식 오류',
        description: `비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다`,
        isError: true,
      },
    },

    SIGNOUT: {
      id: 'info',
      title: '회원탈퇴 완료',
      description: '더 좋은 서비스를 제공하기 위해 노력하겠습니다',
      isError: false,
    },

    LOGIN: {
      id: 'info',
      title: '로그인',
      description: '올바른 비밀번호가 아닙니다.',
      isError: true,
    },
  },
  SEAT: {
    RESERVATION: {
      RESERVE: (seat_number: number): ModalData => {
        return {
          id: 'confirm',
          title: `${seat_number}번 좌석`,
          description: '좌석을 배정하시겠습니까?',
          isError: false,
        }
      },
      AUTHORITY_REQUIRED: {
        id: 'info',
        title: '위치 권한 필요',
        description: '위치정보를 허용해주세요',
        isError: true,
      },
      UNRESERVE: (seat_number: number): ModalData => {
        return {
          id: 'confirm',
          title: `${seat_number}번 좌석 반납`,
          description: '해당 좌석을 반납하시겠습니까? (자리를 정리해주세요)',
          isError: false,
        }
      },
    },
    QR: {
      id: 'info',
      title: 'QR 로그인 서비스 불가',
      description: '모바일 · 태블릿을 사용해주세요',
      isError: true,
    },
  },
  ROOM: {
    RESERVE: {
      AUTH_REQUIRED: {
        id: 'info',
        title: '로그인 필요',
        description: '예약을 위해서 로그인해주세요',
        isError: true,
      },
    },
    UNRESERVE: {
      CONFIRM: {
        id: 'confirm',
        title: '예약 취소 확인',
        description: '예약을 취소 하시겠습니까?',
        isError: false,
      },
    },
  },
} as const
