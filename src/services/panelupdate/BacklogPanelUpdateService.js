import { AbstractSinglePanelUpdateService } from "./AbstractSinglePanelUpdateService"

export class BacklogPanelUpdateService extends AbstractSinglePanelUpdateService {
  filterLogic(allEvents) {
    return allEvents.filter((event) => event.id < 5)
  }
}
