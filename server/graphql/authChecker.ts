import 'reflect-metadata'
import { AuthChecker, ResolverData } from 'type-graphql'
import { GraphQLError } from 'graphql'
import _ from 'underscore'
import { PermissionScope } from '../../shared/config/security'
import { RequestContext } from './requestContext'

/**
 * GraphQL API authentication options.
 *
 * Contains the following options:
 * - `userContext` - Requires user context and can cannot be called with an API token
 * - `scope` - Permission scope required for the resolver
 */
export interface IAuthOptions {
  /**
   * Requires user context and can cannot be called with an API token
   */
  requiresUserContext?: boolean

  /**
   * Permission scope required for the resolver
   */
  scope?: PermissionScope
}

/**
 * Checks auth for the `context`.
 *
 * @param param0 - Resolver data
 * @param param1 - Authentication options
 */
export const authChecker: AuthChecker<RequestContext, IAuthOptions> = (
  { context }: ResolverData<RequestContext>,
  [authOptions]
) => {
  if (!authOptions) {
    if (!context.permissions) {
      throw new GraphQLError('Authentication required', {
        extensions: { code: 'UNAUTHENTICATED' }
      })
    }
    return true
  }
  if (authOptions.requiresUserContext) {
    if (!context.userId) {
      throw new GraphQLError('User context required', {
        extensions: { code: 'UNAUTHENTICATED' }
      })
    }
    return true
  }
  if (authOptions.scope && !_.contains(context.permissions, authOptions.scope)) {
    // Log permission details server-side for debugging, but don't expose to client
    console.log(`[AuthChecker] Permission denied: required ${authOptions.scope}, user has ${context.permissions?.join(', ') || 'none'}`)
    throw new GraphQLError(
      'Insufficient permissions to perform this operation',
      {
        extensions: { code: 'FORBIDDEN' }
      }
    )
  }
  return true
}
