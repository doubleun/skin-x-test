import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import PageContainer from '@/components/PageContainer/PageContainer'

function Root() {
  const navigate = useNavigate()
  const location = useLocation()

  // todo: handle auth
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/landing')
    }
  }, [])

  return (
    <PageContainer className="pt-4">
      {/* todo: nav ?? */}
      <Outlet />
    </PageContainer>
  )
}

export default Root
