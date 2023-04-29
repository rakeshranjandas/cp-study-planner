export class AbstractSinglePanelUpdateService {
  setterFn = null
  callback = null

  constructor(setterFnPassed, callback) {
    this.setterFn = setterFnPassed
    this.callback = callback
  }

  run(allEvents) {
    const filteredEvents = this.filterLogic(allEvents)

    this.setterFn?.(filteredEvents)
    this.callback?.(filteredEvents)
  }

  // Override "filterLogic" and add custom filter in the child class
  filterLogic(allEvents) {
    return allEvents
  }
}
