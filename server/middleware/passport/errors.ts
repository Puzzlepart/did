/* eslint-disable tsdoc/syntax */
/**
 * Sign in error
 *
 * @extends Error
 */
export class SigninError extends Error {
  constructor(
    public code: string,
    public name: string,
    message: string,
    public icon?: string
  ) {
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

export const NO_OID_FOUND = new SigninError(
  '0f8fc199',
  'Sorry to break it to you..',
  '... but an error occured attempting to sign you in.',
  'BlockedSite'
)

export const TENANT_NOT_ENROLLED = new SigninError(
  'de72e4da',
  'Your company is not enrolled in did',
  'Please contact<a href="mailto:did@puzzlepart.com">did@puzzlepart.com</a> for more information.',
  'Phone'
)

export const USER_NOT_ENROLLED = new SigninError(
  'cee991f0',
  'I promised to keep it a secret...',
  // eslint-disable-next-line quotes
  "...but it seems you're not enrolled in did.<br/><br/> Please contact your system owner.",
  'Sad'
)

export const SIGNIN_FAILED = new SigninError(
  'e0666582',
  'An error occured signing you in',
  'Sorry, we were not able to sign you in right now, and we are not really sure why!<br/><br/> It can help to clear your browser cache.',
  'Dislike'
)
