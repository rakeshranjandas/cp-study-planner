export class AbstractSinglePanelUpdateService {
  setterFn = null

  constructor(setterFnPassed) {
    this.setterFn = setterFnPassed
  }

  run(allEvents) {
    const filteredEvents = this.filterLogic(allEvents)

    this.setterFn && this.setterFn(filteredEvents)
  }

  filterLogic(allEvents) {
    return allEvents
  }
}
