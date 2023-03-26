import axios from "axios"
const GOOGLE_APIS_CALENDAR = "https://www.googleapis.com/calendar/v3/"

export class GoogleCalendarAPI {
  _userAccessToken = null

  _googleCalendarId = 0
  setGoogleCalendarId = (calId) => {
    this._googleCalendarId = calId
  }

  calendarSummary = "CP-Study-Planner"

  constructor(userAccessToken) {
    this._userAccessToken = userAccessToken
  }

  _headers = () => {
    return {
      Authorization: `Bearer ${this._userAccessToken}`,
      Accept: "application/json",
    }
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
