import React from "react"
import SessionAdd from "./SessionAdd"
import SessionRunning from "./SessionRunning"

export default function SessionPopup() {
  return (
    <div className="session-add-running-bg">
      <SessionAdd />
      <SessionRunning />
    </div>
  )
}
