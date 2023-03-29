import { AbstractSinglePanelUpdateService } from "./AbstractSinglePanelUpdateService"

export class BacklogPanelUpdateService extends AbstractSinglePanelUpdateService {
  filterLogic(allEvents = []) {
    const todayDate = new Date(new Date().setHours(0, 0, 0, 0))
    const backlogEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.start)
      return eventDate < todayDate
    })

    console.log("Filtering for backlog panel", backlogEvents)

    return backlogEvents
  }
}
