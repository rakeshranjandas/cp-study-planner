import { systemTags } from "../../util/systemTags"
import { DBSingleton } from "./DBSingleton"

export const DBCalendarServices = {
  addEvent: (e) => {
    DBSingleton.getInstance().add(e)
  },

  getAllEvents: async (tagsList) => {
    return DBSingleton.getInstance().get(tagsList)
  },

  loadAllEvents: async (allEvents = []) => {
    await DBSingleton.getInstance().load(allEvents)
  },

  addEvent: async (newEvent) => {
    await DBSingleton.getInstance().add(newEvent)
  },

  updateEvent: async (updatedEvent) => {
    await DBSingleton.getInstance().update(updatedEvent)
  },

  deleteEvent: async (id) => {
    DBSingleton.getInstance().delete(id)
  },

  getAllTags: async () => {
    return DBSingleton.getInstance().getTags()
  },

  deleteDB: async () => {
    await DBSingleton.getInstance().deleteDB()
    DBSingleton.getInstance().close()
    DBSingleton.end()
  },
}
