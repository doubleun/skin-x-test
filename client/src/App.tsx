import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Routes from '@/constant/routes'
import Error from '@/pages/error/Error'

import AuthProvider from './components/AuthProvider/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Detail from './pages/detail/Detail'
import Landing from './pages/landing/Landing'
import Login from './pages/login/Login'

const router = createBrowserRouter([
  {
    path: Routes.Root,
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        path: Routes.Root,
        element: <Landing />,
      },
      {
        path: Routes.Detail + '/:id',
        element: <Detail />,
      },
    ],
  },
  {
    path: Routes.Login,
    element: <Login />,
    errorElement: <Error />,
  },
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
