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
    const tagsArr = await DBSingleton.getInstance().getTags()

    const tagSet = new Set(tagsArr)

    systemTags.forEach((sTag) => tagSet.add(sTag))

    return Array.from(tagSet)
  },

  deleteDB: async () => {
    await DBSingleton.getInstance().deleteDB()
  },
}
