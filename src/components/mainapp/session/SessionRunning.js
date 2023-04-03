import React from "react"
import { timeSecondsToHHMM } from "../../../util/timeConversions"

export default function SessionRunning(props) {
  return (
    <div>
      <div className="popup-header session-running-header-div">
        {/* <h2>{!props.curSession.finished ? "Ongoing" : "Finished"} session</h2> */}
        <h2>
          {props.curSession.label}
          <span className="session-running-header-status">
            {props.curSession.finished
              ? "(FINISHED)"
              : props.curSession.paused
              ? "(PAUSED)"
              : ""}
          </span>
        </h2>
        <span className="popup-close" onClick={() => props.closePopup(false)}>
          X
        </span>
      </div>
      <div className="session-running-container-div">
        <div className="session-running-time-div">
          <span>
            {timeSecondsToHHMM(
              props.curSession.targetTime - props.curSession.elapsedTime
            )}
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

        <div>
          {props.curSession.events.map((ev) => (
            <p
              onClick={() => props.toggleSessionEventDone(ev.id)}
              style={{
                backgroundColor: ev.done ? "green" : "red",
                color: ev.done ? "black" : "white",
              }}
            >
              {props.appCalendarEvents.find((ae) => ae.id === ev.id).title}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
