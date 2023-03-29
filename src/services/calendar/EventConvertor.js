export function googleCalendarEventToAppCalendarEvent(googleCalendarEvent) {
  console.log(googleCalendarEvent, "googleCalendarEvent")
  return {
    id: googleCalendarEvent.id,
    title: googleCalendarEvent.summary,
    start: googleCalendarEvent.start.date ?? googleCalendarEvent.start.dateTime,
    end: googleCalendarEvent.end.date ?? googleCalendarEvent.end.dateTime,
    allDay: !!googleCalendarEvent.start.date,

    googleCalendarEvent: googleCalendarEvent,
  }
}

export function appCalendarEventToGoogleCalendarEvent(appCalendarEvent) {
  return {
    start: {
      ...(appCalendarEvent.allDay && { date: appCalendarEvent.start }),
      ...(!appCalendarEvent.allDay && {
        dateTime: new Date(appCalendarEvent.start).toISOString(),
      }),
    },

    end: {
      ...(appCalendarEvent.allDay && { date: appCalendarEvent.end }),
      ...(!appCalendarEvent.allDay && {
        dateTime: new Date(appCalendarEvent.end).toISOString(),
      }),
    },

    summary: appCalendarEvent.title,
  }
}
