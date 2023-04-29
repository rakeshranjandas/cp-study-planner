import React from "react"
import SRManageIcon from "./SRManageIcon"
import UserBar from "./UserBar"
import LogoutIcon from "./LogoutIcon"

export default function SettingsBar(props) {
  return (
    <>
      <SRManageIcon srBacklogs={props.srBacklogs} />
      <UserBar />
      <LogoutIcon />
    </>
  )
}
