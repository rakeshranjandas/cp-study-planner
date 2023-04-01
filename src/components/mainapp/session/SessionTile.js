import React from "react"

export default function SessionTile(props) {
  return (
    <div className="session-tile" onClick={() => props.showPopup()}>
      SessionTile
      {props.curSession && props.curSession.finished === false && (
        <p>
          <span>{props.curSession.elapsedTime}</span>/
          <span>{props.curSession.targetTime}</span>
        </p>
      )}
    </div>
  )
}
