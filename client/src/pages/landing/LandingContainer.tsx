import { useEffect, useRef, useState } from 'react'

import { IPost } from '@/services/post'
import searchPost from '@/services/post/searchPost'
import { SortDirections } from '@/types/common.type'

import { LandingContainerProps } from './Landing.type'

function LandingContainer({ render }: LandingContainerProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<IPost[] | undefined>([])
  const [sortBy, setSortBy] = useState<Exclude<keyof IPost, 'tags'>>('postedAt')
  const [sortDirection, setSortDirection] = useState<SortDirections>('ASC')
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number | undefined>(1)
  const searchRef = useRef<HTMLInputElement>(null)
  const didMount = useRef<boolean>(false)

  const handleSearchPosts = async () => {
    const search = searchRef.current?.value ?? ''

    try {
      setLoading(true)
      console.log('sortDirection', sortDirection)
      await searchPost(search, sortBy, sortDirection, page).then(
        (searchResults) => {
          setPosts(searchResults?.posts)
          setTotalPage(searchResults?.totalPage)
          if (searchResults?.totalPage !== totalPage) setPage(1)
        }
      )
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // search when pressed enter
  const handleKeyPress = ({ key }: { key: string }) => {
    if (key === 'Enter') {
      handleSearchPosts()
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [sortBy, sortDirection])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    handleSearchPosts()
  }, [sortBy, sortDirection, page])

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setPage((prev) => {
        return prev + 1
      })
    } else {
      setPage((prev) => prev - 1)
    }
    return
  }

  return render({
    posts,
    page,
    setPage,
    onPageChange: handlePageChange,
    totalPage,
    loading,
    searchRef,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    handleSearchPosts,
  })
}

export default LandingContainer
