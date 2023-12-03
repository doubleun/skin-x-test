import { IPost } from '@/services/post'
import { ContainerRenderProps } from '@/types/common.type'

interface DetailContainerRenderProps {
  post: IPost | null | undefined
  loading: boolean
}

export type DetailContainerProps =
  ContainerRenderProps<DetailContainerRenderProps>
