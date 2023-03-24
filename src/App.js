import "./App.css"
import React from "react"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import MainApp from "./components/mainapp/MainApp"
import LandingPageNoLogin from "./components/LandingPageNoLogin"
import { UserContext } from "./context/UserContext"
import { ProfileContext } from "./context/ProfileContext"

function App() {
  const [user, setUser] = React.useState(null)
  const [profile, setProfile] = React.useState(null)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse)
      setUser(codeResponse)
    },
    onError: (error) => alert("Login Failed:", error),
    scope: "https://www.googleapis.com/auth/calendar",
  })

  const logout = () => {
    localStorage.removeItem("LOGGED_USER")
    googleLogout()
    setUser(null)
    setProfile(null)
  }

  const saveUserToLocalStorage = React.useCallback(() => {
    localStorage.setItem("LOGGED_USER", JSON.stringify(user))
  }, [user])

  const getSavedUserFromLocalStorage = () => {
    const savedUserJson = localStorage.getItem("LOGGED_USER")
    if (!savedUserJson) return null
    return JSON.parse(savedUserJson)
  }

  const setupProfile = React.useCallback(() => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res, "res")
        setProfile(res.data)
      })
      .catch((err) => {
        console.log(err)
        logout()
      })
  }, [user])

  React.useEffect(() => {
    if (user) {
      saveUserToLocalStorage()
      setupProfile()
    } else {
      const savedUser = getSavedUserFromLocalStorage()
      if (savedUser) setUser(savedUser)
    }
  }, [user, saveUserToLocalStorage, setupProfile])

  return (
    <>
      {user ? (
        <UserContext.Provider value={{ user: user, logout: logout }}>
          <ProfileContext.Provider value={profile}>
            <MainApp />
          </ProfileContext.Provider>
        </UserContext.Provider>
      ) : (
        <LandingPageNoLogin login={login} />
      )}
    </>
  )
}

export default App
