import { SigninError } from './SigninError'

/**
 * User not enrolled error
 */
export const USER_NOT_ENROLLED = new SigninError(
  'user_not_enrolled',
  'I promised to keep it a secret...',
  // eslint-disable-next-line quotes
  "...but it seems you're not enrolled in did.<br/><br/> Please contact your system owner.",
  'Sad'
)
