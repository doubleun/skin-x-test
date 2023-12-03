import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { IPost } from '@/services/post'
import getPostDetail from '@/services/post/getPostDetail'

import { DetailContainerProps } from './Detail.type'

function DetailContainer({ render }: DetailContainerProps) {
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [post, setPost] = useState<IPost | null>()

  const handleGetPostDetail = async () => {
    try {
      setLoading(true)

      const postId = Number(id)
      if (!postId) {
        throw new Error('Invalid post id param')
      }

      await getPostDetail(postId).then((post) => setPost(post))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetPostDetail()
  }, [])

  return render({
    post,
    loading,
  })
}

export default DetailContainer
