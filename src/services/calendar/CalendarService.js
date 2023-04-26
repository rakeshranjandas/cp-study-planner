import { DBCalendarServices } from "../db/DBCalendarServices"
import {
  googleCalendarEventToAppCalendarEvent,
  appCalendarEventToGoogleCalendarEvent,
} from "./EventConvertor"
import { SREventsGenerator } from "./SREventsGenerator"

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

    await DBCalendarServices.loadAllEvents(appCalendarEvents)
    await this.panelsUpdater.run()

    this.setAppCalendarEvents(appCalendarEvents)
  }

  async addEvent(appEvent) {
    const appEvents = SREventsGenerator.generate(appEvent)
    const addedAppEvents = []

    for (let i = 0; i < appEvents.length; i++) {
      const addedAppEvent = await this.addGoogleCalendarEvent(appEvents[i])
      addedAppEvents.push(addedAppEvent)
    }

    return addedAppEvents
  }

  async addGoogleCalendarEvent(appEvent) {
    const googleCalendarEvent = appCalendarEventToGoogleCalendarEvent(appEvent)

    console.log(googleCalendarEvent, "googleCalendarEvent")

    const googleCalendarEventAdded =
      await this.googleCalendarAPIInstance.addEvent(googleCalendarEvent)

    console.log(googleCalendarEventAdded, "googleCalendarEventAdded")

    const appCalendarEventAdded = googleCalendarEventToAppCalendarEvent(
      googleCalendarEventAdded
    )

    await DBCalendarServices.addEvent(appCalendarEventAdded)
    await this.panelsUpdater.run()

    return appCalendarEventAdded
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

    const appCalendarEventUpdated = googleCalendarEventToAppCalendarEvent(
      googleCalendarEventUpdated
    )

    await DBCalendarServices.updateEvent(appCalendarEventUpdated)
    await this.panelsUpdater.run()

    return appCalendarEventUpdated
  }

  async deleteGoogleCalendarEvent(googleCalendarEventId) {
    await this.googleCalendarAPIInstance.deleteEvent(googleCalendarEventId)

    await DBCalendarServices.deleteEvent(googleCalendarEventId)
    await this.panelsUpdater.run()
  }
}
