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
}

const baseUrl = 'http://localhost:8001'

export const Fetch = async (url: string, options: RequestInit) => {
  const URL = `${baseUrl}${url}`
  const response = await fetch(URL, options)
  return response
}
