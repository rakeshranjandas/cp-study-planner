import React from "react"
import AppCalendar from "./AppCalendar"

export default function Calendar(props) {
  return (
    <>
      <AppCalendar
        appCalendarEvents={props.appCalendarEvents}
        appCalendarEventActions={props.appCalendarEventActions}
        setAppCalendarEvents={props.setAppCalendarEvents}
        calendarService={props.calendarService}
      />
      )
    </>
  )
}
