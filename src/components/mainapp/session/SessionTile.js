import React from "react"

export default function SessionTile(props) {
  return (
    <div className="session-tile" onClick={() => props.showPopup()}>
      SessionTile
    </div>
  )
}
