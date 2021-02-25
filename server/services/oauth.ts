import createDebug from 'debug'
import 'reflect-metadata'
import { AuthorizationCode, Token } from 'simple-oauth2'
import { Inject, Service } from 'typedi'
import { pick } from 'underscore'
const debug = createDebug('services/oauth')

export interface AccessTokenOptions {
  clientId: string
  clientSecret: string
  tokenHost: string
  authorizePath: string
  tokenPath: string
  force?: boolean
}

@Service({ global: false })
class OAuthService {
  constructor(@Inject('REQUEST') private readonly _request: Express.Request) {}

  /**
   * Get client
   *
   * @param {AccessTokenOptions} options Options
   */
  private _getClient(options: AccessTokenOptions): AuthorizationCode {
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
   * @param {AccessTokenOptions} options Options
   */
  public async getAccessToken(options: AccessTokenOptions): Promise<Token> {
    // TODO: Temp hack for 'Property 'tokenParams' does not exist on type 'User'.'
    let accessToken = this._getClient(options).createToken(this._request.user['tokenParams'])
    try {
      if (accessToken.expired() || options.force) {
        debug(`Token expired. Attempting to refresh... Options: ${JSON.stringify(options)}`)
        accessToken = await accessToken.refresh(pick(accessToken.token, 'scope'))
        debug(`Successfully refreshed token expiring ${accessToken.token.expires_at}.`)
      } else {
        debug(`Token expiring ${accessToken.token.expires_at}.`)
      }
    } catch (err) {
      debug(`Failed to refresh token using options ${JSON.stringify(options)}: ${err.message}`)
      throw new Error(
        `Failed to refresh token using options ${JSON.stringify(options)}: ${err.message}`
      )
    }
    // TODO: Temp hack for 'Property 'tokenParams' does not exist on type 'User'.'
    this._request.user['tokenParams'] = accessToken.token
    return accessToken.token
  }
}

export default OAuthService
