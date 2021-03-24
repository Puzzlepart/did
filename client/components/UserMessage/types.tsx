/* eslint-disable tsdoc/syntax */
import { IMessageBarProps, MessageBarType } from 'office-ui-fabric-react'

/**
 * @category UserMessage
 */
export interface IUserMessageProps extends IMessageBarProps {
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
   * Type (info, warning, erro etc)
   */
  type?: MessageBarType

  /**
   * Icon to use if not default for the type
   */
  iconName?: string

  /**
   * Container style
   */
  containerStyle?: React.CSSProperties

  /**
   * To flex the message center, speficy a min height
   */
  fixedCenter?: number

  /**
   * Styles for the inner part of the message
   */
  innerStyle?: React.CSSProperties
}
