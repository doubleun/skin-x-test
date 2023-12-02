import { useAuth } from '@/hooks/useAuth'
import authLogout from '@/services/auth/authLogout'

import { Button } from '@/components/Button/Button'

function Navbar() {
  const { setToken } = useAuth()

  const handleLogout = async () => {
    // this will remove auth from header and token in cookie
    const loggedOut = await authLogout()
    if (loggedOut) {
      setToken(null)
    }
  }

  return (
    <div className="bg-slate-200 w-full sticky top-0">
      <div className="container py-2 flex justify-between">
        <h3 className="text-2xl">Posty</h3>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Navbar
