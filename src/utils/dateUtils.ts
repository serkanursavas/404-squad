export function getDayOfWeek(dateStr?: string): string {
  const date = new Date(dateStr || '1970-01-01') // Varsayılan tarih kullanılıyor

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const dayName = daysOfWeek[date.getDay()]
  const dayNumber = date.getDate()
  const monthName = months[date.getMonth()]

  return `${dayName}, ${dayNumber} ${monthName}`
}
