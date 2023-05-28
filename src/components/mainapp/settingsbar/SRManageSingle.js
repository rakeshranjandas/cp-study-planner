import React from "react"
import { isEventDone } from "../../../util/filterEvents"

export default function SRManageSingle(props) {
  console.log(props.data)

  const data = props.data
  const toPostponeEvent = data.events.find((e) => {
    return !isEventDone(e)
  })

  const dateTimeInputRef = React.useRef(null)
  const [newTimeData, setNewTimeData] = React.useState({})

  function updateTimes(event, newTime) {
    const newTimeDataObj = {}
    const diffDays = 0

    for (let i = 0; i < data.events.length; i++) {}

    newTimeDataObj[event.id] = "xHelalsedas"

    setNewTimeData(newTimeDataObj)
  }

  function clearTimes() {
    setNewTimeData({})
    dateTimeInputRef.current.value = ""
  }

  const [done, setDone] = React.useState(false)

  return (
    <div className={"sr-manage-single-sr " + (done ? "sr-manage-done" : "")}>
      {props.data.events
        .sort(
          (e1, e2) =>
            new Date(e1.start).getTime() - new Date(e2.start).getTime()
        )
        .map((e) => {
          return (
            <div className="sr-manage-single-event">
              <div>
                <span>
                  <b>{e.title}</b>
                </span>{" "}
                | {new Date(e.start).toLocaleString()} -{" "}
                {new Date(e.end).toLocaleString()}
              </div>

              {!done && e.id === toPostponeEvent.id && (
                <div>
                  <div>
                    <input
                      ref={dateTimeInputRef}
                      type="datetime-local"
                      onChange={(event) => updateTimes(e, event.target.value)}
                    />
                  </div>
                  <div>
                    <button>Postpone</button>
                    <button onClick={() => clearTimes()}>Cancel</button>
                  </div>
                </div>
              )}

              <div>{newTimeData?.[e.id]}</div>
            </div>
          )
        })}
    </div>
  )
}
