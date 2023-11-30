import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import PageContainer from '@/components/PageContainer/PageContainer'

import { LoginTwClass } from './Login.style'
import LoginContainer from './LoginContainer'

function Login() {
  return (
    <LoginContainer
      render={({ usernameRef, passwordRef, onSubmitLogin }) => (
        <PageContainer>
          <div className={LoginTwClass.inputContainer}>
            <div className={LoginTwClass.inputCard}>
              <h3 className="flex justify-center text-3xl ">Login</h3>
              <Input ref={usernameRef} type="text" placeholder="username" />
              <Input ref={passwordRef} type="text" placeholder="password" />
              <Button onClick={onSubmitLogin}>Confirm</Button>
            </div>
          </div>
        </PageContainer>
      )}
    />
  )
}

export default Login
