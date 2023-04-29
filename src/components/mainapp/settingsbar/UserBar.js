import React from "react"
import { ProfileContext } from "../../../context/ProfileContext"

export default function UserBar() {
  const profile = React.useContext(ProfileContext)

  return (
    <>
      <span title={profile.email} className="logout-profile-name">
        {profile.given_name}
      </span>

      <img
        src={profile.picture}
        alt="Profile Pic"
        referrerPolicy="no-referrer"
      />
    </>
  )
}
