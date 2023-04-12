import { GoogleAuthorizationLocalStorage } from "./GoogleAuthorizationLocalStorage"

export const GoogleAuthorizationHeaders = {
  getBearerToken: function () {
    return GoogleAuthorizationLocalStorage.getAccessToken()
  },

  getHeaders: function () {
    const bearerToken = this.getBearerToken()

    return {
      Authorization: `Bearer ${bearerToken}`,
      Accept: "application/json",
    }
  },
}
