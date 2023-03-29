export function googleCalendarEventToAppCalendarEvent(googleCalendarEvent) {
  console.log(googleCalendarEvent, "googleCalendarEvent")
  return {
    id: googleCalendarEvent.id,
    title: googleCalendarEvent.summary,
    start:
      googleCalendarEvent.start.date ??
      dateConvertTimezone(
        googleCalendarEvent.start.dateTime,
        googleCalendarEvent.start.timeZone
      ),
    end:
      googleCalendarEvent.end.date ??
      dateConvertTimezone(
        googleCalendarEvent.end.dateTime,
        googleCalendarEvent.end.timeZone
      ),
    googleCalendarEvent: googleCalendarEvent,
  }
}

export function appCalendarEventToGoogleCalendarEvent(appCalendarEvent) {
  return {}
}

function dateConvertTimezone(dateStr, toTimezoneStr) {
  return new Date(
    new Date(dateStr).toLocaleString("en-US", { timeZone: toTimezoneStr })
  ).toISOString()
}
