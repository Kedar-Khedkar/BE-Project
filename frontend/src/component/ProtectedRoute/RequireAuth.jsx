import React from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { useAuth } from '../context/UserContext'

export const RequireAuth = ({children}) => {
  const auth=useAuth()
  let location = useLocation();
  if(!auth.user){
    console.log("checked the login")
    return <Navigate to='/' state={{ path: location.pathname }}  />
  }
  return children
}
