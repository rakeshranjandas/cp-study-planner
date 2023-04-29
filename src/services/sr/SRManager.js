export default class SRManager {
  calendarService = null

  constructor(calendarService) {
    this.calendarService = calendarService
  }

  postpone(srEventsPostponed) {
    srEventsPostponed.forEach((srEvent) =>
      this.calendarService.updateGoogleCalendarEvent(srEvent)
    )
  }
}
