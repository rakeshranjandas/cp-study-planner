import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import AddEditEventForm from "./AddEditEventForm"

export default function AppCalendar(props) {
  const [addEditEvent, setAddEditEvent] = React.useState(null)
  const [showAddEditForm, setShowAddEditForm] = React.useState(false)
  const [addEditSubmitHandler, setAddEditSubmitHandler] = React.useState(null)
  const fullCalendarRef = React.createRef()

  const addAppCalendarEvent = (addedEvent) => {
    props.setAppCalendarEvents([...props.appCalendarEvents, addedEvent])
  }

  const deleteAppCalendarEvent = (id) => {
    props.setAppCalendarEvents(
      props.appCalendarEvents.filter((appEvent) => appEvent.id !== id)
    )
  }

  const editAppCalendarEvent = (updatedEvent, eventId) => {
    deleteAppCalendarEvent(eventId)
    addAppCalendarEvent(updatedEvent)
  }

  const handleDateSelect = (selectInfo) => {
    console.log(fullCalendarRef.current.getApi().addEvent)
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
          console.log(addedEvent)
          addAppCalendarEvent(addedEvent)
          setShowAddEditForm(false)
        })
        .catch((err) => {
          console.log(err)
          alert("Some error.")
        })
    })

    setShowAddEditForm(true)
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
          editAppCalendarEvent(updatedEvent, editInput.id)
          setShowAddEditForm(false)
        })
        .catch((err) => {
          alert("Some error.")
        })
    })

    setShowAddEditForm(true)
  }

  const deleteEventHandler = (id) => {
    props.calendarService
      .deleteGoogleCalendarEvent(id)
      .then(() => {
        deleteAppCalendarEvent(id)
        setShowAddEditForm(false)
      })
      .catch((err) => {
        alert("Some error.")
      })
  }

  const handleEvents = (events) => {
    console.log("refresh")
  }

  const handleEventAdd = (event) => {
    console.log("Added ", event)
    // event.revert
  }

  return (
    <div className="app-calendar-div">
      <FullCalendar
        ref={fullCalendarRef}
        height="100%"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today addNewEvent",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        // initialEvents={state.currentEvents} // alternatively, use the `events` setting to fetch from a feed
        // events={() => events}
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        // you can update a remote database when these fire:
        eventAdd={handleEventAdd}
        eventChange={function () {}}
        eventRemove={function () {}}
        //

        events={props.appCalendarEvents}

        // customButtons={{
        //   addNewEvent: {
        //     text: "addNewEvent",
        //     click: function () {
        //       addNewEvent()
        //     },
        //   },
        // }}
      />

      {showAddEditForm && (
        <AddEditEventForm
          addEditEvent={addEditEvent}
          setShowAddEditForm={setShowAddEditForm}
          addEditSubmitHandler={addEditSubmitHandler}
          deleteEventHandler={deleteEventHandler}
        />
      )}
    </div>
  )
}
