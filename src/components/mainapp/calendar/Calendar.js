import { useMachine } from "@xstate/react"
import React from "react"
import { UserContext } from "../../../context/UserContext"
import AppCalendar from "./AppCalendar"
import CalendarLoader from "./CalendarLoader"
import { calendarMachine } from "./calendarMachine"
import { GoogleCalendarAPI } from "./GoogleCalendarAPI"

export default function Calendar() {
  const user = React.useContext(UserContext)

  const [state, send] = useMachine(calendarMachine, {
    context: {
      googleCalendarApi: new GoogleCalendarAPI(user.user.access_token),
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
