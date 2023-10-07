import { ApolloServer, ApolloServerPlugin, GraphQLRequestContext } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting'
import { ApolloServerPluginSchemaReporting } from '@apollo/server/plugin/schemaReporting'
import { json } from 'body-parser'
import colors from 'colors/safe'
import cors from 'cors'
import createDebug from 'debug'
import express from 'express'
import { MongoClient } from 'mongodb'
import 'reflect-metadata'
import Container, { ContainerInstance } from 'typedi'
import _ from 'underscore'
import { Context, createContext } from './context'
import { generateClientInfo } from './generateClientInfo'
import { generateGraphQLSchema } from './generateGraphQLSchema'
import { environment } from '../utils'
export const debug = createDebug('graphql/setupGraphQL')

/**
 * Set up [GraphQL](https://graphql.org/) for the [express](https://www.npmjs.com/package/express)
 * application.
 *
 * * Sets up reporting to [Apollo Studio](https://studio.apollographql.com/org/puzzlepart/graphs)
 * * Sets up plugin to reset the container for each request
 *
 * #### Reporting needs the following environment keys: ####
 *
 * * `APOLLO_KEY`
 * * `APOLLO_GRAPH_VARIANT`
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
    const server = new ApolloServer<Context>({
      logger: {
        debug: () => null,
        info: () => null,
        warn: () => null,
        error: () => null
      },
      schema,
      rootValue: global,
      formatError: (error) => _.pick(error, 'message'),
      plugins: [
        ApolloServerPluginUsageReporting({
          sendVariableValues: { all: true },
          generateClientInfo,
          sendReportsImmediately: environment<boolean>('APOLLO_SCHEMA_REPORTING_SEND_REPORTS_IMMEDIATELY', false, {
            isSwitch: true
          })
        }),
        ApolloServerPluginSchemaReporting({
          initialDelayMaxMs: 30 * 1000
        }),
        {
          requestDidStart: () => ({
            willSendResponse(requestContext: GraphQLRequestContext<Context>) {
              debug(
                `Resetting container for request ${colors.magenta(
                  requestContext.contextValue.requestId
                )}`
              )
              // Remember to dispose the scoped container to prevent memory leaks
              Container.reset(requestContext.contextValue.requestId)
              const instancesIds = (
                (Container as any).instances as ContainerInstance[]
              ).map((instance) => instance.id)
              debug(`${instancesIds.length} container instance(s) left in memory.`)
            }
          })
        }
      ] as ApolloServerPlugin[]
    })
    await server.start()
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
        context: ({ req }) => createContext(req, mcl)
      })
    )
  } catch (error) {
    debug(error)
  }
}
