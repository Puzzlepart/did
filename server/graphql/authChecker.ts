import { AuthChecker, ResolverData } from 'type-graphql'
import { contains } from 'underscore'
import { PermissionScope } from '../../shared/config/security'
import { Context } from './context'

export interface IAuthOptions {
  /**
   * Requires user context and can cannot be called with an API token
   */
  userContext?: boolean

  /**
   * Permission scope required for the resolver
   */
  scope?: PermissionScope
}

/**
 * Checks auth for the `context`
 *
 * @param param0 - Resolver data
 * @param param1 - Authentication options
 */
export const authChecker: AuthChecker<Context, IAuthOptions> = (
  { context }: ResolverData<Context>,
  [authOptions]
) => {
  if (!authOptions) {
    return !!context.permissions
  }
  if (authOptions.userContext) {
    return !!context.userId
  }
  if (authOptions.scope) {
    return contains(context.permissions, authOptions.scope)
  }
}
