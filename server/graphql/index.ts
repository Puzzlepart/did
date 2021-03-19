/* eslint-disable tsdoc/syntax */
/**
 * GraphQL Server using `apollo-server-express`
 *
 * @module GraphQL
 */
import {
  ApolloServerPluginSchemaReporting,
  ApolloServerPluginUsageReporting
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPlugin,
  GraphQLRequestContext
} from 'apollo-server-plugin-base'
import createDebug from 'debug'
import express from 'express'
import { GraphQLDateTime } from 'graphql-iso-date'
import { MongoClient } from 'mongodb'
import 'reflect-metadata'
import { buildSchema, ResolverData } from 'type-graphql'
import Container, { ContainerInstance } from 'typedi'
import UAParser from 'ua-parser-js'
import { find, isEmpty } from 'underscore'
import { authChecker } from './authChecker'
import { Context, createContext } from './context'
import {
  ApiTokenResolver,
  CustomerResolver,
  LabelResolver,
  NotificationResolver,
  OutlookCategoryResolver,
  ProjectResolver,
  ReportsResolver,
  RoleResolver,
  SubscriptionResolver,
  TimesheetResolver,
  UserResolver
} from './resolvers'
const debug = createDebug('graphql')

/**
 * Generate GraphQL schema using type-graphql
 *
 * * Setting up the schema to use Dependency injection (https://typegraphql.com/docs/dependency-injection.html)
 * * Turns of validation
 * * Sets auth checker
 * * Registers GraphQLDateTime scalar type
 *
 * @see https://typegraphql.com/
 */
export const generateGraphQLSchema = async () => {
  const schema = await buildSchema({
    resolvers: [
      ApiTokenResolver,
      CustomerResolver,
      LabelResolver,
      NotificationResolver,
      ReportsResolver,
      TimesheetResolver,
      ProjectResolver,
      OutlookCategoryResolver,
      UserResolver,
      RoleResolver,
      SubscriptionResolver
    ],
    container: ({ context }: ResolverData<Context>) => context.container,
    emitSchemaFile: true,
    validate: false,
    authChecker,
    dateScalarMode: 'isoDate',
    scalarsMap: [{ type: Date, scalar: GraphQLDateTime }]
  })
  return schema
}

/**
 * Specify this function to provide Apollo Studio with client details
 * for each processed request. Apollo Studio uses this information to
 * segment metrics by client. This function is passed a GraphQLRequestContext
 * object containing all available information about the request. It should
 * return an object with clientName and clientVersion fields that i
 * dentify the associated client.
 *
 * By default, the plugin attempts to obtain these values from the incoming
 * request's HTTP headers (specifically, apollographql-client-name and apollographql-client-version).
 *
 * @see https://www.apollographql.com/docs/apollo-server/api/plugin/usage-reporting/#generateclientinfo
 *
 * @remarks For now we're fetching browser info using ua-parser-js, aswell as checking
 * for Postman, Azure Logic Apps and Microsoft Flow.
 *
 * @param context - Context
 */
export function generateClientInfo({
  request
}: GraphQLRequestContext<Context>) {
  const userAgent = request.http.headers.get('user-agent') || ''
  if (isEmpty(userAgent)) return null
  if (userAgent.indexOf('PostmanRuntime') === 0) {
    const [, clientVersion] = userAgent.split('/')
    return { clientName: 'Postman Runtime', clientVersion }
  }
  const parts = userAgent.split(' ')
  if (userAgent.includes('microsoft-flow')) {
    const part = find(parts, (p) => p.includes('microsoft-flow'))
    const [, clientVersion] = part.split('/')
    return { clientName: 'Microsoft Flow', clientVersion }
  }
  if (userAgent.includes('azure-logic-apps')) {
    const part = find(parts, (p) => p.includes('azure-logic-apps'))
    const [, clientVersion] = part.split('/')
    return { clientName: 'Azure Logic Apps', clientVersion }
  }
  const browser = new UAParser(userAgent).getBrowser()
  return { clientName: browser.name, clientVersion: browser.version }
}

/**
 * Set up GraphQL for the Express Application
 *
 * * Sets up reporting to Apollo Studio
 * * Sets up plugin to reset the container for each request
 *
 * @param app - Express application
 * @param client - Mongo client
 */
export const setupGraphQL = async (
  app: express.Application,
  client: MongoClient
): Promise<void> => {
  try {
    const schema = await generateGraphQLSchema()
    const server = new ApolloServer({
      schema,
      rootValue: global,
      context: ({ req }) => createContext(req, client),
      plugins: [
        ApolloServerPluginUsageReporting({
          rewriteError: (error) => error,
          sendVariableValues: { all: true },
          generateClientInfo
        }),
        ApolloServerPluginSchemaReporting({
          initialDelayMaxMs: 30 * 1000
        }),
        {
          requestDidStart: () => ({
            willSendResponse(requestContext: GraphQLRequestContext<Context>) {
              debug(
                `Resetting container for request ${requestContext.context.requestId}`
              )
              // Remember to dispose the scoped container to prevent memory leaks
              Container.reset(requestContext.context.requestId)
              const instancesIds = ((Container as any)
                .instances as ContainerInstance[]).map(
                (instance) => instance.id
              )
              debug('Container instances left in memory: ', instancesIds)
            }
          })
        }
      ] as ApolloServerPlugin[]
    })
    server.applyMiddleware({ app, path: '/graphql' })
  } catch (error) {
    debug(error)
  }
}

export * from './resolvers/types'
export {
  ApiTokenResolver,
  CustomerResolver,
  LabelResolver,
  NotificationResolver,
  OutlookCategoryResolver,
  ProjectResolver,
  ReportsResolver,
  RoleResolver,
  SubscriptionResolver,
  TimesheetResolver,
  UserResolver
}
