export const LoggedUserLocalStorage = {
  _key: "LOGGED_USER",

  destroy: function () {
    localStorage.removeItem(this._key)
  },

  save: function (user) {
    localStorage.setItem(this._key, JSON.stringify(user))
  },

  get: function () {
    const savedUserJson = localStorage.getItem(this._key)
    if (!savedUserJson) return null
    return JSON.parse(savedUserJson)
  },
}
