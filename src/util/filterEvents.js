export function filterTodayEvents(allEvents) {
  const todayDate = new Date(new Date().setHours(0, 0, 0, 0))
  const tomorroDate = new Date(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)
  )
  const todayEvents = allEvents.filter((event) => {
    const eventDateTime = new Date(event.start)
    return todayDate <= eventDateTime && eventDateTime < tomorroDate
  })

  return sortByStartTime(todayEvents)
}

export function filterBacklogEvents(allEvents) {
  const todayDate = new Date(new Date().setHours(0, 0, 0, 0))

  const backlogEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.start)
    return eventDate < todayDate && !event.properties.tags.includes("done")
  })

  return sortByStartTime(backlogEvents)
}

function sortByStartTime(allEvents) {
  return allEvents.sort(
    (e1, e2) => new Date(e1.start).getTime() - new Date(e2.start).getTime()
  )
}
