export function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return daysOfWeek[date.getDay()]
}
