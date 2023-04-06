import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import AddEditEventForm from "./AddEditEventForm"
import { LoaderContext } from "../../../context/LoaderContext"

export default function AppCalendar(props) {
  const [addEditEvent, setAddEditEvent] = React.useState(null)
  const [showAddEditForm, setShowAddEditForm] = React.useState(false)
  const [addEditSubmitHandler, setAddEditSubmitHandler] = React.useState(null)
  const fullCalendarRef = React.createRef()
  const loader = React.useContext(LoaderContext)

  const handleDateSelect = (selectInfo) => {
    setAddEditEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    })

    setAddEditSubmitHandler(() => (addInput) => {
      console.log("addInput", addInput)
      loader.show()

      props.calendarService
        .addGoogleCalendarEvent(addInput)
        .then((addedEvent) => {
          console.log(addedEvent)
          props.appCalendarEventActions.add(addedEvent)
          setShowAddEditForm(false)
          loader.hide()
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
    setAddEditEvent(
      props.appCalendarEvents.find(
        (appCalendarEvent) => appCalendarEvent.id === clickInfo.event.id
      )
    )

    setAddEditSubmitHandler(() => (editInput) => {
      console.log("editInput", editInput)
      loader.show()

      props.calendarService
        .updateGoogleCalendarEvent(editInput)
        .then((updatedEvent) => {
          console.log(updatedEvent)
          props.appCalendarEventActions.add(updatedEvent)
          setShowAddEditForm(false)
          loader.hide()
        })
        .catch((err) => {
          alert("Some error.")
        })
    })

    setShowAddEditForm(true)
  }

  const deleteEventHandler = (id) => {
    loader.show()

    props.calendarService
      .deleteGoogleCalendarEvent(id)
      .then(() => {
        props.appCalendarEventActions.delete(id)
        setShowAddEditForm(false)
        loader.hide()
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

  const appCalendarEventsColored = React.useMemo(
    () =>
      props.appCalendarEvents.map((appCalendarEvent) => {
        const appCalendarEventCopy = JSON.parse(
          JSON.stringify(appCalendarEvent)
        )

        appCalendarEventCopy.classNames = ["app-calendar-event"]

        if (appCalendarEventCopy?.properties?.tags?.includes("done"))
          appCalendarEventCopy.classNames.push("app-calendar-event-done")
        else if (new Date(appCalendarEventCopy.start) < new Date())
          appCalendarEventCopy.classNames.push("app-calendar-event-pending")

        return appCalendarEventCopy
      }),
    [props.appCalendarEvents]
  )

  return (
    <div className="app-calendar-div">
      <FullCalendar
        ref={fullCalendarRef}
        height="100%"
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

        events={appCalendarEventsColored}

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
