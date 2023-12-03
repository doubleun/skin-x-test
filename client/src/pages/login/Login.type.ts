import { ForwardedRef } from 'react'

import { ContainerRenderProps } from '@/types/common.type'

interface LoginContainerRenderProps {
  usernameRef: ForwardedRef<HTMLInputElement>
  passwordRef: ForwardedRef<HTMLInputElement>
  onSubmitLogin(): void
  loading: boolean
}

export type LoginContainerProps =
  ContainerRenderProps<LoginContainerRenderProps>
