import { useMachine } from "@xstate/react"
import React from "react"
import { UserContext } from "../../../context/UserContext"
import { calendarMachine } from "./calendarMachine"
import { GoogleCalendarAPI } from "./GoogleCalendarAPI"

export default function Calendar() {
  const user = React.useContext(UserContext)

  const [state, send] = useMachine(calendarMachine, {
    context: {
      googleCalendarApi: new GoogleCalendarAPI(user.user.access_token),
    },
  })
  return <div>Calendar</div>
}
