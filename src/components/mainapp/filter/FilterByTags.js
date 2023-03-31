import React from "react"
import { DBCalendarServices } from "../../../services/db/DBCalendarServices"
import FilterByTagsBar from "./FilterByTagsBar"

export default function FilterByTags(props) {
  function filterAppCalendarEvents(tagsList) {
    const filteredEvents = DBCalendarServices.getAllEvents(tagsList)
    props.setAppCalendarEvents(filteredEvents)
  }

  return (
    <div className="filter-div">
      <FilterByTagsBar onChange={filterAppCalendarEvents} />
    </div>
  )
}
