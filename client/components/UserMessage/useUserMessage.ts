import { MenuItemProps } from '@fluentui/react-components'
import { HTMLAttributes, useMemo } from 'react'
import { getFluentIcon } from 'utils'
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
  const actions = useMemo<MenuItemProps[]>(
    () =>
      props.actions.map((action) => ({
        ...action,
        icon: getFluentIcon(action.iconName, true, action.iconColor)
      })),
    [props.actions]
  )

  return { containerProps, alertStyle, actions }
}
