import React from "react"

export default function AddEditEventForm(props) {
  console.log(props.addEditEvent)
  return (
    <div className="app-calendar-add-edit-event-bg">
      <div className="app-calendar-add-edit-event">
        <div>
          <h1 className="app-calendar-add-edit-event-header">Add Edit Event</h1>
          <span
            className="app-calendar-add-edit-event-close"
            onClick={() => props.setShowAddEditForm(false)}
          >
            X
          </span>
        </div>
      </div>
    </div>
  )
}
