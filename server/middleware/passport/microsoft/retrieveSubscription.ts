import createDebug from 'debug'
import { SubscriptionService } from 'server/services'
import { TENANT_NOT_ENROLLED } from '../errors'
import { PROVIDER } from './onVerifySignin'
import { IProfileJson } from './types'
const debug = createDebug(
  'server/middleware/passport/microsoft/retrieveSubscription'
)

/**
 * Retrieve the subscription for the given user.
 *
 * @param subSvc - Subscription service
 * @param subId - Subscription ID
 * @param profile - User profile object
 *
 * @returns The subscription object
 *
 * @throws TENANT_NOT_ENROLLED if no subscription is found
 */
export async function retrieveSubscription(
  subSvc: SubscriptionService,
  subId: string,
  profile: IProfileJson
) {
  // Try to get subscription by tenant ID
  let subscription = await subSvc.getById(subId)

  if (subscription) {
    return subscription
  }

  // Try to get subscription by external ID
  subscription = await subSvc.getByExternalId(profile.oid, PROVIDER)

  if (subscription) {
    return subscription
  }

  // Check if there's an invitation
  const userInvitation = await subSvc.getExternalInvitation(
    profile.preferred_username,
    PROVIDER
  )
  subscription = userInvitation?.subscription

  if (!subscription) {
    debug(`Tenant ${subId} is not enrolled`)
    throw TENANT_NOT_ENROLLED
  }

  return subscription
}
