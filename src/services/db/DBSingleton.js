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

  add: function (e) {
    console.log("db Instance ADD ", e)
    this.store.push(e)
  },

  get: function (e) {
    console.log("db Instance GET ", e)
    return [...this.store]
  },

  load: function (eList) {
    this.store = [...eList]
  },
}
