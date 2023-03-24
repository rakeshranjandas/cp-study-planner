import React from "react"
import { ProfileContext } from "../../../context/ProfileContext"
import { UserContext } from "../../../context/UserContext"
import ExitIcon from "../../../assets/images/exit-icon.png"

export default function Logout() {
  const profile = React.useContext(ProfileContext)
  const user = React.useContext(UserContext)

  return (
    <>
      {profile && (
        <>
          <img
            className="logout-logout-icon"
            src={ExitIcon}
            alt="exit"
            onClick={() => {
              if (window.confirm("You will be logged out!")) user.logout()
            }}
          />

          <img
            src={profile.picture}
            alt="Profile Pic"
            referrerPolicy="no-referrer"
          />

          <span title={profile.email} className="logout-profile-name">
            {profile.given_name}
          </span>
        </>
      )}
    </>
  )
}
