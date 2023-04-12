import axios from "axios"
import { GoogleAuthorizationHeaders } from "./utils/GoogleAuthorizationHeaders"
import { GoogleConstants } from "../../constants/GoogleConstants"

export const GoogleUserAPI = {
  getCalendarScope: function () {
    return "https://www.googleapis.com/auth/calendar"
  },

  getProfile: async function () {
    const userAccessToken = GoogleAuthorizationHeaders.getBearerToken()

    if (!userAccessToken) throw new Error("There is no access token.")

    const googleAuthHeaders = GoogleAuthorizationHeaders.getHeaders()

    return axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userAccessToken}`,
      {
        headers: googleAuthHeaders,
      }
    )
  },

  _getHeadersWWWFormUrlEncoded: function () {
    return {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  },

  getAccessTokenFromAuthCode: async function (authCode) {
    const params = new URLSearchParams()
    params.append("client_id", GoogleConstants.CLIENT_ID)
    params.append("client_secret", GoogleConstants.CLIENT_SECRET)
    params.append("code", authCode)
    params.append("grant_type", "authorization_code")
    params.append("redirect_uri", GoogleConstants.REDIRECT_URI)
    params.append("scope", this.getCalendarScope())

    return axios.post(
      "https://www.googleapis.com/oauth2/v4/token",
      params,
      this._getHeadersWWWFormUrlEncoded()
    )
  },

  revokeAccessToken: async function (accessToken) {
    const params = new URLSearchParams()
    params.append("token", accessToken)

    return axios.post(
      "https://oauth2.googleapis.com/revoke",
      params,
      this._getHeadersWWWFormUrlEncoded()
    )
  },
}
