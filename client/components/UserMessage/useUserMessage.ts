import { HTMLAttributes } from 'react'
import { UserMessage } from '.'
import { IUserMessageProps } from './types'
import { useUserMessageStyles } from './useUserMessageStyles'

/**
 * Component logic hook for the `UserMessage` component.
 *
 * @category Function Component
 */
export function useUserMessage(props: IUserMessageProps) {
  const alertStyle = useUserMessageStyles(props.intent)
  const containerProps: HTMLAttributes<HTMLDivElement> = {
    id: props.id,
    hidden: props.hidden,
    onClick: props.onClick,
    style: {
      ...props.style,
      cursor: props.onClick ? 'pointer' : 'default'
    },
    className: [UserMessage.className, props.className]
      .filter(Boolean)
      .join(' ')
  }

  return { containerProps, alertStyle }
}
