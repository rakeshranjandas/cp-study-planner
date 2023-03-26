export class AllPanelsUpdateService {
  singlePanelUpdateServices = []

  constructor(listOfSinglePanelUpdateService) {
    this.singlePanelUpdateServices = listOfSinglePanelUpdateService
  }

  run() {
    this.singlePanelUpdateServices.forEach((singlePanelUpdateService) => {
      singlePanelUpdateService.run()
    })
  }
}
