export default function convertMinutesToHours(time: number) {
  const hour = time / 60
  const minutes = time % 60
  const hours = parseInt(String(hour))
  return [hours, minutes]
}