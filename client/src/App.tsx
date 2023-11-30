import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Routes from '@/constant/routes'
import Error from '@/pages/error/error'

import Landing from './pages/landing/Landing'

const router = createBrowserRouter([
  {
    path: Routes.Root,
    element: <Landing />,
    errorElement: <Error />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
