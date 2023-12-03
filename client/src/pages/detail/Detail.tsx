import { v4 as uuidv4 } from 'uuid'

import Loader from '@/components/Loader/Loader'
import Navbar from '@/components/Navbar/Navbar'
import PageContainer from '@/components/PageContainer/PageContainer'
import PostedBy from '@/components/PostedBy/PostedBy'
import PostTag from '@/components/PostTag/PostTag'

import DetailContainer from './DetailContainer'

function Detail() {
  return (
    <DetailContainer
      render={({ post, loading }) => (
        <PageContainer header={<Navbar />} className="bg-slate-50">
          {/* post detail */}
          {post && !loading ? (
            <div className="py-8">
              {/* title */}
              <h4 className="text-3xl font-bold pb-4">{post.title}</h4>

              {/* tags */}
              <div className="flex gap-2 pb-2">
                {post.tags.map((tag) => (
                  <PostTag key={uuidv4()}>{tag}</PostTag>
                ))}
              </div>

              {/* posted at, by */}
              <PostedBy post={post} className="pb-6" />

              {/* content */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          ) : (
            <Loader />
          )}
        </PageContainer>
      )}
    />
  )
}

export default Detail
