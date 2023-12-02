const Routes = {
  Root: '/',
  Landing: '/landing',
  Login: '/login',
}

export type TRoutes = (typeof Routes)[keyof typeof Routes]

export default Routes
