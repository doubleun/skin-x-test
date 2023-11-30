import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Routes from '@/constant/routes'
import ErrorPage from '@/pages/error/error'

const router = createBrowserRouter([
  {
    path: Routes.Root,
    element: <div></div>,
    errorElement: <ErrorPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
