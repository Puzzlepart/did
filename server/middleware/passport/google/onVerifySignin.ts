/* eslint-disable unicorn/prevent-abbreviations */
import { MongoClient } from 'mongodb'
import { VerifyCallback } from 'passport-azure-ad'
import { Profile } from 'passport-google-oauth20'
import { SubscriptionService, UserService } from '../../../services/mongo'
import { environment } from '../../../utils'
import { TENANT_NOT_ENROLLED } from '../errors'

/**
 * On verify sign
 *
 * @param mcl - Mongo client
 * @param tokenParams - Token parameters
 * @param profile - User profile object
 * @param done - Done callback
 */
export const onVerifySignin = async (
  mcl: MongoClient,
  tokenParams: any,
  profile: Profile,
  done: VerifyCallback
) => {
  // eslint-disable-next-line no-console
  console.log(profile)
  const subSrv = new SubscriptionService({
    db: mcl.db(environment('MONGO_DB_DB_NAME'))
  })
  const subscription = await subSrv.getById(
    environment('GOOGLE_TEMP_SUBSCRIPTION_ID')
  )
  if (!subscription) throw TENANT_NOT_ENROLLED

  const userSrv = new UserService({
    db: mcl.db(subscription.db)
  })

  const user: any = await userSrv.getById(profile.id)
  user.subscription = subscription
  user.tokenParams = tokenParams
  done(null, user)
}
