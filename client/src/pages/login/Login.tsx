import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import Loader from '@/components/Loader/Loader'
import PageContainer from '@/components/PageContainer/PageContainer'

import { LoginTwClass } from './Login.style'
import LoginContainer from './LoginContainer'

function Login() {
  return (
    <LoginContainer
      render={({ usernameRef, passwordRef, onSubmitLogin, loading }) => (
        <PageContainer>
          <div className={LoginTwClass.inputContainer}>
            <div className={LoginTwClass.inputCard}>
              <h3 className="flex justify-center text-3xl font-semibold">
                Login
              </h3>
              <Input ref={usernameRef} type="text" placeholder="username" />
              <Input ref={passwordRef} type="password" placeholder="password" />
              <Button onClick={onSubmitLogin}>Confirm</Button>
            </div>
            {loading ? (
              <Loader
                containerClassName="absolute top-[35dvh]"
                className="w-[10%] h-auto m-16"
              />
            ) : null}
          </div>
        </PageContainer>
      )}
    />
  )
}

export default Login
