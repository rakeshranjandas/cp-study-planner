import React from "react"
import SessionPopup from "./SessionPopup"
import SessionTile from "./SessionTile"
import Timer from "../../../services/timer/Timer"

export default function Session() {
  const [curSession, setCurSession] = React.useState(null)
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)
  const [timer, setTimer] = React.useState(null)

  function closePopup() {
    setIsPopupOpen(false)
  }

  function showPopup() {
    setIsPopupOpen(true)
  }

  function clearCurSession() {
    setCurSession(null)
  }

  function startSession(session) {
    console.log("START SESSION", session)
    setCurSession({
      targetTime: session.targetTime,
      elapsedTime: 0,
      finished: false,
    })

    const timerRef = new Timer(session.targetTime)
    timerRef.addTickEvent((ctx) => {
      console.log(ctx, " timer ticking")

      setCurSession((prev) => {
        return { ...prev, elapsedTime: ctx.elapsed }
      })
    })

    timerRef.addOnStopEvent((ctx) => {
      console.log(ctx, " FINISHED")

      setCurSession((prev) => {
        return { ...prev, elapsedTime: ctx.elapsed, finished: true }
      })

      setTimer(null)
    })

    timerRef.start()

    setTimer(timerRef)
  }

  return (
    <div className="session-div">
      <SessionTile showPopup={showPopup} curSession={curSession} />

      {isPopupOpen && (
        <SessionPopup
          closePopup={closePopup}
          curSession={curSession}
          startSession={startSession}
          clearCurSession={clearCurSession}
        />
      )}
    </div>
  )
}
