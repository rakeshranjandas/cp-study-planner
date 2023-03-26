import { DBCalendarServices } from "../db/DBCalendarServices"

export class AllPanelsUpdateService {
  singlePanelUpdateServices = []

  constructor(listOfSinglePanelUpdateService) {
    this.singlePanelUpdateServices = listOfSinglePanelUpdateService
  }

  run() {
    const allEvents = DBCalendarServices.getAllEvents()

    this.singlePanelUpdateServices.forEach((singlePanelUpdateService) => {
      singlePanelUpdateService.run(allEvents)
    })
  }
}
