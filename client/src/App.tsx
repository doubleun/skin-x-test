import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Routes from '@/constant/routes'
import Error from '@/pages/error/Error'

import AuthProvider from './components/AuthProvider/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Landing from './pages/landing/Landing'
import Login from './pages/login/Login'

const router = createBrowserRouter([
  {
    path: Routes.Root,
    element: <ProtectedRoute />,
    children: [
      {
        path: Routes.Root,
        element: <Landing />,
        errorElement: <Error />,
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
