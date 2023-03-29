import React from "react"

export default function AddEditEventForm(props) {
  const [curEvent, setCurEvent] = React.useState({
    start: props.addEditEvent.start.substr(0, 16),
    end: props.addEditEvent.end.substr(0, 16),
    title: "",
  })

  return (
    <div className="app-calendar-add-edit-event-bg">
      <div className="app-calendar-add-edit-event">
        <div>
          <h1 className="app-calendar-add-edit-event-header">
            {curEvent.id ? "Edit" : "Add"} Event
          </h1>
          <span
            className="app-calendar-add-edit-event-close"
            onClick={() => props.setShowAddEditForm(false)}
          >
            X
          </span>

          <form>
            <p>
              <label>Start:</label>
              <input
                type="datetime-local"
                value={curEvent.start}
                onChange={(e) =>
                  setCurEvent({ ...curEvent, start: e.target.value })
                }
              />
            </p>
            <p>
              <label>End:</label>
              <input
                type="datetime-local"
                value={curEvent.end}
                onChange={(e) =>
                  setCurEvent({ ...curEvent, end: e.target.value })
                }
              />
            </p>

            <p>
              <label>Title:</label>
              <input
                type="text"
                value={curEvent.title}
                onChange={(e) =>
                  setCurEvent({ ...curEvent, title: e.target.value })
                }
                required
              />
            </p>

            <p>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (curEvent.title === "") {
                    alert("Provide title")
                    return false
                  }
                  props.addEditSubmitHandler({ ...curEvent })
                }}
              >
                Add
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
