import React from "react"
import PanelSingleEvent from "./PanelSingleEvent"

export default function BacklogEventsPanel(props) {
  return (
    <div className="panel-div">
      <h4 className="panel-div-heading panel-div-heading-backlog">Backlog</h4>

      <div className="panel-list-div">
        {props.events.map((event) => (
          <PanelSingleEvent event={event} />
        ))}
      </div>
    </div>
  )
}
