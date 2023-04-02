import React from "react"

export default function SessionAdd(props) {
  const [targetTime, setTargetTime] = React.useState(10)
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
          <label>Set Time in seconds</label>
          <input
            type="number"
            min="1"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
          />
        </p>
        <p>
          <button
            onClick={(e) => {
              e.preventDefault()
              props.startSession({ targetTime: targetTime })
            }}
          >
            Start
          </button>
        </p>
      </form>
    </div>
  )
}
