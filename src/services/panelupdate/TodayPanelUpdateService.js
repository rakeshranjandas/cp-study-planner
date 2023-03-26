import { AbstractSinglePanelUpdateService } from "./AbstractSinglePanelUpdateService"

export class TodayPanelUpdateService extends AbstractSinglePanelUpdateService {
  filterLogic(allEvents) {
    return allEvents.filter((event) => event.id < 10)
  }
}
