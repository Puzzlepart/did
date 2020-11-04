import { AuthChecker } from 'type-graphql'
import { Context } from './context'

export interface IAuthOptions {
  /**
   * Requires user context and can cannot be called with an API token
   */
  userContext?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authChecker: AuthChecker<Context, IAuthOptions> = ({ context }: { context: Context }, [authOptions]) => {
  if (!authOptions) return context.isAuthorized
  if (authOptions.userContext) return !!context.user
}
