import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

import { PageContainerTwClass } from './PageContainer.style'
import { PageContainerProps } from './PageContainer.type'

const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, header, children }, ref) => (
    <div className="relative">
      {header}
      <div className={cn(PageContainerTwClass.container, className)} ref={ref}>
        {children}
      </div>
    </div>
  )
)

PageContainer.displayName = 'PageContainer'

export default PageContainer
