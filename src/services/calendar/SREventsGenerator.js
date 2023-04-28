import { markEventSr } from "../../util/filterEvents"

export const SREventsGenerator = {
  generate: function (appEvent) {
    if (!appEvent.formSR) return [appEvent]

    const schemeList = appEvent.formSR.scheme
    const schemeArr = schemeList.split(",").map((val) => parseInt(val))

    const srId = new Date().getTime().toString()

    const { formSR, ...firstAppEvent } = appEvent
    firstAppEvent.properties.sr = {
      scheme: schemeList,
      id: srId,
      schemeDay: schemeArr[0],
      day: 1,
    }

    const appEventsList = [firstAppEvent]

    for (let i = 1; i < schemeArr.length; i++) {
      const daysDiff = schemeArr[i] - schemeArr[0]
      const nAppEvent = structuredClone(firstAppEvent)
      nAppEvent.start = this._addDays(firstAppEvent.start, daysDiff)
      nAppEvent.end = this._addDays(firstAppEvent.end, daysDiff)
      nAppEvent.properties.sr.schemeDay = schemeArr[i]
      nAppEvent.properties.sr.day = i + 1

      appEventsList.push(nAppEvent)
    }

    // Add is-sr tags
    appEventsList.forEach((appEvent) => markEventSr(appEvent))

    return appEventsList
  },

  _addDays: function (dateTime, daysDiff) {
    const origSplitted = dateTime.split("T")
    const dateStr = origSplitted[0]
    const dateAfterAdd = new Date(
      new Date(dateStr).getTime() + daysDiff * 24 * 60 * 60 * 1000
    )
    const dateStrAfterAdd = dateAfterAdd.toISOString().split("T")[0]

    return dateStrAfterAdd + "T" + origSplitted[1]
  },
}
