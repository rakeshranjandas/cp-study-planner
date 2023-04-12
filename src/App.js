import "./App.css"
import React from "react"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import { GoogleUserAPI } from "./services/google/GoogleUserAPI"
import MainApp from "./components/mainapp/MainApp"
import LandingPageNoLogin from "./components/LandingPageNoLogin"
import { UserContext } from "./context/UserContext"
import { ProfileContext } from "./context/ProfileContext"
import { LoaderContext } from "./context/LoaderContext"
import Loader from "./components/common/Loader"
import { GoogleAuthorizationLocalStorage } from "./services/google/utils/GoogleAuthorizationLocalStorage"

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [profile, setProfile] = React.useState(null)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse, "codeResponse")

      GoogleUserAPI.getAccessTokenFromAuthCode(codeResponse.code).then(
        (res) => {
          const resData = res.data
          console.log(resData, "getAccessToken")

          GoogleAuthorizationLocalStorage.saveAccessToken(resData.access_token)
          GoogleAuthorizationLocalStorage.saveRefreshToken(
            resData.refresh_token
          )
          setIsLoggedIn(true)
        }
      )
    },
    onError: (error) => alert("Login Failed:", error),
    scope: GoogleUserAPI.getCalendarScope(),
    flow: "auth-code",
    responseType: "code",
    accessType: "offline",
    includeGrantedScopes: true,
  })

  const logout = () => {
    GoogleUserAPI.revokeAccessToken(
      GoogleAuthorizationLocalStorage.getAccessToken()
    ).then(() => {
      googleLogout()

      GoogleAuthorizationLocalStorage.removeTokens()
      setProfile(null)
      setIsLoggedIn(false)
    })
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      GoogleUserAPI.getProfile()
        .then((res) => {
          setProfile(res.data)
        })
        .catch(() => logout())
    }
  }, [isLoggedIn])

  React.useEffect(() => {
    if (GoogleAuthorizationLocalStorage.getAccessToken()) {
      setIsLoggedIn(true)
    }
  }, [])

  React.useEffect(() => {
    const refreshGoogleTokenTimer = 1000 * 60 * 50

    const refreshGoogleTokenInterval = setInterval(() => {
      console.log("refreshGoogleTokenInterval")

      if (GoogleAuthorizationLocalStorage.getAccessToken()) {
        GoogleUserAPI.refreshAccessToken(
          GoogleAuthorizationLocalStorage.getRefreshToken()
        ).then((res) => {
          GoogleAuthorizationLocalStorage.saveAccessToken(res.data.access_token)
        })
      }
    }, refreshGoogleTokenTimer)

    return () => clearInterval(refreshGoogleTokenInterval)
  }, [])

  /* - LOADER - */

  const [showLoader, setShowLoader] = React.useState(false)

  const showLoaderFn = () => {
    setShowLoader(true)
  }

  const hideLoaderFn = () => {
    setShowLoader(false)
  }

  /* - LOADER - */

  return (
    <>
      <LoaderContext.Provider
        value={{ show: showLoaderFn, hide: hideLoaderFn }}
      >
        {isLoggedIn ? (
          <UserContext.Provider value={{ logout: logout }}>
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
