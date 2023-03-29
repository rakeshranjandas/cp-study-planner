import React from "react"
import LoadingImage from "../../assets/images/loading-calendar.gif"

export default function Loader(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        backgroundColor: "#ddd",
        opacity: "0.4",
        zIndex: "100",
        ...(!props.showLoader && { display: "none" }),
      }}
    >
      <img
        src={LoadingImage}
        className="loader-calendar-img"
        alt="Loader Calendar"
        style={{ position: "relative", left: "40%", top: "-5%" }}
      />
    </div>
  )
}
