import { ApolloServer } from 'apollo-server-express'
import { GraphQLRequestContext, ApolloServerPlugin } from 'apollo-server-plugin-base'
import createDebug from 'debug'
import express from 'express'
import get from 'get-value'
import 'reflect-metadata'
import { buildSchema, ResolverData } from 'type-graphql'
import Container, { ContainerInstance } from 'typedi'
import { authChecker } from './authChecker'
import { Context, createContext } from './context'
import {
  ApiTokenResolver,
  CustomerResolver,
  LabelResolver,
  NotificationResolver,
  OutlookCategoryResolver,
  ProjectResolver,
  RoleResolver,
  TimeEntryResolver,
  TimesheetResolver,
  UserResolver
} from './resolvers'
const debug = createDebug('api/graphql')

/**
 * Get schema
 */
const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [
      ApiTokenResolver,
      CustomerResolver,
      LabelResolver,
      NotificationResolver,
      TimeEntryResolver,
      TimesheetResolver,
      ProjectResolver,
      OutlookCategoryResolver,
      UserResolver,
      RoleResolver
    ],
    container: ({ context }: ResolverData<Context>) => context.container,
    emitSchemaFile: true,
    validate: false,
    authChecker
  })
  return schema
}

export default async (app: express.Application): Promise<void> => {
  try {
    const schema = await getSchema()
    const server = new ApolloServer({
      schema,
      rootValue: global,
      context: ({ req: request }) => createContext(request),
      engine: {
        reportSchema: true,
        graphVariant: 'current',
        generateClientInfo: ({ context }) => ({
          clientName: get(context, 'subscription.name', { default: '' })
        })
      },
      plugins: [
        {
          requestDidStart: () => ({
            willSendResponse(requestContext: GraphQLRequestContext<Context>) {
              debug(`Resetting container for request ${requestContext.context.requestId}`)
              // Remember to dispose the scoped container to prevent memory leaks
              Container.reset(requestContext.context.requestId)
              const instancesIds = ((Container as any).instances as ContainerInstance[]).map((instance) => instance.id)
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
