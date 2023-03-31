import React from "react"
import AddEditEventTagSelect from "./AddEditEventTagSelect"

export default function AddEditEventForm(props) {
  const [curEvent, setCurEvent] = React.useState({
    start: (props.addEditEvent.start + "T00:00").substr(0, 16), // All-day startStr only contains date
    end: (props.addEditEvent.end + "T00:00").substr(0, 16),
    title: props.addEditEvent.title ?? "",
    description: props.addEditEvent.description ?? "",
    properties: props.addEditEvent.properties ?? {},
    ...(props.addEditEvent.id && { id: props.addEditEvent.id }),
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
              <label>Description:</label>
              <textarea
                rows="5"
                value={curEvent.description}
                onChange={(e) =>
                  setCurEvent({ ...curEvent, description: e.target.value })
                }
              />
            </p>

            <div>
              <label>Tags:</label>
              <AddEditEventTagSelect
                selectedOptionValuesList={curEvent?.properties?.tags}
                onChange={(tagsList) =>
                  setCurEvent({
                    ...curEvent,
                    properties: { ...curEvent.properties, tags: [...tagsList] },
                  })
                }
              />
            </div>

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
                {curEvent.id ? "Edit" : "Add"}
              </button>

              {curEvent.id && (
                <button
                  style={{ marginLeft: "15px" }}
                  onClick={(e) => {
                    e.preventDefault()
                    props.deleteEventHandler(curEvent.id)
                  }}
                >
                  Delete Event
                </button>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
