import { DBCalendarServices } from "../db/DBCalendarServices"

export class AllPanelsUpdateService {
  singlePanelUpdateServices = []

  constructor(listOfSinglePanelUpdateService) {
    this.singlePanelUpdateServices = listOfSinglePanelUpdateService
  }

  async run() {
    const allEvents = await DBCalendarServices.getAllEventsTodayAndPast()

    this.singlePanelUpdateServices.forEach((singlePanelUpdateService) => {
      singlePanelUpdateService.run(allEvents)
    })
  }
}
