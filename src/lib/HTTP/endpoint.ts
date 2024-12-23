import { HttpMethod } from './index'

export const API_ROUTES = {
  AUTH: {
    LOGIN: {
      method: HttpMethod.POST,
      url: '/user/login',
    },
    REGISTER: {
      method: HttpMethod.POST,
      url: '/user/register',
    },
    UNREGISTER: {
      method: HttpMethod.POST,
      url: '/user/unregister',
    },
    FCM_TOKEN: {
      method: HttpMethod.POST,
      url: '/auth/message-token',
    },
    VERIFY_PDF: {
      method: HttpMethod.POST,
      url: '/auth/verify',
    },
  },
  SEAT: {
    STATUS: {
      method: HttpMethod.GET,
      url: '/seat/status',
    },
    USER_RESERVATION: {
      method: HttpMethod.GET,
      url: '/seat/reservation',
    },
    RESERVE: {
      method: HttpMethod.POST,
      url: '/seat/reserve',
    },
    UNRESERVE: {
      method: HttpMethod.DELETE,
      url: '/seat/unreserve',
    },
  },
  ROOM: {
    STATUS: {
      method: HttpMethod.GET,
      url: '/room/status',
    },
    USER_RESERVATION: {
      method: HttpMethod.GET,
      url: '/room/reservation',
    },
    RESERVE: {
      method: HttpMethod.POST,
      url: '/room/reserve',
    },
    UPDATE: {
      method: HttpMethod.POST,
      url: '/room/update',
    },
    UNRESERVE: {
      method: HttpMethod.DELETE,
      url: '/room/unreserve',
    },
  },
}

const baseUrl = 'http://localhost:8000'

export const Fetch = async (url: string, options: RequestInit) => {
  const URL = `${baseUrl}${url}`
  const response = await fetch(URL, options)
  return response
}
