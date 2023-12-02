import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Routes from '@/constant/routes'
import Error from '@/pages/error/Error'

import Landing from './pages/landing/Landing'
import Login from './pages/login/Login'
import Root from './pages/root/Root'

// todo: implement navbar for loggin out ?
const router = createBrowserRouter([
  {
    path: Routes.Root,
    element: <Root />,
    children: [
      {
        path: Routes.Landing,
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
  return <RouterProvider router={router} />
}

export default App
