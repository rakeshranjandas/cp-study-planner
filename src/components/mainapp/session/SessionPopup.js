import React from "react"
import SessionAdd from "./SessionAdd"
import SessionRunning from "./SessionRunning"

export default function SessionPopup(props) {
  return (
    <div className="session-popup-bg">
      <div className="session-popup-main">
        <span
          className="session-popup-close"
          onClick={() => props.closePopup(false)}
        >
          X
        </span>
        <SessionAdd />
        <SessionRunning />
      </div>
    </div>
  )
}
