import * as TooltipElement from '@radix-ui/react-tooltip'
import { ComponentProps, ReactNode } from 'react'
import { TooltipContent } from './styles'

export interface TooltipProps
  extends ComponentProps<typeof TooltipElement.Root> {
  content: string | ReactNode
}

export function Tooltip({ content, children, ...props }: TooltipProps) {
  return (
    <TooltipElement.Provider>
      <TooltipElement.Root {...props}>
        <TooltipElement.Trigger asChild>{children}</TooltipElement.Trigger>

        <TooltipElement.Portal>
          <TooltipContent>{content}</TooltipContent>
        </TooltipElement.Portal>
      </TooltipElement.Root>
    </TooltipElement.Provider>
  )
}

Tooltip.displayName = 'Tooltip'
