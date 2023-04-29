export class AbstractSinglePanelUpdateService {
  callback = null

  constructor(callback) {
    this.callback = callback
  }

  run(allEvents) {
    const filteredEvents = this.filterLogic(allEvents)

    this.callback?.(filteredEvents)
  }

  // Override "filterLogic" and add custom filter in the child class
  filterLogic(allEvents) {
    return allEvents
  }
}
