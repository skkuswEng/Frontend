import { attachQuery, Queries } from '../..'
import { API_ROUTES, Fetch } from '../../endpoint'
import { SuccessResponse } from '../auth/api'

export interface RoomStatusType {
  signal: AbortSignal
  room_number: number
  date: string // ISO 형식
}

export const RoomStatus = async ({ signal, room_number, date }: RoomStatusType) => {
  const BASE_ROUTE = API_ROUTES.ROOM.STATUS

  const queries: Queries = [
    {
      key: 'room_id',
      value: room_number,
    },
    {
      key: 'date',
      value: date,
    },
  ]
  console.log(attachQuery(BASE_ROUTE.url, queries))

  const res = await Fetch(attachQuery(BASE_ROUTE.url, queries), {
    method: BASE_ROUTE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  })

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()
  console.log('fetched room status: ', data)

  return data
}

export interface RoomUserReservationType {}

export const RoomUserReservation = async ({}: RoomUserReservationType) => {
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
export interface RoomReserveType {}

export const RoomReserve = async ({}: RoomReserveType) => {
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

export interface RoomUpdateType {}

export const RoomUpdate = async ({}: RoomUpdateType) => {
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
export interface RoomUnreserveType {}

export const RoomUnreserve = async ({}: RoomUnreserveType) => {
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
