import createDebug from 'debug'
import 'reflect-metadata'
import { AuthorizationCode, Token } from 'simple-oauth2'
import { Inject, Service } from 'typedi'
import { pick } from 'underscore'
import env from '../../utils/env'
const debug = createDebug('api/services/tokens')

export interface IGetAccessTokenOptions {
  force?: boolean
}

@Service({ global: false })
class OAuthService {
  private _client: AuthorizationCode

  constructor(@Inject('REQUEST') private readonly _request: any) {
    this._client = new AuthorizationCode({
      client: {
        id: env('OAUTH_APP_ID'),
        secret: env('OAUTH_APP_PASSWORD')
      },
      auth: {
        tokenHost: 'https://login.microsoftonline.com/common/',
        authorizePath: '/oauth2/v2.0/authorize',
        tokenPath: '/oauth2/v2.0/token'
      }
    })
  }

  /**
   * Get access token
   *
   * @param {IGetAccessTokenOptions} options Options
   */
  public async getAccessToken(options: IGetAccessTokenOptions = { force: true }): Promise<Token> {
    let accessToken = this._client.createToken(this._request.user.oauthToken)
    try {
      if (accessToken.expired() || options.force) {
        accessToken = await accessToken.refresh(pick(accessToken.token, 'scope'))
        debug(`Successfully refreshed token expiring at ${accessToken.token.expires_at}.`)
      } else {
        debug(`Token expiring at ${accessToken.token.expires_at}.`)
      }
    } catch (err) {
      debug(`Failed to refresh token: ${err.message}`)
      throw new Error(`Failed to refresh token: ${err.message}`)
    }
    this._request.user.oauthToken = accessToken.token
    return accessToken.token
  }
}

export default OAuthService
