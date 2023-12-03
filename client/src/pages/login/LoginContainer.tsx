import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'
import authLogin from '@/services/auth/authLogin'

import { LoginContainerProps } from './Login.type'

function LoginContainer({ render }: LoginContainerProps) {
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState(false)

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // onSubmit login
  const handleSubmitLogin = async () => {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    if (!username || username === '' || !password || password === '') {
      console.error('Username or password not found')
      return
    }

    try {
      setLoading(true)
      setIsError(false)
      const user = await authLogin(username, password)
      if (!user || !user?.token) {
        setIsError(true)
        return
      }

      setToken(user.token)
      navigate('/', { replace: true })
    } catch (e) {
      console.error(e)
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  // login when press enter
  const handleKeyPress = ({ key }: { key: string }) => {
    if (key === 'Enter') {
      handleSubmitLogin()
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress)

    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  return render({
    usernameRef,
    passwordRef,
    onSubmitLogin: handleSubmitLogin,
    loading,
    isError,
  })
}

export default LoginContainer
