import Navbar from '@/components/Navbar/Navbar'
import PageContainer from '@/components/PageContainer/PageContainer'

import DetailContainer from './DetailContainer'

function Detail() {
  return (
    <DetailContainer
      render={() => (
        <PageContainer header={<Navbar />} className="bg-slate-50">
          Detail
        </PageContainer>
      )}
    />
  )
}

export default Detail
