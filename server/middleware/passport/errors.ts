export class SigninError extends Error {
  constructor(public code: string, public name: string, message: string, public icon?: string) {
    super(message)
  }

  /**
   * Returns a string representation of the SigninError
   */
  toString() {
    return JSON.stringify({
      name: this.name,
      message: this.message,
      icon: this.icon
    })
  }
}

/**
 * Error for no user ID found
 *
 * Markdown is supported
 */
export const NO_OID_FOUND = new SigninError(
  '0f8fc199',
  'Sorry to break it to you..',
  '... but an error occured attempting to sign you in.',
  'BlockedSite'
)

/**
 * Error for no subscription found for the tenant ID
 *
 * Markdown is supported
 */
export const TENANT_NOT_ENROLLED = new SigninError(
  'de72e4da',
  'I hate to be the one telling you this...',
  '... but your company is not enrolled in did.<br/><br/> Please contact <a href="mailto:did@puzzlepart.com">did@puzzlepart.com</a> for more information.',
  'Phone'
)

/**
 * Error for user not found in subscription directory
 *
 * Markdown is supported
 */
export const USER_NOT_ENROLLED = new SigninError(
  'cee991f0',
  'I promised to keep it a secret...',
  // eslint-disable-next-line quotes
  "...but it seems you're not enrolled in did.<br/><br/> Please contact your system owner.",
  'Sad'
)

/**
 * Error for sign in failed, and we're not really sure why
 *
 * Markdown is supported
 */
export const SIGNIN_FAILED = new SigninError(
  'e0666582',
  'An error occured',
  'Sorry, we were not able to sign you in right now, and we are not really sure why!<br/><br/> Hope you can forgive us at some point.'
)
