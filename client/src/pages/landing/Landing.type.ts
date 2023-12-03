import { IPost } from '@/services/post'
import { ContainerRenderProps, SortDirections } from '@/types/common.type'

import { PaginationProps } from '@/components/Pagination/Pagination.type'

interface LandingContainerRenderProps extends PaginationProps {
  posts: IPost[] | undefined
  loading: boolean
  searchRef: React.RefObject<HTMLInputElement>
  sortBy: string
  setSortBy: React.Dispatch<React.SetStateAction<Exclude<keyof IPost, 'tags'>>>
  sortDirection: SortDirections
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirections>>
  handleSearchPosts(): Promise<void>
}

export type LandingContainerProps =
  ContainerRenderProps<LandingContainerRenderProps>
