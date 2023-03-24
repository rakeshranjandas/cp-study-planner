import React from "react"
import { ProfileContext } from "../../context/ProfileContext"

export default function MainApp() {
  const profile = React.useContext(ProfileContext)
  console.log(profile)
  return (
    <div className="grid-container">
      <div className="grid-item item-logout">Logout</div>
      <div className="grid-item item-session">Session</div>
      <div className="grid-item item-search">Search</div>
      <div className="grid-item item-calendar">Calendar</div>
      <div className="grid-item item-today-panel">Today</div>
      <div className="grid-item item-backlog-panel">Backlog</div>
    </div>
  )
}
