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

export default function MainApp() {
  const [appCalendarEvents, setAppCalendarEvents] = React.useState([])
  const [todayEvents, setTodayEvents] = React.useState([])
  const [backlogEvents, setBacklogEvents] = React.useState([])

  const panelsUpdater = React.useMemo(() => {
    return new AllPanelsUpdateService([
      new TodayPanelUpdateService(setTodayEvents),
      new BacklogPanelUpdateService(setBacklogEvents),
    ])
  }, [])

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
          setAppCalendarEvents={setAppCalendarEvents}
          panelsUpdater={panelsUpdater}
        />
      </div>

      <div className="grid-item item-session">
        <Session />
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
