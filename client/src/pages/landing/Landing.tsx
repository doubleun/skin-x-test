import { FilterIcon } from 'lucide-react'

import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select/Select'

function Landing() {
  return (
    <div className="flex flex-col gap-2">
      {/* search */}
      <div className="flex gap-4">
        <Input type="text" placeholder="Search" />
        <Button>Search</Button>
      </div>

      {/* sort */}
      <div className="flex items-center gap-4">
        <FilterIcon />
        {/* sort by */}
        <Select defaultValue="postedAt">
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
        <Select defaultValue="ASC">
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
    </div>
  )
}

export default Landing
