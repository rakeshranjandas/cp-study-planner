import React from "react"
import { isEventDone } from "../../../util/filterEvents"

export default function PanelSingleEvent(props) {
  return (
    <div
      className={[
        "panel-list-single-div",
        "app-calendar-event",

        ...[
          isEventDone(props.event)
            ? "app-calendar-event-done"
            : new Date(props.event.start) < new Date() &&
              "app-calendar-event-pending",
        ],
      ].join(" ")}
    >
      {props.event.title}
    </div>
  )
}
