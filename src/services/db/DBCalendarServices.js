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
}
