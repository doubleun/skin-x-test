import { APIEndpoints, request } from '@/services/config'

const authLogout = async (): Promise<boolean> => {
  try {
    await request.get(APIEndpoints.LOGOUT)

    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export default authLogout
