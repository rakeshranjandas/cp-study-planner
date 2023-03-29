import axios from "axios"
import { GoogleAuthorizationHeaders } from "./utils/GoogleAuthorizationHeaders"

const GOOGLE_APIS_CALENDAR = "https://www.googleapis.com/calendar/v3/"

export class GoogleCalendarAPI {
  _googleAuthorizationHeaders = null

  _calendarSummary = "CP-Study-Planner"
  _googleCalendarId = "CALENDAR-ID"

  findAndSetCalendarId(googleCalendars) {
    const found = googleCalendars.find(
      (cal) => cal.summary === this._calendarSummary
    )

    if (found === undefined) return false

    this._googleCalendarId = found.id

    return true
  }

  constructor(userAccessToken) {
    this._googleAuthorizationHeaders = new GoogleAuthorizationHeaders(
      userAccessToken
    )
  }

  _headers = () => {
    return this._googleAuthorizationHeaders.getHeaders()
  }

  _get = async (url) => {
    return axios.get(GOOGLE_APIS_CALENDAR + url, {
      headers: this._headers(),
    })
  }

  _post = async (url, body) => {
    return axios.post(GOOGLE_APIS_CALENDAR + url, body, {
      headers: this._headers(),
    })
  }

  _delete = async (url) => {
    return axios.delete(GOOGLE_APIS_CALENDAR + url, {
      headers: this._headers(),
    })
  }

  _put = async (url, body) => {
    return axios.put(GOOGLE_APIS_CALENDAR + url, body, {
      headers: this._headers(),
    })
  }

  listCalendars = async () => {
    const response = await this._get("users/me/calendarList")
    return response.data.items
  }

  createCalendar = async () => {
    this._post("calendars", {
      summary: this.calendarSummary,
    })
  }

  getEvents = async () => {
    const response = await this._get(
      `calendars/${this._googleCalendarId}/events`
    )

    return response.data.items
  }

  addEvent = async (googleCalendarEvent) => {
    const response = await this._post(
      `calendars/${this._googleCalendarId}/events`,
      googleCalendarEvent
    )

    return response.data
  }

  updateEvent = async (googleCalendarEvent, googleCalendarEventId) => {
    const response = await this._put(
      `calendars/${this._googleCalendarId}/events/${googleCalendarEventId}`,
      googleCalendarEvent
    )

    return response.data
  }

  deleteEvent = async (googleCalendarEventId) => {
    const response = await this._delete(
      `calendars/${this._googleCalendarId}/events/${googleCalendarEventId}`
    )

    return response
  }
}
