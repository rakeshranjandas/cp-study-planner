import axios from "axios"
import { GoogleAuthorizationHeaders } from "./utils/GoogleAuthorizationHeaders"

export const GoogleUserAPI = {
  getCalendarScope: () => {
    return "https://www.googleapis.com/auth/calendar"
  },

  getProfile: (userAccessToken, successFn, errorFn) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userAccessToken}`,
        {
          headers: new GoogleAuthorizationHeaders(userAccessToken).getHeaders(),
        }
      )
      .then((res) => {
        successFn && successFn(res.data)
      })
      .catch((err) => {
        errorFn && errorFn(err)
      })
  },
}
