import env from '../../utils/env'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const simpleoauth2 = require('simple-oauth2').create({
  client: {
    id: env('OAUTH_APP_ID'),
    secret: env('OAUTH_APP_PASSWORD')
  },
  auth: {
    tokenHost: env('OAUTH_AUTHORITY'),
    authorizePath: env('OAUTH_AUTHORIZE_ENDPOINT'),
    tokenPath: env('OAUTH_TOKEN_ENDPOINT')
  }
})

class TokenService {
  public async refreshAccessToken(req: any) {
    const storedToken = simpleoauth2.accessToken.create(req.user.oauthToken)
    if (storedToken) {
      try {
        const { token: oauthToken } = await storedToken.refresh()
        req.user.oauthToken = oauthToken
        return oauthToken
      } catch (error) {
        throw new Error('Failed to refresh access token')
      }
    } else {
      throw new Error('Invalid oauth token found in request')
    }
  }
}

export default new TokenService()
