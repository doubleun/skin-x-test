const Routes = {
  Root: '/',
  Login: '/login',
  Detail: '/detail',
}

export type TRoutes = (typeof Routes)[keyof typeof Routes]

export default Routes
