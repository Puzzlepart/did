import colors from 'colors/safe'
import createDebug from 'debug'
import 'reflect-metadata'
import { AuthorizationCode, Token } from 'simple-oauth2'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
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
 * Used for renewing access token using `simple-oauth2`.
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export default class MSOAuthService {
  constructor(@Inject('REQUEST') private readonly _request: any) {
    // Empty constructor
  }

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
    debug(
      `Creating AuthorizationCode client with options: ${colors.magenta(
        JSON.stringify(auth)
      )}`
    )
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
          `Token expired at ${colors.magenta(
            accessToken.token.expires_at
          )}. Attempting to refresh.`
        )
        accessToken = await accessToken.refresh(
          _.pick(accessToken.token, 'scope')
        )
        debug(
          `Successfully refreshed token expiring ${colors.magenta(
            accessToken.token.expires_at
          )}.`
        )
      } else {
        debug(`Token expiring ${colors.magenta(accessToken.token.expires_at)}.`)
      }
    } catch (error) {
      debug(`Failed to refresh token: ${colors.red(error.message)}`)
      throw new Error(`Failed to refresh token: ${error.message}`)
    }
    this._request.user['tokenParams'] = accessToken.token
    return accessToken.token
  }
}
