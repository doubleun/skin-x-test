import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Routes from '@/constant/routes'
import Error from '@/pages/error/Error'

import Landing from './pages/landing/Landing'
import Login from './pages/login/Login'

const router = createBrowserRouter([
  {
    path: Routes.Root,
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: Routes.Login,
    element: <Login />,
    errorElement: <Error />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
