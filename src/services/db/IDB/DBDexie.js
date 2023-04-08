import Dexie from "dexie"

export default class DBDexie {
  _db = null

  constructor() {
    this._db = new Dexie("cp-study-planner")
    this._db.version(2).stores({
      events: "id,*properties.tags",
    })
  }

  async load(eList) {
    this._db.events.clear().then(() => {
      eList.forEach((e) => this._db.events.add({ ...e }))
    })
  }

  async add(e) {
    await this._db.events.add({ ...e })
  }

  async get(tagsList) {
    return this._db.events.toArray()
  }

  async update(e) {
    await this._db.events.put(e)
  }

  async delete(id) {
    await this._db.events.delete(id)
  }

  async getTags() {
    let tags = []
    await this._db.events.orderBy("properties.tags").keys((keysArr) => {
      tags = [...keysArr]
    })

    return tags
  }
}
