import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

import { LoginContainerProps } from './Login.type'

function LoginContainer({ render }: LoginContainerProps) {
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // onSubmit login
  const handleSubmitLogin = () => {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    if (!username || username === '' || !password || password === '') {
      console.error('Username or password not found')
      return
    }

    console.log(`login\nusername: ${username}\npassword: ${password}`)
    setToken('asd')
    navigate('/', { replace: true })
  }

  return render({ usernameRef, passwordRef, onSubmitLogin: handleSubmitLogin })
}

export default LoginContainer
