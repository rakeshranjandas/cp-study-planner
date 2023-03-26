export function googleCalendarEventToAppCalendarEvent(googleCalendarEvent) {
  console.log(googleCalendarEvent, "googleCalendarEvent")
  return {
    id: googleCalendarEvent.id,
    title: googleCalendarEvent.summary,
    start: googleCalendarEvent.start.date,
    end: googleCalendarEvent.end.date,
    googleCalendarEvent: googleCalendarEvent,
  }
}

export function appCalendarEventToGoogleCalendarEvent(appCalendarEvent) {
  return {}
}
