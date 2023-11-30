const Routes = {
  Root: '/',
}

export type TRoutes = (typeof Routes)[keyof typeof Routes]

export default Routes
