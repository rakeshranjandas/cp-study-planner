import React from "react"
import Logout from "./logout/Logout"

export default function MainApp() {
  return (
    <div className="grid-container">
      <div className="grid-item item-logout">
        <Logout />
      </div>

      <div className="grid-item item-session">Session 5</div>
      <div className="grid-item item-search">Search 6</div>
      <div className="grid-item item-calendar">Calendar 2</div>
      <div className="grid-item item-today-panel">Today 3</div>
      <div className="grid-item item-backlog-panel">Backlog 4</div>
    </div>
  )
}
