import React, { createContext, useState } from 'react'
export const AuthContext=createContext();
const AuthContextProvider = ({children}) => {
    const [isAuth,setIsAuth]=useState(false);
    const login=()=>{
        setIsAuth(true)
    }

    const logOut=()=>{
        setIsAuth(false)
    }
  return (
    <AuthContext.Provider  value={{isAuth,login,logOut}} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
