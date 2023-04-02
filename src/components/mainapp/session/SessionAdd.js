import React from "react"

export default function SessionAdd(props) {
  const [targetTimeHHMM, setTargetTimeHHMM] = React.useState("01:00")

  function convertTimeHHMMToSeconds(timeHHMM) {
    const [minutes, seconds] = timeHHMM.split(":")

    if (isNaN(minutes) || isNaN(seconds)) return false

    return parseInt(minutes) * 60 + parseInt(seconds)
  }

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
          <label>Set Time</label>
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

              const targetTimeInSeconds =
                convertTimeHHMMToSeconds(targetTimeHHMM)

              if (!targetTimeInSeconds) {
                alert("Invalid time")
                return
              }

              props.startSession({ targetTime: targetTimeInSeconds })
            }}
          >
            Start
          </button>
        </p>
      </form>
    </div>
  )
}
