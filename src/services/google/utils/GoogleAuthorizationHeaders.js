export class GoogleAuthorizationHeaders {
  _bearer_token = null

  constructor(userAccessToken) {
    this._bearer_token = userAccessToken
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this._bearer_token}`,
      Accept: "application/json",
    }
  }
}
