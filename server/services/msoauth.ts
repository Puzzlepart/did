/* eslint-disable tsdoc/syntax */
import createDebug from 'debug'
import 'reflect-metadata'
import { AuthorizationCode, Token } from 'simple-oauth2'
import { Inject, Service } from 'typedi'
import { pick } from 'underscore'
const debug = createDebug('services/msoauth')

export interface MSAccessTokenOptions {
  clientId: string
  clientSecret: string
  tokenHost: string
  authorizePath: string
  tokenPath: string
  force?: boolean
}

/**
 * Microsoft OAuth service
 *
 * Used for renewing access token using `simple-oauth2`
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
class MSOAuthService {
  constructor(@Inject('REQUEST') private readonly _request: any) {}

  /**
   * Get client
   *
   * @param options - Options
   */
  private _getClient(options: MSAccessTokenOptions): AuthorizationCode {
    const auth = {
      tokenHost: options.tokenHost,
      authorizePath: options.authorizePath || 'oauth2/v2.0/authorize',
      tokenPath: options.tokenPath || 'oauth2/v2.0/token'
    }
    debug(`Creating AuthorizationCode client: ${JSON.stringify(auth)}`)
    return new AuthorizationCode({
      client: {
        id: options.clientId,
        secret: options.clientSecret
      },
      auth
    })
  }

  /**
   * Get access token
   *
   * @todo Fix temp hack for `Property 'tokenParams' does
   * not exist on type 'User'.`
   *
   * @param options - Options
   */
  public async getAccessToken(options: MSAccessTokenOptions): Promise<Token> {
    let accessToken = this._getClient(options).createToken(
      this._request.user['tokenParams']
    )
    try {
      if (accessToken.expired() || options.force) {
        debug(
          `Token expired. Attempting to refresh... Options: ${JSON.stringify(
            options
          )}`
        )
        accessToken = await accessToken.refresh(
          pick(accessToken.token, 'scope')
        )
        debug(
          `Successfully refreshed token expiring ${accessToken.token.expires_at}.`
        )
      } else {
        debug(`Token expiring ${accessToken.token.expires_at}.`)
      }
    } catch (error) {
      debug(
        `Failed to refresh token using options ${JSON.stringify(options)}: ${
          error.message
        }`
      )
      throw new Error(
        `Failed to refresh token using options ${JSON.stringify(options)}: ${
          error.message
        }`
      )
    }
    this._request.user['tokenParams'] = accessToken.token
    return accessToken.token
  }
}

export default MSOAuthService
