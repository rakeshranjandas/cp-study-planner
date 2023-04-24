import React from "react"
import GoogleIcon from "../assets/images/google-logo.png"

export default function LandingPageNoLogin(props) {
  return (
    <div className="login-bg">
      <div className="login-container">
        <p>
          <b>CP Study Planner</b>
        </p>
        <p>
          <button onClick={() => props.login()}>
            <span>Login with </span>
            <span>
              <img src={GoogleIcon} className="login-google-icon" />
            </span>
          </button>
        </p>
      </div>
    </div>
  )
}
