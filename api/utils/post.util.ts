export function isValidSortBy(sort: string) {
  const validColumns = ['id', 'title', 'content', 'postedAt', 'postedBy']

  if (validColumns.includes(sort)) {
    return true
  }

  return false
}
export function isValidSortDirection(direction: string) {
  const validDirections = ['ASC', 'DESC']

  if (validDirections.includes(direction)) {
    return true
  }

  return false
}

export function handlePagination(page: number) {
  const limit = 10

  // if page came in as NaN then return first page
  if (!page || typeof page !== 'number') return 'OFFSET 0 LIMIT 10'

  return `OFFSET ${(page - 1) * limit} LIMIT ${limit}`
}
