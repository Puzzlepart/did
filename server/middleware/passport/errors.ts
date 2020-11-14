export class SigninError extends Error {
  constructor(public name: string, message: string, public icon?: string) {
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
  'I promised to keep it a secret...',
  // eslint-disable-next-line quotes
  "...but it seems you're not enrolled in did.<br/><br/> Please contact your system owner.",
  'Sad'
)
