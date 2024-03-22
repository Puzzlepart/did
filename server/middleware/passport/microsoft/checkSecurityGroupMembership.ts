import { SubscriptionSecuritySettings } from '../../../graphql/resolvers/subscription/types/SubscriptionSecuritySettings'
import { MSGraphService, MSOAuthService } from '../../../services'

/**
 * Checks if a user is a member of the security group defined
 * in the subscription settings.
 *
 * @param settings The subscription security settings.
 * @param tokenParameters The token parameters.
 * @param mail The email of the user.
 *
 * @returns A boolean indicating whether the user is a member of the security group.
 */
export const checkSecurityGroupMembership = async (
  settings: SubscriptionSecuritySettings,
  tokenParameters: any,
  mail: string
) => {
  if (
    !settings.securityGroupEnabled ||
    !settings.securityGroupId ||
    !mail.includes(`@${settings.domainRestriction}`)
  )
    return false
  const msAuthSvc = new MSOAuthService({
    user: {
      tokenParams: tokenParameters
    }
  })

  const msGraphSvc = new MSGraphService(msAuthSvc)

  return await msGraphSvc.isUserMemberOfSecurityGroup(
    settings.securityGroupId,
    mail
  )
}
