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
