import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import Routes from '@/constant/routes'
import { cn } from '@/lib/utils'
import { IPost } from '@/services/post'

import { Button } from '@/components/Button/Button'
import PostedBy from '@/components/PostedBy/PostedBy'
import PostTag from '@/components/PostTag/PostTag'

import { PostCardTwClass } from './PostCard.style'
import { PostCardProps } from './PostCard.type'

function PostCard({ post, className }: PostCardProps) {
  const navigate = useNavigate()

  const handleNavigateToDetail = (postId: IPost['id']) => {
    navigate(`${Routes.Detail}/${postId}`)
  }

  return (
    <div className={cn(PostCardTwClass.container, className)}>
      <h4 className={PostCardTwClass.cartTitle}>{post.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="max-h-[100px] overflow-hidden [&>p]:overflow-hidden [&>p]:whitespace-nowrap [&>p]:text-ellipsis"
      />

      {/* post tags */}
      <div className="flex gap-2">
        {post.tags.map((tag) => (
          <PostTag key={uuidv4()}>{tag}</PostTag>
        ))}
      </div>

      {/* posted at, by, and continue button */}
      <div className="flex justify-between">
        <PostedBy post={post} />

        {/* continue reading button */}
        <Button size="sm" onClick={() => handleNavigateToDetail(post.id)}>
          Continue reading
        </Button>
      </div>
    </div>
  )
}

export default PostCard
