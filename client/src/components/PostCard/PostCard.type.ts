import React from 'react'

import { IPost } from '@/services/post'

export interface PostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: IPost
}
