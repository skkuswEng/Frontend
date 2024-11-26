import { tmp_room_data_type } from '@/src/app/room/history/page'

// 백엔드가 보내주는 데이터 형식
export const TMP_ROOM_DATA: tmp_room_data_type[] = []

function generateRandomTime() {
  const startHour = Math.floor(Math.random() * 11) + 9 // 9시부터 19시까지
  const startMinute = Math.random() < 0.5 ? 0 : 30 // 0 또는 30분
  const endHour = startHour + 1 // 최소 1시간 예약

  return {
    startTime: { hour: startHour, minute: startMinute },
    endTime: { hour: endHour, minute: startMinute },
  }
}

function generateRandomDate() {
  const today = new Date()
  const randomOffset = Math.floor(Math.random() * 11) - 5 // 오늘 기준 -5일 ~ +5일
  const randomDate = new Date(today)
  randomDate.setDate(today.getDate() + randomOffset)
  return randomDate
}

function formatDateWithTime(
  date: Date,
  time: {
    hour: number
    minute: number
  },
) {
  const formattedDate = new Date(date)
  formattedDate.setHours(time.hour, time.minute, 0, 0)
  return formattedDate
}

for (let i = 0; i < 4; i++) {
  const roomNumber = Math.floor(Math.random() * 3) + 1 // 1, 2, 3 중 랜덤
  const leader = {
    student_id: String(Math.floor(Math.random() * 1e9)).padStart(9, '0'),
    name: '홍길동', // 예제 이름
  }

  const companions = Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() => ({
    student_id: String(Math.floor(Math.random() * 1e9)).padStart(9, '0'),
    name: '김철수', // 예제 이름
  }))

  const randomDate = generateRandomDate()
  const { startTime, endTime } = generateRandomTime()

  TMP_ROOM_DATA.push({
    room_number: roomNumber,
    startDate: formatDateWithTime(randomDate, startTime),
    endDate: formatDateWithTime(randomDate, endTime),
    leader: leader,
    companion: companions,
  })
}
