import React from "react"
import {
  filterBacklogEvents,
  filterTodayEvents,
  sortByStartTime,
} from "../../../util/filterEvents"
// import { timeHHMMToSeconds } from "../../../util/timeConversions"

export default function SessionAdd(props) {
  const [targetTimeHHMM, setTargetTimeHHMM] = React.useState("01:00")
  const [label, setLabel] = React.useState("")
  const [selectedEventIdList, setSelectedEventIdList] = React.useState([])
  const [countdownScheme, setCountdownScheme] = React.useState("")

  function getCountdownInfo(cs) {
    const csArr = cs.split("\n")
    let ti = 0
    let tData = {}

    csArr.forEach((t) => {
      const nt = t.split(" ")
      const mmssArr = nt[0].split(":")
      const mm = mmssArr[0]
      const ss = mmssArr[1]

      if (isNaN(mm) || (ss && isNaN(ss)))
        throw new Error("Invalid Countdown Scheme")
      const tlabel = nt[1] ?? ""
      const color = nt[2] ?? "red"

      tData[ti] = {
        label: tlabel,
        color: color,
      }

      const timeInSeconds = parseInt(mm) * 60 + parseInt(ss ?? 0)

      ti += timeInSeconds
    })

    return {
      targetTimeInSeconds: ti,
      tData: tData,
    }
  }

  return (
    <div>
      <div className="popup-header session-add-header-div">
        <h2>Add New Session</h2>
        <span className="popup-close" onClick={() => props.closePopup(false)}>
          X
        </span>
      </div>
      <form>
        <p>
          <label>Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value)
            }}
          />
        </p>
        {/* <p>
          <label>Countdown</label>
          <input
            type="time"
            value={targetTimeHHMM}
            onChange={(e) => {
              setTargetTimeHHMM(e.target.value)
            }}
          />
        </p> */}

        <p>
          <label>Countdown scheme (currently in seconds)</label>
          <textarea
            rows="5"
            value={countdownScheme}
            onChange={(e) => setCountdownScheme(e.target.value)}
          />
        </p>

        <div>
          <label>Select Tasks</label>
          <SessionAddTasks
            appCalendarEvents={props.appCalendarEvents}
            selectedEventIdList={selectedEventIdList}
            setSelectedEventIdList={setSelectedEventIdList}
          />
        </div>

        <p>
          <button
            onClick={(e) => {
              e.preventDefault()

              // const targetTimeInSeconds = timeHHMMToSeconds(targetTimeHHMM)

              // if (!targetTimeInSeconds) {
              //   alert("Invalid time")
              //   return
              // }

              try {
                const coundownData = getCountdownInfo(countdownScheme)
                console.log(coundownData)

                props.startSession({
                  label: label === "" ? "Untitled" : label,
                  targetTime: coundownData.targetTimeInSeconds,
                  events: selectedEventIdList.map((evId) => {
                    return { id: evId, done: false }
                  }),
                  tData: coundownData.tData,
                })
              } catch (err) {
                alert("Bad Countdown Scheme")
              }
            }}
          >
            Start
          </button>
        </p>
      </form>
    </div>
  )
}

function SessionAddTasks(props) {
  const [filteredEventIdList, setFilteredEventIdList] = React.useState([])
  const [filterChoice, setFilterChoice] = React.useState("today")

  React.useEffect(() => {
    switch (filterChoice) {
      case "today":
        setFilteredEventIdList(
          filterTodayEvents(props.appCalendarEvents).map((ev) => ev.id)
        )
        break

      case "backlog":
        setFilteredEventIdList(
          filterBacklogEvents(props.appCalendarEvents).map((ev) => ev.id)
        )
        break

      default:
        setFilteredEventIdList(
          sortByStartTime([...props.appCalendarEvents]).map((ev) => ev.id)
        )
    }
  }, [filterChoice])

  const filteredEvents = React.useMemo(() => {
    return props.appCalendarEvents.filter(
      (ev) =>
        filteredEventIdList.includes(ev.id) &&
        !props.selectedEventIdList.includes(ev.id)
    )
  }, [props.appCalendarEvents, filteredEventIdList, props.selectedEventIdList])

  const selectedEvents = React.useMemo(() => {
    return props.appCalendarEvents.filter((ev) =>
      props.selectedEventIdList.includes(ev.id)
    )
  }, [props.appCalendarEvents, props.selectedEventIdList])

  function addEventChoice(eventId) {
    props.setSelectedEventIdList((peIdList) => {
      return [...peIdList, eventId]
    })
  }

  function removeEventChoice(eventId) {
    props.setSelectedEventIdList((peIdList) =>
      peIdList.filter((peId) => peId !== eventId)
    )
  }

  return (
    <div className="session-add-tasks-div">
      <div className="session-add-tasks-choice-div">
        <select
          defaultValue="today"
          onChange={(e) => setFilterChoice(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="backlog">Backlog</option>
          <option value="all">All</option>
        </select>
        <div className="session-add-tasks-choice-list-div">
          {filteredEvents.map((ev) => (
            <p
              style={{ backgroundColor: "pink" }}
              onClick={() => addEventChoice(ev.id)}
            >
              {ev.title}
            </p>
          ))}
        </div>
      </div>
      <div className="session-add-tasks-added-div">
        {selectedEvents.map((ev) => (
          <p
            style={{ backgroundColor: "orange" }}
            onClick={() => removeEventChoice(ev.id)}
            data-id={ev.id}
          >
            {ev.title}
          </p>
        ))}
      </div>
    </div>
  )
}
