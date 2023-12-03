import Loader from '@/components/Loader/Loader'
import Navbar from '@/components/Navbar/Navbar'
import PageContainer from '@/components/PageContainer/PageContainer'
import PostedBy from '@/components/PostedBy/PostedBy'

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
              <h4 className="text-3xl font-bold pb-2">{post.title}</h4>

              {/* posted at, by */}
              <PostedBy post={post} className="pb-6" />

              {/* tags */}
              {/* TODO: CONTINUE HERE */}

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
