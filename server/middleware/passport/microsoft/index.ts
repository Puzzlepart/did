import fs from 'fs'
import { MongoClient } from 'mongodb'
import { IProfile, OIDCStrategy, VerifyCallback } from 'passport-azure-ad'
import { environment } from '../../../utils'
import { onVerifySignin } from './onVerifySignin'

/**
 * Get redirect URL
 */
function getRedirectUrl() {
  let redirectUrl = environment('MICROSOFT_REDIRECT_URI')
  if (environment('LOCALTUNNEL_SUBDOMAIN')) {
    const _redirectUrl = fs.readFileSync('.localtunnel', 'utf-8')
    if (_redirectUrl) {
      redirectUrl = _redirectUrl
    }
  }
  return redirectUrl
}

/**
 * Microsoft/Azure AD auth strategy
 *
 * @param mcl - Mongo client
 *
 * @returns OIDCStrategy
 */
export const azureAdStrategy = (mcl: MongoClient) => {
  const redirectUrl = getRedirectUrl()
  return new OIDCStrategy(
    {
      identityMetadata:
        'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      clientID: environment('MICROSOFT_CLIENT_ID'),
      responseType: 'code id_token',
      responseMode: 'form_post',
      redirectUrl,
      allowHttpForRedirectUrl: true,
      clientSecret: environment('MICROSOFT_CLIENT_SECRET'),
      validateIssuer: false,
      passReqToCallback: false,
      scope: environment('MICROSOFT_SCOPES').split(' ')
    },
    (
      _iss: string,
      _sub: string,
      profile: IProfile,
      _accessToken: string,
      _refreshToken: string,
      tokenParameters: any,
      done: VerifyCallback
    ) => onVerifySignin(mcl, profile, tokenParameters, done)
  )
}
