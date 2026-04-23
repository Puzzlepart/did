/**
 * [GraphQL](https://graphql.org/) context
 */
import get from 'get-value'
import { verify } from 'jsonwebtoken'
import { MongoClient, Db as MongoDatabase } from 'mongodb'
import 'reflect-metadata'
import { Container, ContainerInstance } from 'typedi'
import { DateObject } from '../../shared/utils/date'
import { environment, tryParseJson } from '../utils'
import { Subscription } from './resolvers/types'
import { GraphQLError } from 'graphql'
import colors from 'colors/safe'
const debug = require('debug')('graphql/requestContext')

interface User extends Partial<Omit<Express.User, 'subscription'>> {
  subscription?: Subscription
  tokenParams?: Record<string, any>
}

export interface Request extends Partial<Omit<Express.Request, 'user'>> {
  user: User
}

/**
 * The context object provides access to various resources and information
 * for the current request, such as the user ID, user object, user configuration,
 * provider, subscription, container instance, permissions, and MongoDB client and database.
 */
export class RequestContext {
  /**
   * Request ID
   *
   * Generated per request using Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
   */
  public requestId?: string

  /**
   * User ID
   */
  public userId?: string

  /**
   * User object
   */
  public user?: Record<string, any>

  /**
   * User configuration
   */
  public userConfiguration?: Record<string, any>

  /**
   * Provider
   *
   * `google` or `azuread-openidconnect`
   */
  public provider?: 'google' | 'azuread-openidconnect'

  /**
   * Subscription
   */
  public subscription?: Subscription

  /**
   * Container instance
   */
  public container?: ContainerInstance

  /**
   * Permissions for the logged in user, or
   * the API key used by external calls
   */
  public permissions?: string[]

  /**
   * Source of authentication for this request.
   * 'pat' for personal access tokens, 'api' for subscription API tokens,
   * null for interactive user sessions.
   */
  public tokenSource?: 'pat' | 'api' | null

  /**
   * Mongo client instance
   */
  public mcl?: MongoClient

  /**
   * Mongo database
   */
  public db?: MongoDatabase

  private constructor() {
    this.requestId = RequestContext.generateUniqueRequestId()
    this.container = Container.of(this.requestId)
  }

