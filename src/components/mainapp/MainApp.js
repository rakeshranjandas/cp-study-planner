import React from "react"
import Logout from "./logout/Logout"
import Calendar from "./calendar/Calendar"
import TodayEventsPanel from "./panel/TodayEventsPanel"
import BacklogEventsPanel from "./panel/BacklogEventsPanel"
import { AllPanelsUpdateService } from "../../services/panelupdate/AllPanelsUpdateService"
import { TodayPanelUpdateService } from "../../services/panelupdate/TodayPanelUpdateService"
import { BacklogPanelUpdateService } from "../../services/panelupdate/BacklogPanelUpdateService"
import FilterByTags from "./filter/FilterByTags"
import Session from "./session/Session"
import { UserContext } from "../../context/UserContext"
import { CalendarService } from "../../services/calendar/CalendarService"
import { GoogleCalendarAPI } from "../../services/google/GoogleCalendarAPI"

export default function MainApp() {
  const [appCalendarEvents, setAppCalendarEvents] = React.useState([])
  const [todayEvents, setTodayEvents] = React.useState([])
  const [backlogEvents, setBacklogEvents] = React.useState([])

  const appCalendarEventActions = React.useMemo(() => {
    return {
      add: (newEvent) => {
        setAppCalendarEvents((prevAppEventsList) => {
          const copyAppEventsList = structuredClone(prevAppEventsList)

          const foundIndex = prevAppEventsList.findIndex(
            (appEvent) => appEvent.id === newEvent.id
          )

          if (foundIndex === -1) copyAppEventsList.push(newEvent)
          else copyAppEventsList[foundIndex] = newEvent

          return copyAppEventsList
        })
      },

      delete: (eventId) => {
        setAppCalendarEvents((prevAppEventsList) => {
          return prevAppEventsList.filter((appEvent) => appEvent.id !== eventId)
        })
      },
    }
  }, [setAppCalendarEvents])

  const panelsUpdater = React.useMemo(() => {
    return new AllPanelsUpdateService([
      new TodayPanelUpdateService(setTodayEvents),
      new BacklogPanelUpdateService(setBacklogEvents),
    ])
  }, [])

  const user = React.useContext(UserContext)
  const calendarService = React.useMemo(
    () =>
      new CalendarService({
        panelsUpdater: panelsUpdater,
        googleCalendarAPIInstance: new GoogleCalendarAPI(),
        setAppCalendarEvents: setAppCalendarEvents,
      }),
    [panelsUpdater, setAppCalendarEvents]
  )

  React.useEffect(() => {
    const panelUpdaterInterval = setInterval(() => {
      panelsUpdater.run()
    }, 1000 * 60 * 5)

    return () => clearInterval(panelUpdaterInterval)
  }, [])

  return (
    <div className="grid-container">
      <div className="grid-item item-logout">
        <Logout />
      </div>

      <div className="grid-item item-calendar">
        <Calendar
          appCalendarEvents={appCalendarEvents}
          appCalendarEventActions={appCalendarEventActions}
          setAppCalendarEvents={setAppCalendarEvents}
          calendarService={calendarService}
        />
      </div>

      <div className="grid-item item-session">
        <Session
          appCalendarEvents={appCalendarEvents}
          appCalendarEventActions={appCalendarEventActions}
          setAppCalendarEvents={setAppCalendarEvents}
          calendarService={calendarService}
        />
      </div>
      <div className="grid-item item-search">
        <FilterByTags setAppCalendarEvents={setAppCalendarEvents} />
      </div>

      <div className="grid-item item-today-panel">
        <TodayEventsPanel events={todayEvents} />
      </div>
      <div className="grid-item item-backlog-panel">
        <BacklogEventsPanel events={backlogEvents} />
      </div>
    </div>
  )
}
