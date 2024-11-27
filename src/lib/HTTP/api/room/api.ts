import { Companion, RoomReservationTime } from '@/src/lib/context/roomContext'
import { ISOFormatWithoutBack } from '@/src/lib/utils/date-utils'

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
    error.message = data.detail
    throw error
  }

  const data: SuccessResponse = await res.json()
  console.log('fetched room status: ', data)

  return data
}

export interface RoomUserReservationType {
  signal: AbortSignal
  studentId: string
}

export const RoomUserReservation = async ({ signal, studentId }: RoomUserReservationType) => {
  const BASE_ROUTE = API_ROUTES.ROOM.USER_RESERVATION

  const queries: Queries = [
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
    error.message = data.detail
    throw error
  }

  const data: SuccessResponse = await res.json()

  return data
}
export interface RoomReserveType {
  studentId: string
  room_number: number
  date: Date
  time: RoomReservationTime
  companion: Array<Companion>
}

export const RoomReserve = async ({ studentId, room_number, date, time, companion }: RoomReserveType) => {
  const ROUTE = API_ROUTES.ROOM.RESERVE
  const combineDateAndTime = (baseDate: Date, timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const newDate = new Date(baseDate)
    newDate.setHours(hours, minutes, 0, 0)
    return newDate
  }

  // Calculate start_date and end_date
  let start_date = combineDateAndTime(date, time.startTime!)
  let end_date = combineDateAndTime(date, time.endTime!)
  const companionList = companion.map(item => ({
    student_id: item.studentId,
    name: item.name,
  }))

  const body = {
    student_id: studentId,
    room_id: room_number,
    start_time: ISOFormatWithoutBack(start_date),
    end_time: ISOFormatWithoutBack(end_date),
    companion: companionList,
  }
  console.log(body)

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
    error.message = data.detail
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
    error.message = data.detail
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
    error.message = data.detail
    throw error
  }

  const data: SuccessResponse = await res.json()

  return data
}
