import { useEffect, useRef, useState } from 'react'

import { IPost } from '@/services/post'
import searchPost from '@/services/post/searchPost'
import { SortDirections } from '@/types/common.type'

import { LandingContainerProps } from './Landing.type'

function LandingContainer({ render }: LandingContainerProps) {
  const [posts, setPosts] = useState<IPost[] | undefined>([])
  const [sortBy, setSortBy] = useState<Exclude<keyof IPost, 'tags'>>('postedAt')
  const [sortDirection, setSortDirection] = useState<SortDirections>('ASC')
  const searchRef = useRef<HTMLInputElement>(null)
  const didMount = useRef<boolean>(false)

  const handleSearchPosts = async () => {
    const search = searchRef.current?.value ?? ''

    await searchPost(search, sortBy, sortDirection).then((searchResults) =>
      setPosts(searchResults)
    )
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    handleSearchPosts()
  }, [sortBy, sortDirection])

  return render({
    posts,
    searchRef,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    handleSearchPosts,
  })
}

export default LandingContainer
