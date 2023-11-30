import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Routes from '@/constant/routes'
import ErrorPage from '@/pages/error/error'
import Landing from '@/pages/landing/landing'

const router = createBrowserRouter([
  {
    path: Routes.Root,
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
