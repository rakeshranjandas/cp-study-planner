import React from "react"

export default function SessionRunning(props) {
  return (
    <div>
      <h2>{!props.curSession.finished ? "Ongoing" : "Finished"} session</h2>
      <p>
        <span>{props.curSession.elapsedTime}</span>/
        <span>{props.curSession.targetTime}</span>
      </p>

      <p>
        {props.curSession.finished ? (
          <>
            <button onClick={() => props.clearCurSession()}>Clear</button>
            <button
              onClick={() => {
                props.closePopup()
                props.clearCurSession()
              }}
            >
              Exit
            </button>
          </>
        ) : (
          <>
            {!props.curSession.paused ? (
              <button
                onClick={() => {
                  props.pauseSession()
                }}
              >
                Pause
              </button>
            ) : (
              <button
                onClick={() => {
                  props.resumeSession()
                }}
              >
                Resume
              </button>
            )}
          </>
        )}
      </p>
    </div>
  )
}
