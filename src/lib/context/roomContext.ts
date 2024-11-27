import { create } from 'zustand'

export interface Companion {
  studentId: string
  name: string
}

export type RoomReservationTime = {
  startTime: string | undefined
  endTime: string | undefined
}

interface RoomDataState {
  room_number?: number
  date?: Date
  time: RoomReservationTime
  leader?: Companion
  companionList: Array<Companion>
}

export interface RoomState extends RoomDataState {
  setRoomNumber: (roomNumber: number) => void
  setDate: (date: Date) => void
  setTime: (startTime: string | undefined, endTime: string | undefined) => void
  setLeader: (leader: Companion) => void
  setCompanion: (companions: Array<Companion>) => void
}
export const INIT_COMPANION: Companion = {
  studentId: '',
  name: '',
}

export const INIT_COMPANIONS: Array<Companion> = [INIT_COMPANION]
const useRoomStateStore = create<RoomState>(set => ({
  room_number: undefined,
  date: undefined,
  time: {
    startTime: undefined,
    endTime: undefined,
  },
  leader: undefined,
  companionList: INIT_COMPANIONS,

  setRoomNumber: roomNumber =>
    set(() => ({
      room_number: roomNumber,
    })),

  setDate: date =>
    set(() => ({
      date,
    })),

  setTime: (startTime, endTime) =>
    set(() => ({
      time: { startTime, endTime },
    })),

  setLeader: leader =>
    set(() => ({
      leader,
    })),

  setCompanion: companions =>
    set(() => ({
      companionList: companions,
    })),
}))

export default useRoomStateStore
