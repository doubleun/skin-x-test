import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'
import authLogin from '@/services/auth/authLogin'

import { LoginContainerProps } from './Login.type'

function LoginContainer({ render }: LoginContainerProps) {
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

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
      const user = await authLogin(username, password)
      if (!user || !user?.token) return

      setToken(user.token)
      navigate('/', { replace: true })
    } catch (e) {
      console.error(e)
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
  })
}

export default LoginContainer
