import React from "react"
import { formatDate } from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import AddEditEventForm from "./AddEditEventForm"

let eventGuid = 0
function createEventId() {
  return String(eventGuid++)
}

export default function AppCalendar(props) {
  const [addEditEvent, setAddEditEvent] = React.useState(null)
  const [showAddEditForm, setShowAddEditForm] = React.useState(false)
  const [addEditSubmitHandler, setAddEditSubmitHandler] = React.useState(null)

  const handleDateSelect = (selectInfo) => {
    setAddEditEvent({
      startStr: selectInfo.startStr,
      endStr: selectInfo.endStr,
      allDay: selectInfo.allDay,
    })

    setAddEditSubmitHandler(() => (addInput) => {
      console.log("addInput", addInput)

      props.calendarService
        .addGoogleCalendarEvent(addInput)
        .then((addedEvent) => {
          selectInfo.view.calendar.addEvent(addedEvent)
          setShowAddEditForm(false)
        })
        .catch((err) => {
          alert("Some error.")
        })
    })

    setShowAddEditForm(true)

    // let title = prompt("Please enter a new title for your event")
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   })
    // }
  }

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const handleEventClick = (clickInfo) => {
    setAddEditEvent(clickInfo.event)

    setAddEditSubmitHandler(() => (editInput) => {
      console.log("editInput", editInput)

      props.calendarService
        .updateGoogleCalendarEvent(editInput)
        .then((updatedEvent) => {
          console.log(updatedEvent)
          clickInfo.event.remove()
          clickInfo.view.calendar.addEvent(updatedEvent)
          setShowAddEditForm(false)
        })
        .catch((err) => {
          alert("Some error.")
        })
    })

    setShowAddEditForm(true)
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove()
    // }
  }

  const handleEvents = (events) => {
    console.log("refresh")
  }

  return (
    <div className="app-calendar-div">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        //   initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        // you can update a remote database when these fire:
        eventAdd={handleEventAdd}
      eventChange={function(){}}
      eventRemove={function(){}}
      */

        events={props.appCalendarEvents}
      {showAddEditForm && (
        <AddEditEventForm
          addEditEvent={addEditEvent}
          setShowAddEditForm={setShowAddEditForm}
          addEditSubmitHandler={addEditSubmitHandler}
        />
      )}
    </div>
  )
}
