import { MessageBarProps } from '@fluentui/react-components'

export interface ILoginErrorProps {
  /**
   * The error text to display.
   */
  text: string

  /**
   * The error message to display.
   */
  message?: string
  /**
   * Enable dismiss button.
   */
  enableDismiss?: boolean

  /**
   * The intent of the login error.
   */
  intent?: MessageBarProps['intent']
}
