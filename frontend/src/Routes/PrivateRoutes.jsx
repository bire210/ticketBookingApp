import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const {isAuth}=useContext(AuthContext)
    if(!isAuth){
        return <Navigate to="/login" />
    }
  return children
}

export default PrivateRoutes
