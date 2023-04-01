import React from "react"

export default function SessionRunning(props) {
  return (
    <div>
      <h2>{!props.curSession.finished ? "Ongoing" : "Finished"} session</h2>
      <p>
        <span>{props.curSession.elapsedTime}</span>/
        <span>{props.curSession.targetTime}</span>
      </p>

      {props.curSession.finished && (
        <p>
          <button onClick={() => props.clearCurSession()}>Clear</button>
          <button
            onClick={() => {
              props.closePopup()
              props.clearCurSession()
            }}
          >
            Exit
          </button>
        </p>
      )}
    </div>
  )
}
