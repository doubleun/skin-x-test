import { APIEndpoints, request } from '@/services/config'

const logout = async (): Promise<boolean> => {
  try {
    await request.get(APIEndpoints.LOGOUT)

    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export default logout
