import { AuthChecker } from 'type-graphql'
import { Context } from './context'

export interface IAuthOptions {
  /**
   * Requires user context and can cannot be called with an API token
   */
  userContext?: boolean
}

export const authChecker: AuthChecker<Context, IAuthOptions> = ({ context }: { context: Context }, [authOptions]) => {
  if (!authOptions) return context.isAuthorized
  if (authOptions.userContext) return !!context.userId
}
