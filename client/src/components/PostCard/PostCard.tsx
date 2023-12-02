import { cn } from '@/lib/utils'

import { PostCardTwClass } from './PostCard.style'
import { PostCardProps } from './PostCard.type'

function PostCard({ post, className }: PostCardProps) {
  return (
    <div className={cn(PostCardTwClass.container, className)}>
      <h4 className={PostCardTwClass.cartTitle}>{post.title}</h4>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}

export default PostCard
