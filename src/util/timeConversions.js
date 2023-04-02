export function toHHMM(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds - 60 * minutes

  return ("0" + minutes).substr(-2) + ":" + ("0" + seconds).substr(-2)
}
