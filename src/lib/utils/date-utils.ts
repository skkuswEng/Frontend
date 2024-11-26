export function formatDateToString(date: Date) {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = daysOfWeek[date.getDay()] // 요일 (0: 일요일, 6: 토요일)

  return `${year}. ${month}. ${day} (${dayOfWeek})`
}

export function formatTimeRange(startDate: Date, endDate: Date) {
  const padZero = (num: number) => String(num).padStart(2, '0')

  // 시작 시간
  const startHour = padZero(startDate.getHours())
  const startMinute = padZero(startDate.getMinutes())

  // 끝 시간
  const endHour = padZero(endDate.getHours())
  const endMinute = padZero(endDate.getMinutes())

  // 시작 날짜와 끝 날짜 비교
  if (startDate.toDateString() === endDate.toDateString()) {
    // 날짜가 같으면 "HH:MM ~ HH:MM" 형식
    return `${startHour}:${startMinute} ~ ${endHour}:${endMinute}`
  } else {
    // 날짜가 다르면 "HH:MM ~ DD. HH:MM" 형식
    const endDay = padZero(endDate.getDate())
    const endMonth = padZero(endDate.getMonth() + 1) // 월은 0부터 시작하므로 +1
    return `${startHour}:${startMinute} ~ ${endMonth}.${endDay} ${endHour}:${endMinute}`
  }
}
