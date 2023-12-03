import { FilterIcon } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import { IPost } from '@/services/post'
import { SortDirections } from '@/types/common.type'

import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import Loader from '@/components/Loader/Loader'
import Navbar from '@/components/Navbar/Navbar'
import PageContainer from '@/components/PageContainer/PageContainer'
import Pagination from '@/components/Pagination/Pagination'
import PostCard from '@/components/PostCard/PostCard'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select/Select'

import LandingContainer from './LandingContainer'

function Landing() {
  return (
    <LandingContainer
      render={({
        posts,
        page,
        setPage,
        onPageChange,
        totalPage,
        loading,
        searchRef,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        handleSearchPosts,
      }) => (
        <PageContainer header={<Navbar />} className="bg-slate-50">
          <div className="flex flex-col gap-2 py-4">
            {/* search */}
            <div className="flex gap-4">
              <Input type="text" placeholder="Search" ref={searchRef} />
              <Button onClick={handleSearchPosts}>Search</Button>
            </div>

            {/* sort */}
            <div className="flex items-center gap-4">
              <FilterIcon />
              {/* sort by */}
              <Select
                onValueChange={(val) =>
                  setSortBy(val as Exclude<keyof IPost, 'tags'>)
                }
                defaultValue={sortBy}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="postedAt">Posted At</SelectItem>
                    <SelectItem value="postedBy">Posted By</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* sort direction */}
              <Select
                onValueChange={(val) => setSortDirection(val as SortDirections)}
                defaultValue={sortDirection}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ASC">Ascending</SelectItem>
                    <SelectItem value="DESC">Descending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* posts */}
            {loading ? (
              <Loader className="w-[10%] h-auto m-16" />
            ) : (
              <>
                <div className="flex flex-col gap-8">
                  {posts?.map((post) => (
                    <PostCard post={post} key={uuidv4()} />
                  ))}
                </div>

                {/* pagination */}
                <Pagination
                  page={page}
                  setPage={setPage}
                  onPageChange={onPageChange}
                  totalPage={totalPage}
                />
              </>
            )}
          </div>
        </PageContainer>
      )}
    />
  )
}

export default Landing
