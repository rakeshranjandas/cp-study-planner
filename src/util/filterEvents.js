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

function _addTagToEvent(event, [tagList]) {
  const tagSet = new Set(event?.properties?.tags)

  tagList.forEach((tag) => tagSet.add(tag))

  const copiedEvent = {
    ...event,
    properties: { ...event.properties, tags: Array.from(tagSet) },
  }

  return copiedEvent
}

export function markEventDone(event) {
  return _addTagToEvent([SYSTEM_TAG.IS_DONE])
}

export function markEventSr(event) {
  return _addTagToEvent([SYSTEM_TAG.IS_SR])
}
