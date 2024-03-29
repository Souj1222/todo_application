import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import APP_ENDPOINTS from "../constants/AppEndPoints"
import { authDataInStore, logout } from "../store/auth/authSlice"

/** A wrapper component that redirects users to login page if they are not logged in  */
function RequireAuth({ children }) {
  
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector(authDataInStore)

  // const { user_details, session_expires_at } = useSelector(authDataInStore)

  useEffect(()=>{
      if(!isLoggedIn){
        navigate(APP_ENDPOINTS.AUTH)
      }
  },[isLoggedIn,navigate])

  if (!isLoggedIn) {
    return <Navigate to={APP_ENDPOINTS.AUTH} replace />
  }
  return children
}

export default RequireAuth
