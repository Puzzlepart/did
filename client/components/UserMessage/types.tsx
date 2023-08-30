import { MenuItemProps } from '@fluentui/react-components'
import { AlertProps } from '@fluentui/react-components/dist/unstable'

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
   * Icon to use if not default for the type
   */
  iconName?: string

  /**
   * Container style
   */
  containerStyle?: React.CSSProperties

  /**
   * To flex the message center with a fixed height
   */
  fixedHeight?: number

  /**
   * Styles for the inner part of the message
   */
  innerStyle?: React.CSSProperties

  /**
   * Actions to show in a menu
   */
  actions?: MenuItemProps[]

  /**
   * Whether to open the actions menu on hover
   */
  openActionsOnHover?: boolean
}