  /**
   * Create GraphQL context
   *
   * * Sets the default `mongodb` instance on the context
   * * Sets the user subscription on the context
   * * Checks token auth using `handleTokenAuthentication`
   * * Generates a random request ID using `Math random`
   * * Sets `CONTEXT` and `REQUEST` on the container to enable
   *   dependency injection in the resolvers.
   *
   * @param request Express request
   * @param mcl Mongo client
   *
   * @returns GraphQL context object
   */
  public static create = async (
    request: Express.Request,
    mcl: MongoClient
  ): Promise<RequestContext> => {
    try {
      const database = mcl.db(environment('MONGO_DB_DB_NAME'))
      const context = new RequestContext()
      debug(`Creating context for request ${colors.magenta(context.requestId)}`)
      context.mcl = mcl
      const sessionSubscription = get(request, 'user.subscription', {
        default: {}
      })
      context.subscription = sessionSubscription
      const apiKey = get(request, 'api_key')
      if (apiKey) {
        const { permissions, subscription, tokenSource, userId } =
          await handleTokenAuthentication(apiKey, database)
        context.permissions = permissions
        context.subscription = subscription
        context.tokenSource = tokenSource
        if (userId) {
          context.userId = userId
        }
      } else {
        // Refresh subscription metadata from the main database on every request
        // so downstream resolvers see current tenant settings and feature flags
        // without requiring sign-out. Falls back to session copy on miss or error.
        const subscriptionId = sessionSubscription?.id
        if (subscriptionId) {
          try {
            const fresh = await database
              .collection('subscriptions')
              .findOne({ _id: subscriptionId })
            if (fresh) {
              context.subscription = { ...fresh, id: fresh._id }
            } else {
              debug(
                `Subscription ${subscriptionId} not found in DB; using session copy`
              )
              context.subscription = sessionSubscription
            }
          } catch (subscriptionError) {
            debug(
              `Subscription refresh failed for ${subscriptionId}: ${subscriptionError?.message}; using session copy`
            )
            context.subscription = sessionSubscription
          }
        }

        // Populate basic user context
        context.user = get(request, 'user')
        context.userId = get(request, 'user.id')
        context.userConfiguration = tryParseJson<Record<string, any>>(
          get(request, 'user.configuration'),
          {}
        )
        context.provider = get(request, 'user.provider')

        // Dynamic role permission resolution per request to avoid stale sessions
        try {
          // Use the subscription-specific database for tenant-scoped collections
          const tenantDbName = get(request, 'user.subscription.db')
          const tenantDb = tenantDbName ? mcl.db(tenantDbName) : database
          const userId = context.userId

          // Fetch user's current role assignment from database to handle role changes
          let roleName: string | null = null
          if (userId) {
            const userDoc = await tenantDb
              .collection('users')
              .findOne({ _id: userId })
            if (userDoc?.role && typeof userDoc.role === 'string') {
              // User's role is stored as a string (role name) in the database
              roleName = userDoc.role
              debug(
                `Fetched current role assignment for user ${userId}: ${roleName}`
              )
            } else if (userDoc) {
              debug(
                `User ${userId} found but role is missing or not a string. Using session fallback.`
              )
            } else {
              debug(
                `User ${userId} not found in database. Using session fallback.`
              )
            }
          }

          // Fallback to session role name if database lookup fails or returns invalid data
          if (!roleName) {
            roleName = get(request, 'user.role.name')
            if (roleName) {
              debug(`Using session role name as fallback: ${roleName}`)
            }
          }

          // Look up the role's permissions from the database
          if (roleName) {
            const role = await tenantDb
              .collection('roles')
              .findOne({ name: roleName })
            if (role?.permissions) {
              context.permissions = role.permissions
              debug(
                `Resolved permissions for role ${roleName}: ${role.permissions.length} permissions`
              )
            } else {
              context.permissions = get(request, 'user.role.permissions') || []
              debug(
                `Role ${roleName} not found in database; using embedded permissions fallback`
              )
            }
          } else {
            context.permissions = get(request, 'user.role.permissions') || []
            debug('No role name found; using embedded permissions (legacy).')
          }
        } catch (roleError) {
          debug(`Failed dynamic role resolve: ${roleError?.message}`)
          context.permissions = get(request, 'user.role.permissions') || []
        }
      }
      context.db = context.mcl.db(
        context.subscription.db || environment('MONGO_DB_DB_NAME')
      )
      context.container.set({ id: 'CONTEXT', transient: true, value: context })
      context.container.set({ id: 'REQUEST', transient: true, value: request })
      debug(`Context created for request ${colors.magenta(context.requestId)}`)
      return context
    } catch (error) {
      throw error
    }
  }

  /**
   * Generate unique ID for the request
   */
  private static generateUniqueRequestId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
  }
}

/**
 * Authenticates a user based on an API key and retrieves their subscription and permissions.
 *
 * @param apiKey - The API key to authenticate the user with.
 * @param database - The `MongoDatabase` instance to use for database operations.
 *
 * @returns An object containing the user's subscription and permissions.
 *
 * @throws If the specified token is expired or authentication fails.
 */
const handleTokenAuthentication = async (
  apiKey: string,
  database: MongoDatabase
) => {
  const payload = verify(
    apiKey,
    environment('API_TOKEN_SECRET')
  ) as any
  const { expires, subscriptionId: _id, type, userId } = payload
  const expired = new DateObject(expires).jsDate < new Date()
  if (expired) throw new GraphQLError('The specified token is expired.')
  const [token, subscription] = await Promise.all([
    database.collection('api_tokens').findOne({
      apiKey,
      expires: {
        $gte: new Date()
      }
    }),
    database.collection('subscriptions').findOne({
      _id
    })
  ])
  if (!token || !subscription)
    throw new GraphQLError('Failed to authenticate with the specified token.')
  const tokenSource: 'pat' | 'api' = type === 'personal' ? 'pat' : 'api'
  return {
    subscription,
    permissions: token.permissions,
    tokenSource,
    userId: type === 'personal' ? userId : null
  }
}
