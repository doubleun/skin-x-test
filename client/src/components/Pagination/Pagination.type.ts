export interface PaginationProps {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  onPageChange(direction: 'next' | 'prev'): void
  totalPage: number | undefined
  className?: string
}
