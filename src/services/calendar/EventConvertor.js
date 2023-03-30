export function googleCalendarEventToAppCalendarEvent(googleCalendarEvent) {
  console.log(googleCalendarEvent, "googleCalendarEvent")

  const descriptionRaw = googleCalendarEvent.description
  const { description, properties } = {
    ...Util.processDescriptionAndProperties(descriptionRaw),
  }

  return {
    id: googleCalendarEvent.id,
    title: googleCalendarEvent.summary,
    start: googleCalendarEvent.start.date ?? googleCalendarEvent.start.dateTime,
    end: googleCalendarEvent.end.date ?? googleCalendarEvent.end.dateTime,
    allDay: !!googleCalendarEvent.start.date,

    ...(description && {
      description: description,
    }),

    ...(properties && {
      properties: properties,
    }),

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

const Util = {
  regexp: /(.*)(#cp-study-calendar#(.*)#\/cp-study-calendar#)(.*)/gs,

  processDescriptionAndProperties: function (descRaw) {
    if (!descRaw) return false

    const matches = [...descRaw.matchAll(this.regexp)]

    if (matches.length === 0 || matches[0].length < 5) return false

    const data = matches[0][3]
    if (!this._isJsonString(data)) return false

    const ldata = matches[0][1]
    const rdata = matches[0][4]

    return {
      description: ldata + rdata,
      properties: JSON.parse(data),
    }
  },

  _isJsonString(str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  },
}

// '#cp-study-calendar#{"tags":["dp","greedy"],"done":true}#/cp-study-calendar#'
