import { MongoClient } from 'mongodb'
import { Strategy as GoogleStrategyOAuth2 } from 'passport-google-oauth20'
import { environment, getCallbackUrl } from '../../../utils'
import { onVerifySignin } from './onVerifySignin'
import { Request } from 'express'
const log = require('debug')('server/middleware/passport/google')

/**
 * Google auth strategy
 *
 * @param mcl - Mongo client
 *
 * @returns GoogleStrategyOAuth2
 */
export const googleStrategy = (mcl: MongoClient) => {
  return new GoogleStrategyOAuth2(
    {
      clientID: environment('GOOGLE_CLIENT_ID'),
      clientSecret: environment('GOOGLE_CLIENT_SECRET'),
      callbackURL: environment('GOOGLE_REDIRECT_URI', 'http://localhost:9001/auth/google/callback'),
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      passReqToCallback: true // Enable request in callback
    },
    (req: Request, accessToken, refreshToken, profile, done) => {
      // Dynamically construct callback URL based on incoming request
      const dynamicCallbackUrl = getCallbackUrl(
        req,
        '/auth/google/callback',
        'GOOGLE_REDIRECT_URI'
      )
      
      // Log for debugging purposes
      if (environment('NODE_ENV') === 'development') {
        log('[Google OAuth] Dynamic callback URL:', dynamicCallbackUrl)
      }
      
      return onVerifySignin(
        mcl,
        {
          access_token: accessToken,
          refresh_token: refreshToken
        },
        profile,
        done
      )
    }
  )
}
