import React from "react"
import SessionAdd from "./SessionAdd"
import SessionRunning from "./SessionRunning"

export default function SessionPopup(props) {
  return (
    <div className="popup-bg">
      <div className="popup-content session-popup-main">
        {!props.curSession ? (
          <SessionAdd
            startSession={props.startSession}
            closePopup={props.closePopup}
          />
        ) : (
          <SessionRunning
            curSession={props.curSession}
            pauseSession={props.pauseSession}
            resumeSession={props.resumeSession}
            clearCurSession={props.clearCurSession}
            closePopup={props.closePopup}
          />
        )}
      </div>
    </div>
  )
}
