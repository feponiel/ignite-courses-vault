import * as ToastElement from '@radix-ui/react-toast'
import { X } from 'phosphor-react'
import { ComponentProps } from 'react'
import { Heading } from '../Heading'
import { Text } from '../Text'
import {
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from './styles'

export interface ToastProps extends ComponentProps<typeof ToastElement.Root> {
  title: string
  description?: string
}

export function Toast({ title, description, ...props }: ToastProps) {
  return (
    <ToastElement.Provider swipeDirection="right">
      <ToastRoot {...props}>
        <ToastTitle asChild>
          <Heading size={'sm'}>{title}</Heading>
        </ToastTitle>

        <ToastClose asChild>
          <X weight="bold" />
        </ToastClose>

        {!!description && (
          <ToastDescription asChild>
            <Text size={'sm'}>{description}</Text>
          </ToastDescription>
        )}
      </ToastRoot>
      <ToastViewport />
    </ToastElement.Provider>
  )
}
