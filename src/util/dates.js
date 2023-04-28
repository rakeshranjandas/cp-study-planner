export function getTodayStartDate() {
  return new Date(new Date().setHours(0, 0, 0, 0))
}

export function getTomorrowStartDate() {
  return new Date(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)
  )
}
