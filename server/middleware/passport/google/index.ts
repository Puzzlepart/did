import { MongoClient } from 'mongodb'
import { Strategy as GoogleStrategyOAuth2 } from 'passport-google-oauth20'
import { environment } from '../../../utils'
import { onVerifySignin } from './onVerifySignin'

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
      callbackURL: environment('GOOGLE_REDIRECT_URI'),
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    (accessToken, refreshToken, profile, done) =>
      onVerifySignin(
        mcl,
        {
          access_token: accessToken,
          refresh_token: refreshToken
        },
        profile,
        done
      )
  )
}
