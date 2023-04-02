import React from "react"
import { timeHHMMToSeconds } from "../../../util/timeConversions"

export default function SessionAdd(props) {
  const [targetTimeHHMM, setTargetTimeHHMM] = React.useState("01:00")
  const [label, setLabel] = React.useState("")

  return (
    <div>
      <div className="popup-header session-add-header-div">
        <h2>Add New Session</h2>
        <span className="popup-close" onClick={() => props.closePopup(false)}>
          X
        </span>
      </div>
      <form>
        <p>
          <label>Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value)
            }}
          />
        </p>
        <p>
          <label>Countdown</label>
          <input
            type="time"
            value={targetTimeHHMM}
            onChange={(e) => {
              setTargetTimeHHMM(e.target.value)
            }}
          />
        </p>
        <p>
          <button
            onClick={(e) => {
              e.preventDefault()

              const targetTimeInSeconds = timeHHMMToSeconds(targetTimeHHMM)

              if (!targetTimeInSeconds) {
                alert("Invalid time")
                return
              }

              props.startSession({
                label: label === "" ? "Untitled" : label,
                targetTime: targetTimeInSeconds,
              })
            }}
          >
            Start
          </button>
        </p>
      </form>
    </div>
  )
}
