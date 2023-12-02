import { ReactElement } from 'react'

export interface ContainerRenderProps<T> {
  render(arg: T): ReactElement
}

export type SortDirections = 'ASC' | 'DESC'
