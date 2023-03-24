import axios from "axios"
const GOOGLE_APIS_CALENDAR = "https://www.googleapis.com/calendar/v3/"

export class GoogleCalendarAPI {
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

  listCalendars = async () => {
    return this._get("users/me/calendarList")
  }
}
