import React from "react"
import { isEventAnSR } from "../../../util/filterEvents"

export default function SRManagePopup(props) {
  const srBacklogsData = {}

  props.appCalendarEvents.forEach((event) => {
    if (!isEventAnSR(event)) return
    const srId = event.properties.sr.id
    if (!props.srBacklogs.includes(srId)) return

    if (!srBacklogsData[srId]) srBacklogsData[srId] = { events: [] }

    srBacklogsData[srId].events.push(event)
  })

  const [currentSRBacklogs, setCurrentSRBacklogs] =
    React.useState(srBacklogsData)

  console.log(currentSRBacklogs)

  return (
    <div className="popup-bg">
      <div className="popup-content sr-manage-popup-main">
        <div>
          <div className="popup-header sr-manage-header-div">
            <div className="popup-header-text">Manage SR Events</div>
            <span
              className="popup-close"
              onClick={() => props.closePopup(false)}
            >
              X
            </span>
          </div>

          <div> {JSON.stringify(currentSRBacklogs)}</div>
        </div>
      </div>
    </div>
  )
}
