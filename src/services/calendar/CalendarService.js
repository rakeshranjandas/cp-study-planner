import { DBCalendarServices } from "../db/DBCalendarServices"
import {
  googleCalendarEventToAppCalendarEvent,
  appCalendarEventToGoogleCalendarEvent,
} from "./EventConvertor"

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

    console.log(appCalendarEvents, "appCalendarEvents")

    DBCalendarServices.loadAllEvents(appCalendarEvents)

    this.panelsUpdater.run()

    this.setAppCalendarEvents(appCalendarEvents)
  }

  async addGoogleCalendarEvent(appEvent) {
    const googleCalendarEvent = appCalendarEventToGoogleCalendarEvent(appEvent)

    console.log(googleCalendarEvent, "googleCalendarEvent")

    const googleCalendarEventAdded =
      await this.googleCalendarAPIInstance.addEvent(googleCalendarEvent)

    console.log(googleCalendarEventAdded, "googleCalendarEventAdded")

    return googleCalendarEventToAppCalendarEvent(googleCalendarEventAdded)
  }

  async updateGoogleCalendarEvent(appEvent) {
    const googleCalendarEvent = appCalendarEventToGoogleCalendarEvent(appEvent)
    const googleCalendarEventId = appEvent.id

    const googleCalendarEventUpdated =
      await this.googleCalendarAPIInstance.updateEvent(
        googleCalendarEvent,
        googleCalendarEventId
      )

    console.log(googleCalendarEventUpdated, "googleCalendarEventUpdated")

    return googleCalendarEventToAppCalendarEvent(googleCalendarEventUpdated)
  }

  async deleteGoogleCalendarEvent(googleCalendarEventId) {
    await this.googleCalendarAPIInstance.deleteEvent(googleCalendarEventId)
  }
}
