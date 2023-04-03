import { AbstractSinglePanelUpdateService } from "./AbstractSinglePanelUpdateService"
import { filterBacklogEvents } from "../../util/filterEvents"

export class BacklogPanelUpdateService extends AbstractSinglePanelUpdateService {
  filterLogic(allEvents = []) {
    return filterBacklogEvents(allEvents)
  }
}
