import { AbstractSinglePanelUpdateService } from "./AbstractSinglePanelUpdateService"

export class TodayPanelUpdateService extends AbstractSinglePanelUpdateService {
  filterLogic(allEvents = []) {
    const todayDate = new Date(new Date().setHours(0, 0, 0, 0))
    const tomorroDate = new Date(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)
    )
    const todayEvents = allEvents.filter((event) => {
      const eventDateTime = new Date(event.start)
      return todayDate <= eventDateTime && eventDateTime < tomorroDate
    })

    console.log("Filtering for today panel", todayEvents)

    return todayEvents
  }
}
