import { ContextUser } from 'AppContext'
import { IAppProps } from 'app/types'
import $userContextQuery from './user-context.gql'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

/**
 * Fetches the user context from the server.
 * 
 * - `user` is a `ContextUser` object.
 * - `subscription` is a `Subscription` object.
 * - `authProviders` is an array of `AuthProvider` objects.
 * 
 * @param client The Apollo Client instance.
 * 
 * @returns A Promise that resolves to an object containing the user context.
 */
export async function fetchUserContext(client: ApolloClient<NormalizedCacheObject>): Promise<IAppProps> {
    try {
        const { data } = await client.query<Partial<IAppProps>>({
            query: $userContextQuery,
            fetchPolicy: 'cache-first'
        })
        return {
            user: new ContextUser(data.user),
            subscription: data?.subscription,
            authProviders: data?.authProviders
        }
    } catch (error){
        // eslint-disable-next-line no-console
        console.error('Error fetching user context', error)
        return { user: new ContextUser() }
    }
}