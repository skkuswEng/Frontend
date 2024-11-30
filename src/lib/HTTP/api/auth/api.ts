import { Nullable } from '@/src/lib/utils/typeUtils'

import { API_ROUTES, Fetch } from '../../endpoint'

export interface LoginType {
  student_id: string
  password: string
}

export type SuccessResponse = {
  content: Nullable<{ [key: string]: any }>
  message: string
}

export const Login = async ({ student_id, password }: LoginType) => {
  const ROUTE = API_ROUTES.AUTH.LOGIN

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
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()

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

  const res = await Fetch(ROUTE.url, {
    method: ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message

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
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data = await res.json()

  return data
}

export interface FCMTokenType {
  student_id: string
  token: string
}

export const FCMToken = async ({ student_id, token }: FCMTokenType) => {
  const ROUTE = API_ROUTES.AUTH.FCM_TOKEN

  const body = {
    student_id,
    token,
  }

  const res = await Fetch(ROUTE.url, {
    method: ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data = await res.json()

  return data
}

export interface VerifyPDFType {
  student_id: string
  name: string
  pdf: File
}

export const VerifyPDF = async ({ student_id, name, pdf }: VerifyPDFType) => {
  console.log('테스트 실행됨')

  const ROUTE = API_ROUTES.AUTH.FCM_TOKEN

  const formData = new FormData()
  formData.append('student_number', student_id)
  formData.append('student_name', name)
  formData.append('pdf_file', pdf)

  const res = await fetch(`http://localhost:5000${ROUTE.url}`, {
    method: ROUTE.method,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data = await res.json()

  return data
}
