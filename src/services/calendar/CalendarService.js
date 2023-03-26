import { DBCalendarServices } from "../db/DBCalendarServices"
import { googleCalendarEventToAppCalendarEvent } from "./EventConvertor"

export class CalendarService {
  panelsUpdater = null
  googleCalendarAPIInstance = null
  setAppCalendarEvents = null

  constructor(settings) {
    this.panelsUpdater = settings.panelsUpdater
    this.googleCalendarAPIInstance = settings.googleCalendarAPIInstance
    this.setAppCalendarEvents = settings.setAppCalendarEvents
  }

  async listGoogleCalendars() {
    return this.googleCalendarAPIInstance.listCalendars()
  }

  findAndSetGoogleCalendarId(googleCalendars) {
    return this.googleCalendarAPIInstance.findAndSetCalendarId(googleCalendars)
  }

  getGoogleCalendarEvents() {
    return this.googleCalendarAPIInstance.getEvents()
  }

  async createGoogleCalendar() {
    await this.googleCalendarAPIInstance.createCalendar()
  }

  async loadEvents() {
    const googleCalendarEvents =
      await this.googleCalendarAPIInstance.getEvents()

    const appCalendarEvents =
      googleCalendarEvents.map((googleCalendarEvent) =>
        googleCalendarEventToAppCalendarEvent(googleCalendarEvent)
      ) ?? []

    DBCalendarServices.loadAllEvents(appCalendarEvents)

    this.panelsUpdater.run()

    this.setAppCalendarEvents(appCalendarEvents)
  }
}
