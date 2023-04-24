import DBDexie from "./IDB/DBDexie"

export class DBSingleton {
  static dbInstance = null

  static getInstance() {
    if (this.dbInstance === null) this.dbInstance = initialiseDBInstance()

    return this.dbInstance
  }

  static end() {
    this.dbInstance = null
  }
}

function initialiseDBInstance() {
  // return DUMMY_DB_INSTANCE
  return new DBDexie()
}

const DUMMY_DB_INSTANCE = {
  store: [],

  load: function (eList) {
    this.store = [...eList]
  },

  add: function (e) {
    this.store.push(e)
  },

  get: function (tagsList = []) {
    if (tagsList.length === 0) return [...this.store]

    return this.store.filter((e) => {
      for (let _i = 0; _i < tagsList.length; _i++) {
        if (e?.properties?.tags?.includes(tagsList[_i])) {
          return true
        }
      }

      return false
    })
  },

  update: function (e) {
    const idx = this.store.findIndex((x) => x.id === e.id)
    this.store[idx] = e
  },

  delete: function (id) {
    this.store = this.store.filter((x) => x.id !== id)
  },

  getTags: function () {
    const tagSet = new Set()
    this.store.forEach((e) => {
      e?.properties?.tags?.forEach((tag) => {
        tagSet.add(tag)
      })
    })

    return Array.from(tagSet)
  },
}
