import { AlertProps } from '@fluentui/react-components/dist/unstable'
import { IDynamicButtonProps } from 'components/DynamicButton'
import { CSSProperties, HTMLAttributes, MouseEvent } from 'react'
import { FluentIconName } from 'utils'

/**
 * Represents an action that can be performed on a user message.
 */
export interface IUserMessageAction
  extends Pick<
    IDynamicButtonProps,
    'text' | 'iconName' | 'disabled' | 'onClick'
  > {
  iconColor?: string
}

/**
 * @category UserMessage
 */
export interface IUserMessageProps extends Omit<AlertProps, 'action'> {
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
   * Whether to render a progress bar in the message
   */
  renderProgress?: boolean

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
