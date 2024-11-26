import { create } from 'zustand'

interface Companion {
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
  companionList?: Array<Companion>
}

export interface RoomState extends RoomDataState {
  setRoomNumber: (roomNumber: number) => void
  setDate: (date: Date) => void
  setTime: (startTime: string, endTime: string | undefined) => void
  setLeader: (leader: Companion) => void
  addCompanion: (companion: Companion) => void
  removeCompanion: (id: string) => void
}

const useRoomStateStore = create<RoomState>(set => ({
  room_number: undefined,
  date: undefined,
  time: {
    startTime: undefined,
    endTime: undefined,
  },
  leader: undefined,
  companionList: undefined,

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

  addCompanion: companion =>
    set(state => ({
      companionList: [...(state.companionList || []), companion],
    })),

  removeCompanion: id =>
    set(state => ({
      companionList: (state.companionList || []).filter(comp => comp.studentId !== id),
    })),
}))

export default useRoomStateStore
