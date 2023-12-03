import dayjs from 'dayjs'
import { Clock3Icon, User2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { IPost } from '@/services/post'

/**
 * For display postedAt and postedBy
 */
function PostedBy({ post, className }: { post: IPost; className?: string }) {
  return (
    <>
      {/* posted at, by */}
      <div className={cn('flex gap-4', className)}>
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
    </>
  )
}

export default PostedBy
