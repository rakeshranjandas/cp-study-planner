import React from "react"
import { timeSecondsToHHMM } from "../../../util/timeConversions"

export default function SessionTile(props) {
  return (
    <div className="session-tile" onClick={() => props.showPopup()}>
      {!props.curSession ? (
        <AddNewSessionTile />
      ) : (
        <OngoingSessionTile curSession={props.curSession} />
      )}
    </div>
  )
}

function AddNewSessionTile() {
  return <div className="session-tile-div-add">Add New Session</div>
}

function OngoingSessionTile(props) {
  return (
    <div className="session-tile-div-ongoing">
      {props.curSession.label}
      <p>
        <span>
          {timeSecondsToHHMM(
            props.curSession.targetTime - props.curSession.elapsedTime
          )}
        </span>
        <span className="session-tile-ongoing-status">
          {props.curSession.finished
            ? "(FINISHED)"
            : props.curSession.paused
            ? "(PAUSED)"
            : ""}
        </span>
      </p>
    </div>
  )
}
