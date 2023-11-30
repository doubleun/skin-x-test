import * as React from 'react'

import { cn } from '@/lib/utils'

import { InputTwClass } from './Input.style'
import { InputProps } from './Input.type'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(InputTwClass.input, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
