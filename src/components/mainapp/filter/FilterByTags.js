import React from "react"
import { DBCalendarServices } from "../../../services/db/DBCalendarServices"
import FilterByTagsBar from "./FilterByTagsBar"

export default function FilterByTags(props) {
  function filterAppCalendarEvents(tagsList) {
    DBCalendarServices.getAllEvents(tagsList).then((filteredEvents) => {
      props.setAppCalendarEvents(filteredEvents)
    })
  }

  return (
    <div className="filter-div">
      <FilterByTagsBar onChange={filterAppCalendarEvents} />
    </div>
  )
}
