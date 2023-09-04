import { MenuItemProps } from '@fluentui/react-components'
import { AlertProps } from '@fluentui/react-components/dist/unstable'
import { CSSProperties, HTMLAttributes } from 'react'

/**
 * @category UserMessage
 */
export interface IUserMessageProps extends AlertProps {
  /**
   * Header text to show in **bold** _slightly larger_ font
   */
  headerText?: string

  /**
   * Text to show in the message
   *
   * @remarks Supports markdown
   */
  text?: string

  /**
   * On click handler for the message
   */
  onClick?: (event: React.MouseEvent<any>) => void

  /**
   * On dismiss handler for the message
   */
  onDismiss?: () => void

  /**
   * To flex the message center with a fixed height
   */
  fixedHeight?: number

  /**
   * Actions to show in a menu
   */
  actions?: MenuItemProps[]

  /**
   * Whether to open the actions menu on hover
   */
  openActionsOnHover?: boolean
}

/**
 * Props for the UserMessageContainer component.
 */
export interface IUserMessageContainerProps
  extends HTMLAttributes<HTMLDivElement>,
  Pick<CSSProperties, 'height' | 'gap' | 'margin'> {
  /**
   * Vertical direction for the items in the container.
   */
  vertical?: boolean

  /**
   * How to spread the items in the container.
   */
  spread?: 'evenly' | 'around' | 'between'
}
