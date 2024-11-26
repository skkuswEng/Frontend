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
  signal: AbortSignal
  studentId: string
}

export const SeatUserReservation = async ({ signal, studentId }: SeatUserReservationType) => {
  const BASE_ROUTE = API_ROUTES.SEAT.USER_RESERVATION
  const queries = [
    {
      key: 'student_id',
      value: studentId + 100,
    },
  ]

  const ROUTE = attachQuery(BASE_ROUTE.url, queries)
  const res = await Fetch(ROUTE, {
    method: BASE_ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  })

  if (!res.ok) {
    console.log(res)

    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()

  return data
}

export interface SeatReserveType {
  studentId: string
  seat_number: number
  reservation_date: string // ISO String Format
}

export const SeatReserve = async ({ studentId, seat_number, reservation_date }: SeatReserveType) => {
  const ROUTE = API_ROUTES.SEAT.RESERVE

  const body = {
    student_id: studentId,
    seat_number,
    reservation_date,
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

export interface SeatUnreserveType {
  studentId: string
  seat_number: number
}

export const SeatUnreserve = async ({ studentId, seat_number }: SeatUnreserveType) => {
  const ROUTE = API_ROUTES.SEAT.UNRESERVE

  const body = {
    student_id: studentId,
    seat_number,
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
