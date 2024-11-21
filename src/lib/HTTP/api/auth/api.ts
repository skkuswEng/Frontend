import { API_ROUTES, Fetch } from '../../endpoint'

export interface LoginType {
  student_id: string
  password: string
}

export const Login = async ({ student_id, password }: LoginType) => {
  const ROUTE = API_ROUTES.AUTH.LOGIN

  const body = {
    student_id,
    password,
  }
  console.log('Exectued login')

  const res = await Fetch(ROUTE.url, {
    method: ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = new Error('로그인 실패')
    error.message = await res.json()
    throw error
  }

  const data = await res.json()

  return data
}

export interface RegisterType {
  student_id: string
  password: string
  student_name: string
  email: string
}

export const Register = async ({ student_id, password, student_name, email }: RegisterType) => {
  const ROUTE = API_ROUTES.AUTH.REGISTER

  const body = {
    student_id,
    password,
    student_name,
    email,
  }
  console.log('Exectued register')

  const res = await Fetch(ROUTE.url, {
    method: ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = new Error('회원가입 실패')
    error.message = await res.json()
    throw error
  }

  const data = await res.json()

  return data
}

export interface UnregisterType {
  student_id: string
  password: string
}

export const Unregister = async ({ student_id, password }: UnregisterType) => {
  const ROUTE = API_ROUTES.AUTH.UNREGISTER

  const body = {
    student_id,
    password,
  }

  const res = await Fetch(ROUTE.url, {
    method: ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = new Error('회원탈퇴 실패')
    error.message = await res.json()
    throw error
  }

  const data = await res.json()

  return data
}
