import React from "react"
import SessionPopup from "./SessionPopup"
import SessionTile from "./SessionTile"

export default function Session() {
  const [curSession, setCurSession] = React.useState(null)
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)

  function closePopup() {
    setIsPopupOpen(false)
  }

  function showPopup() {
    setIsPopupOpen(true)
  }

  return (
    <div className="session-div">
      <SessionTile showPopup={showPopup} />

      {isPopupOpen && <SessionPopup closePopup={closePopup} />}
    </div>
  )
}
