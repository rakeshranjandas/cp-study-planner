import React from "react"

export default function SessionRunning(props) {
  function toHHMM(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds - 60 * minutes

    return ("0" + minutes).substr(-2) + ":" + ("0" + seconds).substr(-2)
  }

  return (
    <div>
      <div className="popup-header session-running-header-div">
        <h2>{!props.curSession.finished ? "Ongoing" : "Finished"} session</h2>
        <span className="popup-close" onClick={() => props.closePopup(false)}>
          X
        </span>
      </div>
      <div className="session-running-container-div">
        <div className="session-running-time-div">
          <span>
            {toHHMM(props.curSession.targetTime - props.curSession.elapsedTime)}
          </span>
        </div>

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
                  className="session-running-button-pause"
                  onClick={() => {
                    props.pauseSession()
                  }}
                >
                  Pause
                </button>
              ) : (
                <button
                  className="session-running-button-resume"
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
    </div>
  )
}
