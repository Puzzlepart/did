import { SubscriptionService } from 'server/services'
import { TENANT_NOT_ENROLLED } from '../errors'
import { PROVIDER, debug } from './onVerifySignin'

/**
 * Retrieve the subscription for the given user.
 *
 * @param subSvc - Subscription service
 * @param subId - Subscription ID
 * @param mail - User email
 * @returns The subscription object
 * @throws TENANT_NOT_ENROLLED if no subscription is found
 */
export async function retrieveSubscription(
  subSvc: SubscriptionService,
  subId: string,
  mail: string
) {
  // Try to get subscription by tenant ID
  let subscription = await subSvc.getById(subId)

  if (subscription) {
    return subscription
  }

  // Try to get subscription by external ID
  subscription = await subSvc.getByExternalId(mail, PROVIDER)

  if (subscription) {
    return subscription
  }

  // Check if there's an invitation
  const userInvitation = await subSvc.getExternalInvitation(mail, PROVIDER)
  subscription = userInvitation?.subscription

  if (!subscription) {
    debug(`Tenant ${subId} is not enrolled`)
    throw TENANT_NOT_ENROLLED
  }

  return subscription
}
