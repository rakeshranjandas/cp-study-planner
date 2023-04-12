export const GoogleAuthorizationLocalStorage = {
  _accessTokenKey: "GOOGLE_ACCESS_TOKEN",
  _refreshTokenKey: "GOOGLE_REFRESH_TOKEN",

  saveAccessToken: function (accessToken) {
    localStorage.setItem(this._accessTokenKey, accessToken)
  },

  getAccessToken: function () {
    return localStorage.getItem(this._accessTokenKey)
  },

  saveRefreshToken: function (refreshToken) {
    localStorage.setItem(this._refreshTokenKey, refreshToken)
  },

  getRefreshToken: function () {
    return localStorage.getItem(this._refreshTokenKey)
  },

  removeTokens: function () {
    localStorage.removeItem(this._accessTokenKey)
    localStorage.removeItem(this._refreshTokenKey)
  },
}
