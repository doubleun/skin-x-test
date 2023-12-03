export interface IPost {
  id: number
  title: string
  content: string
  postedAt: string
  postedBy: string
  tags: string[]
  total: number
}

export interface IPostResponse {
  posts: IPost[]
  totalPage: number
}
