import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { ContextUser } from 'AppContext'
import { Subscription } from 'types'
import $session_context from './session-context.gql'

export type SessionContext = {
  /**
   * The currently logged in user
   */
  user?: ContextUser

  /**
   * Subscription
   */
  subscription?: Subscription

  /**
   * Auth providers
   */
  authProviders?: string[]
}

/**
 * Fetches the session context from the GraphQL server.
 *
 * - `user` is a `ContextUser` object.
 * - `subscription` is a `Subscription` object.
 * - `authProviders` is an array of `AuthProvider` objects.
 *
 * @param client The Apollo Client instance.
 *
 * @returns A Promise that resolves to an object containing the user context.
 */
export async function fetchSessionContext(
  client: ApolloClient<NormalizedCacheObject>
): Promise<SessionContext> {
  try {
    const { data } = await client.query<Partial<SessionContext>>({
      query: $session_context,
      fetchPolicy: 'cache-first'
    })
    return {
      user: new ContextUser(data.user),
      subscription: data?.subscription,
      authProviders: data?.authProviders
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user context', error)
    return { user: new ContextUser() }
  }
}
