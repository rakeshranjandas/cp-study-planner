import React from "react"
import ManageSrIcon from "../../../assets/images/manage-sr.png"
import SRManagePopup from "./SRManagePopup"

export default function SRManageIcon(props) {
  const [showSRManage, setShowSRManage] = React.useState(false)
  return (
    <>
      <img
        className="logout-manage-sr-icon"
        src={ManageSrIcon}
        alt="Manage SR"
        title="Manage SR Events"
        onClick={() => setShowSRManage(true)}
      />
      {showSRManage && (
        <SRManagePopup
          srBacklogs={props.srBacklogs}
          closePopup={() => setShowSRManage(false)}
          appCalendarEvents={props.appCalendarEvents}
          srManager={props.srManager}
        />
      )}
    </>
  )
}
