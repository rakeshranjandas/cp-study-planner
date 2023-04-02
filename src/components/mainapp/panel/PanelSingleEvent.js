import React from "react"

export default function PanelSingleEvent(props) {
  return (
    <div
      className={[
        "panel-list-single-div",
        "app-calendar-event",

        ...[
          props.event?.properties?.tags?.includes("done")
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
