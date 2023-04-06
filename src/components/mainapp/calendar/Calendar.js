import { useMachine } from "@xstate/react"
import React from "react"
import AppCalendar from "./AppCalendar"
import CalendarLoader from "./CalendarLoader"
import { calendarMachine } from "./calendarMachine"

export default function Calendar(props) {
  const [state, send] = useMachine(calendarMachine, {
    context: {
      calendarService: props.calendarService,
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
        <AppCalendar
          appCalendarEvents={props.appCalendarEvents}
          appCalendarEventActions={props.appCalendarEventActions}
          setAppCalendarEvents={props.setAppCalendarEvents}
          calendarService={props.calendarService}
        />
      ) : (
        <CalendarLoader />
      )}
    </>
  )
}
