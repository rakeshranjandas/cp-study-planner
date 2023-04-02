export function timeSecondsToHHMM(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds - 60 * minutes

  return ("0" + minutes).substr(-2) + ":" + ("0" + seconds).substr(-2)
}

export function timeHHMMToSeconds(timeHHMM) {
  const [minutes, seconds] = timeHHMM.split(":")

  if (isNaN(minutes) || isNaN(seconds)) return false

  return parseInt(minutes) * 60 + parseInt(seconds)
}
