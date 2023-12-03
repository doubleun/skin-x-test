import { PaginationTwClass } from './Pagination.style'
import { PaginationProps } from './Pagination.type'

function PaginationItem({
  page,
  currentPage,
  setPage,
}: {
  page: number
  currentPage: PaginationProps['page']
  setPage: PaginationProps['setPage']
}) {
  return (
    <li onClick={() => setPage(page)}>
      <p
        className={
          page === currentPage
            ? PaginationTwClass.itemSelected
            : PaginationTwClass.item
        }
      >
        {page}
      </p>
    </li>
  )
}

export default PaginationItem
