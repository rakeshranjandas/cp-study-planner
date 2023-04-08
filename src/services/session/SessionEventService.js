import { update } from "xstate/lib/actionTypes"
import { isEventDone } from "../../util/filterEvents"
import { sessionToAppCalendarEvent } from "../calendar/EventConvertor"

export class SessionEventService {
  calendarService = null

  constructor(settings) {
    this.calendarService = settings.calendarService
  }

  async addSessionEvent(session, appCalendarEvents) {
    const appEvent = sessionToAppCalendarEvent(session)
    console.log("appEvent from session", session, appEvent)

    const addedAppEvent = await this.calendarService.addGoogleCalendarEvent(
      appEvent
    )

    const doneEventsIdList = this.getDoneEventIdList(session)
    console.log("doneEventsIdList", doneEventsIdList)

    const updatedEventsList = await Promise.all(
      doneEventsIdList.map(async (doneEventId) => {
        return this.markAppCalendarEventDone(doneEventId, appCalendarEvents)
      })
    )

    return {
      events: [addedAppEvent, ...updatedEventsList],
    }
  }

  getDoneEventIdList(session) {
    return session.events.filter((ev) => ev.done).map((ev) => ev.id)
  }

  async markAppCalendarEventDone(doneEventId, appCalendarEvents) {
    const appEvent = appCalendarEvents.find((ev) => ev.id === doneEventId)
    const copiedAppEvent = structuredClone(appEvent)

    if (!isEventDone(copiedAppEvent))
      copiedAppEvent.properties.tags.push("done")

    return this.calendarService.updateGoogleCalendarEvent(copiedAppEvent)
  }
}
