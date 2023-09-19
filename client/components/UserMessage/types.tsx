import { MenuItemProps } from '@fluentui/react-components'
import { AlertProps } from '@fluentui/react-components/dist/unstable'
import { CSSProperties, HTMLAttributes, MouseEvent } from 'react'
import { FluentIconName } from 'utils'

/**
 * Represents an action that can be performed on a user message.
 */
export interface IUserMessageAction extends Omit<MenuItemProps, 'icon'> {
  /**
   * The name of the Fluent UI icon to display for the action (optional).
   */
  iconName?: FluentIconName

  /**
   * The color of the icon to display for the action (optional).
   */
  iconColor?: string
}

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
  onClick?: (event: MouseEvent<any>) => void

  /**
   * To flex the message center with a fixed height
   */
  fixedHeight?: number

  /**
   * Actions to show in a menu
   */
  actions?: IUserMessageAction[]

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
