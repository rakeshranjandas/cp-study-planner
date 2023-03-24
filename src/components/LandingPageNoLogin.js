import React from "react"

export default function LandingPageNoLogin(props) {
  return (
    <div>
      <p>Welcome to CP-STUDY-PLANNER</p>
      <p>
        <button onClick={() => props.login()}>Login using Google</button>
      </p>
    </div>
  )
}
