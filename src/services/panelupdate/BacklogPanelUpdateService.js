import { AbstractSinglePanelUpdateService } from "./AbstractSinglePanelUpdateService"

export class BacklogPanelUpdateService extends AbstractSinglePanelUpdateService {
  filterLogic(allEvents = []) {
    const todayDate = new Date(new Date().setHours(0, 0, 0, 0))
    const backlogEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.start)
      return eventDate < todayDate && !event.properties.tags.includes("done")
    })

    console.log("Filtering for backlog panel", backlogEvents)

    backlogEvents.sort(
      (e1, e2) => new Date(e1.start).getTime() - new Date(e2.start).getTime()
    )

    return backlogEvents
  }
}
