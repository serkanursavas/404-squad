export function splitDateTime(dateTimeString: string): { date: string; time: string } {
  const dateObj = new Date(dateTimeString)

  const date = dateObj.toISOString().split('T')[0]

  const time = dateObj.toTimeString().split(' ')[0].slice(0, 5)

  return { date, time }
}

export function mergeDateTime(date: string, time: string): string {
  const dateTimeString = new Date(`${date}T${time}:00`).toISOString()

  return dateTimeString
}

export function getFormattedDayAndMonth(dateStr?: string): string {
  const date = new Date(dateStr || '1970-01-01')

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const dayOfWeek = daysOfWeek[date.getDay()]
  const dayOfMonth = date.getDate()
  const monthOfYear = monthsOfYear[date.getMonth()]

  return `${dayOfWeek}, ${dayOfMonth} ${monthOfYear}`
}
