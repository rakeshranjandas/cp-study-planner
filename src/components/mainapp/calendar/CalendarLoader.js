import React from "react"
import LoadingImage from ".././../../assets/images/loading-calendar.gif"

export default function CalendarLoader() {
  return (
    <div className="loader-calendar-div">
      <img
        src={LoadingImage}
        className="loader-calendar-img"
        alt="Loader Calendar"
      />
    </div>
  )
}
