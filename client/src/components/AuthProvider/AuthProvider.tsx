import axios from 'axios'
import { createContext, useEffect, useMemo, useState } from 'react'

import { AuthProviderProps } from './AuthProvider.type'

export const AuthContext = createContext({})

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState(localStorage.getItem('token'))

  // for sets the authorization header in axios and localStorage.
  useEffect(() => {
    console.log('tolkk', token)
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      localStorage.setItem('token', token)
    } else {
      // If the token is null or undefined, it removes the authorization header from axios and localStorage.
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [token])

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
