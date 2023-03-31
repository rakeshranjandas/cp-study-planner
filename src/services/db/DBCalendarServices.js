import { DBSingleton } from "./DBSingleton"

export const DBCalendarServices = {
  addEvent: (e) => {
    DBSingleton.getInstance().add(e)
  },

  getAllEvents: () => {
    return DBSingleton.getInstance().get()
  },

  loadAllEvents: (allEvents = []) => {
    DBSingleton.getInstance().load(allEvents)
  },

  addEvent: (newEvent) => {
    DBSingleton.getInstance().add(newEvent)
  },

  updateEvent: (updatedEvent) => {
    DBSingleton.getInstance().update(updatedEvent)
  },

  deleteEvent: (id) => {
    DBSingleton.getInstance().delete(id)
  },

  getAllTags: () => {
    const allTags = DBSingleton.getInstance().getTags()
    allTags.push("done")

    return allTags
  },
}
