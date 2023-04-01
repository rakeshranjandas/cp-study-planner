import React from "react"
import SessionPopup from "./SessionPopup"
import SessionTile from "./SessionTile"

export default function Session() {
  const [curSession, setCurSession] = React.useState(null)
  const [showSessionPopup, setShowSessionPopup] = React.useState(false)

  return (
    <div className="session-div" onClick={() => setShowSessionPopup(true)}>
      <SessionTile />
      {showSessionPopup && <SessionPopup />}
    </div>
  )
}
