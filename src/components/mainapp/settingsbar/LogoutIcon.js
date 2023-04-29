import React from "react"
import { UserContext } from "../../../context/UserContext"
import ExitIcon from "../../../assets/images/exit-icon.png"

export default function LogoutIcon() {
  const user = React.useContext(UserContext)

  return (
    <>
      <img
        className="logout-logout-icon"
        src={ExitIcon}
        alt="exit"
        onClick={() => {
          if (window.confirm("You will be logged out!")) user.logout()
        }}
      />
    </>
  )
}
