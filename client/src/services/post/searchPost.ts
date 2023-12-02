import { apiBaseUrl, APIEndpoints, request } from '@/services/config'
import { SortDirections } from '@/types/common.type'

import { IPost } from '.'

const searchPost = async (
  search: string,
  sort: Exclude<keyof IPost, 'tags'>,
  direction: SortDirections
): Promise<IPost[] | undefined> => {
  try {
    const endpoint = new URL(apiBaseUrl + APIEndpoints.POST)
    endpoint.searchParams.set('search', search)
    endpoint.searchParams.set('sort', sort)
    endpoint.searchParams.set('direction', direction)

    const posts = await request.get(endpoint.toString())

    return posts.data
  } catch (err) {
    console.error(err)
    return
  }
}

export default searchPost
