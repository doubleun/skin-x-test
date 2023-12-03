import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
} from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import { clamp, cn } from '@/lib/utils'

import { PaginationTwClass } from './Pagination.style'
import { PaginationProps } from './Pagination.type'
import PaginationItem from './PaginationItem'

function Pagination({
  page: currentPage,
  setPage,
  onPageChange,
  totalPage = 1,
  className,
}: PaginationProps) {
  const postsPerPage = 10
  const maxPageNumbers = 6
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPage / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  const firstPageIndex =
    currentPage > 2 ? clamp(currentPage - 2, 0, pageNumbers.length - 3) : 0
  const lastPageIndex = currentPage > 2 ? currentPage + 1 : 3

  const lastIndexExceedMiddle = lastPageIndex > pageNumbers.length - 3

  const currentPages = pageNumbers.slice(firstPageIndex, lastPageIndex)
  const lastPages = pageNumbers.slice(
    lastIndexExceedMiddle ? lastPageIndex : pageNumbers.length - 3,
    pageNumbers.length
  )
  const firstPages = lastIndexExceedMiddle
    ? pageNumbers.slice(
        0,
        clamp(1 + (currentPage - (pageNumbers.length - 3)), 1, 3)
      )
    : []

  // check if pages exceed max display (6)
  const isExceedMax = pageNumbers.length > maxPageNumbers

  return (
    <div className="py-4">
      {currentPage}
      <nav role="navigation" aria-label="Pagination Navigation">
        <ul className={cn(PaginationTwClass.paginationContainer, className)}>
          <li>
            <p className={PaginationTwClass.chevron} onClick={() => setPage(1)}>
              <ChevronsLeftIcon size={18} />
            </p>
          </li>
          <li>
            <p
              className={PaginationTwClass.chevron}
              onClick={() => onPageChange('prev')}
            >
              <ChevronLeftIcon size={18} />
            </p>
          </li>

          {pageNumbers.length <= maxPageNumbers
            ? pageNumbers.map((page) => (
                <PaginationItem
                  key={uuidv4()}
                  page={page}
                  setPage={setPage}
                  currentPage={currentPage}
                />
              ))
            : null}

          {/* display first pages after crossed the dotted line */}
          {isExceedMax
            ? firstPages.map((page) => (
                <PaginationItem
                  key={uuidv4()}
                  page={page}
                  setPage={setPage}
                  currentPage={currentPage}
                />
              ))
            : null}

          {/* display dot after first pages (when first pages display) */}
          {isExceedMax && lastIndexExceedMiddle ? (
            <li>
              <span className={PaginationTwClass.dot}>...</span>
            </li>
          ) : null}

          {isExceedMax
            ? currentPages.map((page) => (
                <PaginationItem
                  key={uuidv4()}
                  page={page}
                  setPage={setPage}
                  currentPage={currentPage}
                />
              ))
            : null}

          {/* display dot after current pages (not cross dot line yet) */}
          {isExceedMax && !lastIndexExceedMiddle ? (
            <li>
              <span className={PaginationTwClass.dot}>...</span>
            </li>
          ) : null}

          {isExceedMax
            ? lastPages.map((page) => (
                <PaginationItem
                  key={uuidv4()}
                  page={page}
                  setPage={setPage}
                  currentPage={currentPage}
                />
              ))
            : null}

          <li>
            <p
              className={PaginationTwClass.chevron}
              onClick={() => onPageChange('next')}
            >
              <ChevronRightIcon size={18} />
            </p>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
