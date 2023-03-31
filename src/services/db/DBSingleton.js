export class DBSingleton {
  static dbInstance = null

  static getInstance() {
    if (this.dbInstance === null) this.dbInstance = initialiseDBInstance()

    return this.dbInstance
  }
}

function initialiseDBInstance() {
  return DUMMY_DB_INSTANCE
}

const DUMMY_DB_INSTANCE = {
  store: [],

  load: function (eList) {
    this.store = [...eList]
  },

  add: function (e) {
    this.store.push(e)
  },

  get: function (e) {
    return [...this.store]
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

    tagSet.add("done")

    return Array.from(tagSet)
  },
}
