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
}

const baseUrl = 'http://localhost:8000'

export const Fetch = async (url: string, options: RequestInit) => {
  const URL = `${baseUrl}${url}`
  const response = await fetch(URL, options)
  return response
}
