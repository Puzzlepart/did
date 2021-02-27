import { AuthChecker, ResolverData } from 'type-graphql'
import { contains } from 'underscore'
import { Context } from './context'

export interface IAuthOptions {
  /**
   * Requires user context and can cannot be called with an API token
   */
  userContext?: boolean

  /**
   * Permission required for the resolver
   */
  permission?: string
}

/**
 * Checks auth for the context.
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
  if (authOptions.permission) {
    return contains(context.permissions, authOptions.permission)
  }
}
