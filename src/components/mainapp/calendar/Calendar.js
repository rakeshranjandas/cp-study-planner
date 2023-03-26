import { useMachine } from "@xstate/react"
import React from "react"
import { UserContext } from "../../../context/UserContext"
import AppCalendar from "./AppCalendar"
import CalendarLoader from "./CalendarLoader"
import { calendarMachine } from "./calendarMachine"
import { GoogleCalendarAPI } from "../../../services/google/GoogleCalendarAPI"
import { CalendarService } from "../../../services/calendar/CalendarService"

export default function Calendar(props) {
  const user = React.useContext(UserContext)

  const calendarService = React.useMemo(
    () =>
      new CalendarService({
        panelsUpdater: props.panelsUpdater,
        googleCalendarAPIInstance: new GoogleCalendarAPI(
          user.user.access_token
        ),
        setAppCalendarEvents: props.setAppCalendarEvents,
      }),
    []
  )

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
      },
    },
  })

  return (
    <>
      {state.matches("ViewAppCalendar.Show") ? (
        <AppCalendar />
      ) : (
        <CalendarLoader />
      )}
    </>
  )
}
