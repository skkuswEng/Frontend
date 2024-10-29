import { HttpMethod } from './index'

export const BACKEND_ROUTES = {
  AUTH: {
    LOGIN: {
      method: HttpMethod.POST,
      url: '/auth/login',
    },
    REGISTER: {
      method: HttpMethod.POST,
      url: '/auth/register',
    },
  },
}
