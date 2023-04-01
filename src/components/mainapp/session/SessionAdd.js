import React from "react"

export default function SessionAdd(props) {
  const [targetTime, setTargetTime] = React.useState(10)
  return (
    <div>
      <h2>Add New Session</h2>
      <form>
        <p>Set Time in seconds</p>
        <p>
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
