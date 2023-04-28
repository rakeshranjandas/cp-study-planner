import { SYSTEM_TAG } from "./systemTags"
import { getTodayStartDate, getTomorrowStartDate } from "./dates"

export function filterTodayEvents(allEvents) {
  const todayDate = getTodayStartDate()
  const tomorroDate = getTomorrowStartDate()

  const todayEvents = allEvents.filter((event) => {
    const eventDateTime = new Date(event.start)
    return (
      todayDate <= eventDateTime &&
      eventDateTime < tomorroDate &&
      !isEventASession(event)
    )
  })

  return sortByStartTime(todayEvents)
}

export function filterBacklogEvents(allEvents) {
  const todayDate = getTodayStartDate()

  const backlogEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.start)
    return (
      eventDate < todayDate && !isEventDone(event) && !isEventASession(event)
    )
  })

  return sortByStartTime(backlogEvents)
}

export function sortByStartTime(allEvents) {
  return allEvents.sort(
    (e1, e2) => new Date(e1.start).getTime() - new Date(e2.start).getTime()
  )
}

export function isEventDone(event) {
  return event?.properties?.tags?.includes(SYSTEM_TAG.IS_DONE)
}

export function isEventASession(event) {
  return event?.properties?.tags?.includes(SYSTEM_TAG.IS_SESSION)
}

export function markEventDone(event) {
  const tagSet = new Set(event?.properties?.tags)
  tagSet.add(SYSTEM_TAG.IS_DONE)

  const copiedEvent = {
    ...event,
    properties: { ...event.properties, tags: Array.from(tagSet) },
  }

  return copiedEvent
}
