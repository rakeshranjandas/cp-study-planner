import "./App.css"
import React from "react"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import { GoogleUserAPI } from "./services/google/GoogleUserAPI"
import { LoggedUserLocalStorage } from "./services/user/LoggedUserLocalStorage"
import MainApp from "./components/mainapp/MainApp"
import LandingPageNoLogin from "./components/LandingPageNoLogin"
import { UserContext } from "./context/UserContext"
import { ProfileContext } from "./context/ProfileContext"
import { LoaderContext } from "./context/LoaderContext"
import Loader from "./components/common/Loader"

function App() {
  const [user, setUser] = React.useState(null)
  const [profile, setProfile] = React.useState(null)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse)
    },
    onError: (error) => alert("Login Failed:", error),
    scope: GoogleUserAPI.getCalendarScope(),
  })

  const logout = () => {
    googleLogout()

    LoggedUserLocalStorage.destroy()
    setUser(null)
    setProfile(null)
  }

  const saveUserToLocalStorage = React.useCallback((toSaveUser) => {
    LoggedUserLocalStorage.save(toSaveUser)
  }, [])

  const getSavedUserFromLocalStorage = React.useCallback(() => {
    return LoggedUserLocalStorage.get()
  }, [])

  const setupProfile = React.useCallback(() => {
    GoogleUserAPI.getProfile(
      user.access_token,
      (profileData) => setProfile(profileData),
      () => logout()
    )
  }, [user])

  React.useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user)
      setupProfile()
    } else {
      const savedUser = getSavedUserFromLocalStorage()
      if (savedUser) setUser(savedUser)
    }
  }, [user, saveUserToLocalStorage, setupProfile])

  const [showLoader, setShowLoader] = React.useState(false)

  const showLoaderFn = () => {
    setShowLoader(true)
  }

  const hideLoaderFn = () => {
    setShowLoader(false)
  }

  return (
    <>
      <LoaderContext.Provider
        value={{ show: showLoaderFn, hide: hideLoaderFn }}
      >
        {user ? (
          <UserContext.Provider value={{ user: user, logout: logout }}>
            <ProfileContext.Provider value={profile}>
            <MainApp />
          </ProfileContext.Provider>
        </UserContext.Provider>
        ) : (
          <LandingPageNoLogin login={login} />
        )}
      </LoaderContext.Provider>
      <Loader showLoader={showLoader} />
    </>
  )
}

export default App
