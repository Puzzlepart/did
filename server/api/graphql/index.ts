import { ApolloServer } from 'apollo-server-express'
import createDebug from 'debug'
import express from 'express'
import get from 'get-value'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { authChecker } from './authChecker'
import { createContext } from './context'
import {
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
      RoleResolver,
    ],
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
      playground: false,
      context: createContext,
      engine: {
        reportSchema: true,
        graphVariant: 'current',
        generateClientInfo: ({ context }) => {
          return {
            clientName: get(context, 'subscription.name', { default: '' })
          }
        }
      }
    })
    server.applyMiddleware({ app, path: '/graphql' })
  } catch (error) {
    debug(error)
  }
}
