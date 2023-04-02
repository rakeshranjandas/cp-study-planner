import React from "react"
import AddEditEventTagSelect from "./AddEditEventTagSelect"

function getHTMLDateTimeValue(dateTime) {
  if (!dateTime.includes("T")) return dateTime + "T00:00"

  const d = new Date(dateTime)

  const f2 = (val) => ("0" + val).slice(-2)

  const formatted =
    `${d.getFullYear()}-${f2(d.getMonth() + 1)}-${f2(d.getDate())}` +
    `T${f2(d.getHours())}:${f2(d.getMinutes())}`

  return formatted
}

export default function AddEditEventForm(props) {
  const [curEvent, setCurEvent] = React.useState({
    start: getHTMLDateTimeValue(props.addEditEvent.start), // All-day startStr only contains date
    end: getHTMLDateTimeValue(props.addEditEvent.end),
    title: props.addEditEvent.title ?? "",
    description: props.addEditEvent.description ?? "",
    properties: props.addEditEvent.properties ?? {},
    ...(props.addEditEvent.id && { id: props.addEditEvent.id }),
  })

  return (
    <div className="popup-bg">
      <div className="popup-content app-calendar-add-edit-event">
        <div>
          <div className="popup-header app-calendar-add-edit-event-header-div">
            <h2>{curEvent.id ? "Edit" : "Add"} Event</h2>
            <span
              className="popup-close"
              onClick={() => props.setShowAddEditForm(false)}
            >
              X
            </span>
          </div>

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
                rows="3"
                cols="40"
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
                  className="app-calendar-add-edit-event-delete-button"
                  onClick={(e) => {
                    e.preventDefault()

                    if (window.confirm("Delete this event?"))
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
