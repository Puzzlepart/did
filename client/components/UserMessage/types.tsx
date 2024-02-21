import { MessageBarProps } from '@fluentui/react-components'
import { CSSProperties, HTMLAttributes, MouseEvent } from 'react'
import { FluentIconName } from 'utils'
import { IUserMessageAction } from './UserMessageAction'
/**
 * @category UserMessage
 */
export interface IUserMessageProps extends Omit<MessageBarProps, 'action'> {
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
   * Action to show in a menu
   */
  action?: IUserMessageAction

  /**
   * Whether to render a progress bar in the message. The first element of the array
   * is a boolean that indicates whether to render the progress bar. The second element
   * is the text to show in the progress bar - defaults to the `text` prop.
   */
  renderProgress?: [boolean, string?]

  /**
   * The name of the Fluent UI icon to display for the message (optional).
   */
  iconName?: FluentIconName
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
