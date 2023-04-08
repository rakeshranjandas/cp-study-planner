import { systemTags } from "../../util/systemTags"
import { DBSingleton } from "./DBSingleton"

export const DBCalendarServices = {
  addEvent: (e) => {
    DBSingleton.getInstance().add(e)
  },

  getAllEvents: (tagsList) => {
    return DBSingleton.getInstance().get(tagsList)
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
    const tagSet = DBSingleton.getInstance().getTags()

    systemTags.forEach((sTag) => tagSet.add(sTag))

    return Array.from(tagSet)
  },
}
