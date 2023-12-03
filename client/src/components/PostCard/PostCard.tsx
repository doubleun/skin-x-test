import dayjs from 'dayjs'
import { Clock3Icon, User2Icon } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import Routes from '@/constant/routes'
import { cn } from '@/lib/utils'
import { IPost } from '@/services/post'

import { Button } from '@/components/Button/Button'
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
        <div className="flex gap-4">
          {/* posted at */}
          <div className="flex items-center gap-2">
            <Clock3Icon size={20} />
            <p className="text-sm">
              Posted At: {dayjs(post.postedAt).format('DD-MM-YYYY')}
            </p>
          </div>

          {/* posted by */}
          <div className="flex items-center gap-2">
            <User2Icon size={20} />
            <p className="text-sm">Posted By: {post.postedBy}</p>
          </div>
        </div>

        {/* continue reading button */}
        <Button size="sm" onClick={() => handleNavigateToDetail(post.id)}>
          Continue reading
        </Button>
      </div>
    </div>
  )
}

export default PostCard
