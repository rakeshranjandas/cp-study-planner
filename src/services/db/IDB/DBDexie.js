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
    await this._db.events.clear().then(() => {
      eList.forEach((e) => this._db.events.add({ ...e }))
    })
  }

  async add(e) {
    await this._db.events.add({ ...e })
  }

  async get(tagsList = []) {
    if (tagsList.length === 0) return this._db.events.toArray()

    let filteredEvents = []

    await this._db.events
      .where("properties.tags")
      .anyOf(tagsList)
      .each((event) => {
        filteredEvents.push(event)
      })

    return filteredEvents
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

  async deleteDB() {
    console.log("deleteDB")
    await this._db.delete()
  }

  close() {
    this._db.close()
    this._db = null
  }
}
