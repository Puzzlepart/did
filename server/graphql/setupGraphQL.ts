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
import { MongoClient } from 'mongodb'
import 'reflect-metadata'
import Container, { ContainerInstance } from 'typedi'
import _ from 'underscore'
import { Context, createContext } from './context'
import { generateClientInfo } from './generateClientInfo'
import { generateGraphQLSchema } from './generateGraphQLSchema'
export const debug = createDebug('graphql')

/**
 * Set up [GraphQL](https://graphql.org/) for the [express](https://www.npmjs.com/package/express)
 * application
 *
 * * Sets up reporting to [Apollo Studio](https://studio.apollographql.com/org/puzzlepart/graphs)
 * * Sets up plugin to reset the container for each request
 *
 * #### Reporting needs the following environment keys: ####
 *
 * * `APOLLO_KEY`
 * * `APOLLO_GRAPH_VARIANT`
 * * `APOLLO_SCHEMA_REPORTING`
 *
 * @param app - Express application
 * @param mcl - Mongo client
 */

export const setupGraphQL = async (
  app: express.Application,
  mcl: MongoClient
): Promise<void> => {
  try {
    const schema = await generateGraphQLSchema()
    const server = new ApolloServer({
      logger: {
        debug: () => null,
        info: () => null,
        warn: () => null,
        error: () => null
      },
      schema,
      rootValue: global,
      playground: false,
      formatError: (error) => _.pick(error, 'message'),
      context: ({ req }) => createContext(req, mcl),
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
              const instancesIds = (
                (Container as any).instances as ContainerInstance[]
              ).map((instance) => instance.id)
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
