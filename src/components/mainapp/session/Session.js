import React from "react"
import SessionPopup from "./SessionPopup"
import SessionTile from "./SessionTile"
import Timer from "../../../services/timer/Timer"
import { LoaderContext } from "../../../context/LoaderContext"
import { SessionEventService } from "../../../services/session/SessionEventService"

export default function Session(props) {
  const [curSession, setCurSession] = React.useState(null)
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)
  const [timer, setTimer] = React.useState(null)
  const loader = React.useContext(LoaderContext)

  const sessionEventService = React.useMemo(() => {
    return new SessionEventService({
      calendarService: props.calendarService,
    })
  }, [props.calendarService])

  function closePopup() {
    setIsPopupOpen(false)
  }

  function showPopup() {
    setIsPopupOpen(true)
  }

  function clearCurSession() {
    loader.show()

    sessionEventService
      .addSessionEvent({ ...curSession }, props.appCalendarEvents)
      .then((res) => {
        console.log("return from sessioneventservice", res)

        res.events.forEach((event) => {
          props.appCalendarEventActions.add(structuredClone(event))
        })

        setCurSession(null)
        loader.hide()
      })
  }

  function startSession(session) {
    // console.log("START SESSION", session)
    setCurSession({
      ...session,
      elapsedTime: 0,
      finished: false,
      paused: false,
      phase: session.tData[0],
      start: new Date().toISOString(),
    })

    const timerRef = new Timer(session.targetTime)
    timerRef.addTickEvent((ctx) => {
      // console.log(ctx, " timer ticking")

      setCurSession((prev) => {
        return { ...prev, elapsedTime: ctx.elapsed }
      })

      setCurSession((prev) => {
        if (prev.tData[ctx.elapsed])
          return { ...prev, phase: prev.tData[ctx.elapsed] }
        return { ...prev }
      })
    })

    timerRef.addOnStopEvent((ctx) => {
      // console.log(ctx, " FINISHED")

      setCurSession((prev) => {
        return {
          ...prev,
          elapsedTime: ctx.elapsed,
          finished: true,
          end: new Date().toISOString(),
        }
      })

      setTimer(null)
    })

    timerRef.start()

    setTimer(timerRef)
  }

  function pauseSession() {
    timer.pause()
    setCurSession((prevSession) => {
      return { ...prevSession, paused: true }
    })
  }

  function resumeSession() {
    timer.start()
    setCurSession((prevSession) => {
      return { ...prevSession, paused: false }
    })
  }

  function toggleSessionEventDone(evId) {
    setCurSession((prevCurSession) => {
      // const deepCopiedCurSession = JSON.parse(JSON.stringify(prevCurSession))
      const deepCopiedCurSession = structuredClone(prevCurSession)
      deepCopiedCurSession.events.forEach((ev) => {
        if (ev.id === evId) {
          ev.done = !ev.done
        }
      })

      return deepCopiedCurSession
    })
  }

  return (
    <div className="session-div">
      <SessionTile showPopup={showPopup} curSession={curSession} />

      {isPopupOpen && (
        <SessionPopup
          appCalendarEvents={props.appCalendarEvents}
          closePopup={closePopup}
          curSession={curSession}
          startSession={startSession}
          clearCurSession={clearCurSession}
          pauseSession={pauseSession}
          resumeSession={resumeSession}
          toggleSessionEventDone={toggleSessionEventDone}
        />
      )}
    </div>
  )
}
