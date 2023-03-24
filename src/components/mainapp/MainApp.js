import React from "react"
import { ProfileContext } from "../../context/ProfileContext"

export default function MainApp() {
  const profile = React.useContext(ProfileContext)
  return (
    <div>
      <pre>{JSON.stringify(profile)}</pre>
    </div>
  )
}
