import { filterTodayEvents } from "../../util/filterEvents"
import { AbstractSinglePanelUpdateService } from "./AbstractSinglePanelUpdateService"

export class TodayPanelUpdateService extends AbstractSinglePanelUpdateService {
  filterLogic(allEvents = []) {
    return filterTodayEvents(allEvents)
  }
}
