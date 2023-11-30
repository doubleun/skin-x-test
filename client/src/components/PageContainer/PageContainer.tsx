import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

import { PageContainerTwClass } from './PageContainer.style'
import { PageContainerProps } from './PageContainer.typ'

const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, children }, ref) => (
    <div className={cn(PageContainerTwClass.container, className)} ref={ref}>
      {children}
    </div>
  )
)

PageContainer.displayName = 'PageContainer'

export default PageContainer
