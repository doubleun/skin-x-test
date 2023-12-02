const Routes = {
  Root: '/',
  Login: '/login',
}

export type TRoutes = (typeof Routes)[keyof typeof Routes]

export default Routes
