import { apiBaseUrl, APIEndpoints, request } from '@/services/config'

import { IPost } from '.'

const getPostDetail = async (
  postId: IPost['id']
): Promise<IPost | undefined> => {
  try {
    const endpoint = new URL(apiBaseUrl + APIEndpoints.POST_DETAIL)
    endpoint.searchParams.set('id', `${postId}`)

    const posts = await request.get(endpoint.toString())

    return posts.data
  } catch (err) {
    console.error(err)
    return
  }
}

export default getPostDetail
