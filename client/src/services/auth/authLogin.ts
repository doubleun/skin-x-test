import { APIEndpoints, request } from '@/services/config'

import { IUser } from '.'

const authLogin = async (
  username: string,
  password: string
): Promise<(IUser & { token?: string }) | undefined> => {
  try {
    const user = await request.post(APIEndpoints.LOGIN, {
      username,
      password,
    })

    return user.data
  } catch (err) {
    console.error(err)
    return
  }
}

export default authLogin
