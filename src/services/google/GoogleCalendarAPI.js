import axios from "axios"
import { GoogleAuthorizationHeaders } from "./utils/GoogleAuthorizationHeaders"

const GOOGLE_APIS_CALENDAR = "https://www.googleapis.com/calendar/v3/"

export class GoogleCalendarAPI {
  _googleAuthorizationHeaders = null

  _googleCalendarId = 0
  setGoogleCalendarId = (calId) => {
    this._googleCalendarId = calId
  }

  calendarSummary = "CP-Study-Planner"

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
}
