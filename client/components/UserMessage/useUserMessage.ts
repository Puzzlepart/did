import { HTMLAttributes } from 'react'
import { IUserMessageProps } from './types'
import { useUserMessageStyles } from './useUserMessageStyles'
import styles from './UserMessage.module.scss'

/**
 * A component that supports a `<MessageBar />` with
 * markdown using `react-markdown`.
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
      styles.root,
      hasContextMenu && styles.hasContextMenu,
    ].filter(Boolean).join(' '),
  }

  return { containerProps, alertStyle }
}
