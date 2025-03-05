import { MessageBarProps } from '@fluentui/react-components'

/**
 * An interface representing a [SigninError](../../../server/middleware/passport/errors/SigninError.ts)
 * object.
 */
export interface ISigninError {
  code: string
  name: string
  message: string
  icon: string
  intent: MessageBarProps['intent']
  redirectDelayMs: number
  authProvider: string
}
