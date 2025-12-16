import { MongoClient } from 'mongodb'
import { IProfile, OIDCStrategy, VerifyCallback } from 'passport-azure-ad'
import { environment } from '../../../utils'
import { onVerifySignin } from './onVerifySignin'
import { Request } from 'express'
const log = require('debug')('server/middleware/passort/azuread')

/**
 * Microsoft/Azure AD auth strategy
 *
 * @param mcl - Mongo client (`MongoClient`)
 *
 * @returns `OIDCStrategy`
 */
export const azureAdStrategy = (mcl: MongoClient) => {
  // Use environment variable as base
  const redirectUrl = environment('MICROSOFT_REDIRECT_URI', 'http://localhost:9001/auth/azuread-openidconnect/callback')

  const strategy = new OIDCStrategy(
    {
      loggingLevel: 'error',
      identityMetadata:
        'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      clientID: environment('MICROSOFT_CLIENT_ID'),
      responseType: 'code id_token',
      responseMode: 'form_post',
      redirectUrl,
      allowHttpForRedirectUrl: true,
      clientSecret: environment('MICROSOFT_CLIENT_SECRET'),
      validateIssuer: false,
      passReqToCallback: true,
      scope: environment('MICROSOFT_SCOPES', undefined, { splitBy: ' ' })
    },
    (
      req: Request,
      _iss: string,
      _sub: string,
      profile: IProfile,
      _accessToken: string,
      _refreshToken: string,
      tokenParameters: any,
      done: VerifyCallback
    ) => {
      return onVerifySignin(mcl, profile, tokenParameters, done)
    }
  )
  
  // Intercept authenticate method to inject dynamic redirect URL from session
  const originalAuthenticate = strategy.authenticate
  strategy.authenticate = function(this: any, req: any, options?: any) {
    // Check if we have a dynamic callback URL stored in the session
    const dynamicCallbackUrl = req?.session?.['__callbackUrl']
    if (dynamicCallbackUrl) {
      // Override the redirect URL for this specific authentication request
      this._options.redirectUrl = dynamicCallbackUrl
      log(`[Azure AD] Using dynamic redirect URL: ${dynamicCallbackUrl}`)
    }
    // Call original with proper this context
    return originalAuthenticate.call(this, req, options)
  }
  
  return strategy
}
