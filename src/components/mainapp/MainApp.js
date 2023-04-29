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
import { CalendarService } from "../../services/calendar/CalendarService"
import { GoogleCalendarAPI } from "../../services/google/GoogleCalendarAPI"
import { useMachine } from "@xstate/react"
import { calendarMachine } from "./calendar/calendarMachine"
import LoadingImage from "../../assets/images/loading-calendar.gif"
import { isEventAnSR } from "../../util/filterEvents"

export default function MainApp() {
  const [loaded, setLoaded] = React.useState(false)
  const [appCalendarEvents, setAppCalendarEvents] = React.useState([])
  const [todayEvents, setTodayEvents] = React.useState([])
  const [backlogEvents, setBacklogEvents] = React.useState([])
  const [srBacklogs, setSrBacklogs] = React.useState([])

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

  const updateSrBacklog = (backlogEventsPassed) => {
    const srBacklogIdSet = new Set()

    backlogEventsPassed.forEach((backlogEvent) => {
      if (isEventAnSR(backlogEvent))
        srBacklogIdSet.add(backlogEvent.properties.sr.id)
    })

    const srBacklogIdArr = Array.from(srBacklogIdSet)
    setSrBacklogs(srBacklogIdArr)
  }

  const panelsUpdater = React.useMemo(() => {
    return new AllPanelsUpdateService([
      new TodayPanelUpdateService(setTodayEvents),
      new BacklogPanelUpdateService(setBacklogEvents, updateSrBacklog),
    ])
  }, [])

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
    if (!loaded) return
    const panelUpdaterInterval = setInterval(() => {
      panelsUpdater.run()
    }, 1000 * 60 * 5)

    return () => clearInterval(panelUpdaterInterval)
  }, [])

  React.useEffect(() => {}, [backlogEvents])

  const [state, send] = useMachine(calendarMachine, {
    context: {
      calendarService: calendarService,
    },

    services: {
      listGoogleCalendars: async (context) =>
        context.calendarService.listGoogleCalendars(),

      checkIfGoogleCalendarPresent: async (context, event) => {
        return context.calendarService.findAndSetGoogleCalendarId(event.data)
      },

      getGoogleCalendarEvents: async (context) => {
        return context.calendarService.getGoogleCalendarEvents()
      },

      createGoogleCalendar: async (context) => {
        await context.calendarService.createGoogleCalendar()
      },

      loadAppCalendarEvents: async (context) => {
        await context.calendarService.loadEvents()
        setLoaded(true)
      },
    },
  })

  return (
    <>
      {loaded ? (
        <div className="grid-container">
          <div className="grid-item item-logout">
            <Logout srBacklogs={srBacklogs} />
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
      ) : (
        <div className="loading-events-div">
          Loading calendar events
          <img src={LoadingImage} />
        </div>
      )}
    </>
  )
}
