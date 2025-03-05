import _ from 'lodash'

/**
 * Sign in errora
 *
 * @extends Error
 */
export class SigninError extends Error {
  constructor(
    public code: string,
    public name: string,
    message: string,
    public icon?: string,
    public intent = 'error',
    public redirectDelayMs?: number,
    public authProvider?: string
  ) {
    super(message)
  }

  /**
   * Returns a base64 string representation
   * of the `SigninError`. This is used to
   * pass the error to the client.
   */
  public toString() {
    return Buffer.from(
      JSON.stringify(
        _.pick(this, [
          'name',
          'message',
          'icon',
          'intent',
          'redirectDelayMs',
          'authProvider'
        ])
      )
    ).toString('base64')
  }
}
