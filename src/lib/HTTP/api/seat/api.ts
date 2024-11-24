import { Nullable } from '@/src/lib/utils/typeUtils'

import { attachQuery } from '../..'
import { API_ROUTES, Fetch } from '../../endpoint'

export type SuccessResponse = {
  content: Nullable<{ [key: string]: any }>
  message: string
}

export interface SeatStatusType {}

export const SeatStatus = async () => {
  const ROUTE = API_ROUTES.SEAT.STATUS

  const res = await Fetch(ROUTE.url, {
    method: ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
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

export interface SeatUserReservationType {
  studentId: string
}

export const SeatUserReservation = async ({ studentId }: SeatUserReservationType) => {
  const BASE_ROUTE = API_ROUTES.SEAT.USER_RESERVATION
  const queries = [
    {
      key: 'student_id',
      value: studentId,
    },
  ]

  const ROUTE = attachQuery(BASE_ROUTE.url, queries)
  const res = await Fetch(ROUTE, {
    method: BASE_ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
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

export interface SeatReserveType {}

export const SeatReserve = async ({}: SeatReserveType) => {
  const ROUTE = API_ROUTES.SEAT.RESERVE

  // const body = {
  //   student_id,
  //   password,
  // }

  const res = await Fetch(ROUTE.url, {
    method: ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(body),
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

export interface SeatUnreserve {}

export const SeatUnreserve = async ({}: SeatUnreserve) => {
  const ROUTE = API_ROUTES.SEAT.STATUS

  // const body = {
  //   student_id,
  //   password,
  // }

  const res = await Fetch(ROUTE.url, {
    method: ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(body),
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
