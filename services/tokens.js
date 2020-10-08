const log = require('debug')('services/tokens')
const config = {
  client: {
    id: process.env.OAUTH_APP_ID,
    secret: process.env.OAUTH_APP_PASSWORD,
  },
  auth: {
    tokenHost: process.env.OAUTH_AUTHORITY,
    authorizePath: process.env.OAUTH_AUTHORIZE_ENDPOINT,
    tokenPath: process.env.OAUTH_TOKEN_ENDPOINT,
  },
}
const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

class TokenService {
  async refreshAccessToken(req) {
    var storedToken = simpleoauth2.accessToken.create(req.user.oauthToken)
    if (storedToken) {
      try {
        var { token: oauthToken } = await storedToken.refresh()
        log('Successfully refreshed auth token')
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

module.exports = new TokenService()
