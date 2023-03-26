import { AbstractSinglePanelUpdateService } from "./AbstractSinglePanelUpdateService"

export class TodayPanelUpdateService extends AbstractSinglePanelUpdateService {
  filterLogic(allEvents = []) {
    const todayEvents = allEvents.filter((event) => event.id < 10)

    console.log("Filtering for today panel", allEvents, todayEvents)

    return todayEvents
  }
}
