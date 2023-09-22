import { HTMLAttributes } from 'react'
import { UserMessage } from '.'
import { IUserMessageProps } from './types'
import styles from './UserMessage.module.scss'
import { useUserMessageStyles } from './useUserMessageStyles'

/**
 * Component logic hook for the `UserMessage` component.
 *
 * @category Function Component
 */
export function useUserMessage(props: IUserMessageProps) {
  const alertStyle = useUserMessageStyles(props.intent)
  const hasContextMenu = props.actions?.length > 0
  const containerProps: HTMLAttributes<HTMLDivElement> = {
    id: props.id,
    hidden: props.hidden,
    onClick: props.onClick,
    className: [
      UserMessage.className,
      props.className,
      hasContextMenu && styles.hasContextMenu
    ]
      .filter(Boolean)
      .join(' ')
  }
  return { containerProps, alertStyle }
}
