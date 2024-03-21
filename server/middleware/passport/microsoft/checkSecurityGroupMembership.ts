import { MSGraphService, MSOAuthService } from '../../../services'
import { Subscription } from '../../../graphql/resolvers/types'

/**
 * Checks if a user is a member of the security group defined
 * in the subscription settings.
 *
 * @param subscription The subscription object.
 * @param tokenParameters The token parameters.
 * @param mail The email of the user.
 *
 * @returns A boolean indicating whether the user is a member of the security group.
 */
export const checkSecurityGroupMembership = async (
  subscription: Subscription,
  tokenParameters: any,
  mail: string
) => {
  if (
    !subscription.settings?.security?.securityGroupEnabled ||
    !subscription.settings?.security?.securityGroupId
  )
    return false
  const msAuthSvc = new MSOAuthService({
    user: {
      subscription,
      tokenParams: tokenParameters
    }
  })

  const msGraphSvc = new MSGraphService(msAuthSvc)

  return await msGraphSvc.isUserMemberOfSecurityGroup(
    subscription.settings?.security?.securityGroupId,
    mail
  )
}
