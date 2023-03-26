import { AbstractSinglePanelUpdateService } from "./AbstractSinglePanelUpdateService"

export class BacklogPanelUpdateService extends AbstractSinglePanelUpdateService {
  filterLogic(allEvents = []) {
    const backlogEvents = allEvents.filter((event) => event.id < 5)

    console.log("Filtering for backlog panel", allEvents, backlogEvents)

    return backlogEvents
  }
}
