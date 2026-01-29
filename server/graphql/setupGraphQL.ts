import {
  ApolloServer,
  ApolloServerPlugin,
  GraphQLRequestContext
} from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/landingPage/disabled'
import { ApolloServerPluginUsageReporting } from '@apollo/server/plugin/usageReporting'
import { ApolloServerPluginSchemaReporting } from '@apollo/server/plugin/schemaReporting'
import { json } from 'body-parser'
import colors from 'colors/safe'
import cors from 'cors'
import express from 'express'
import { MongoClient } from 'mongodb'
import 'reflect-metadata'
import Container, { ContainerInstance } from 'typedi'
import { RequestContext } from './requestContext'
import { generateClientInfo } from './generateClientInfo'
import { generateGraphQLSchema } from './generateGraphQLSchema'
import { environment } from '../utils'
export const debug = require('debug')('graphql/setupGraphQL')

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
 * @param path - Path to GraphQL endpoint, defaults to `/graphql`
 */

export const setupGraphQL = async (
  app: express.Application,
  mcl: MongoClient,
  path = '/graphql'
): Promise<void> => {
  try {
    const isProduction = environment('NODE_ENV', 'development') === 'production'
    const schema = await generateGraphQLSchema()
    const server = new ApolloServer<RequestContext>({
      logger: {
        debug,
        info: debug,
        warn: debug,
        error: debug
      },
      schema,
      introspection: !isProduction,
      csrfPrevention: true,
      includeStacktraceInErrorResponses: !isProduction,
      rootValue: global,
      formatError: (error) => {
        const { message, extensions, locations, path } = error
        const code = extensions?.code

        // Log unexpected errors (not auth errors which are expected)
        if (code !== 'UNAUTHENTICATED' && code !== 'FORBIDDEN') {
          debug('GraphQL error:', { message, code, path })
        }

        // Map error codes to HTTP status for client-side handling
        const httpStatusMap: Record<string, number> = {
          UNAUTHENTICATED: 401,
          FORBIDDEN: 403,
          BAD_USER_INPUT: 400,
          GRAPHQL_PARSE_FAILED: 400,
          GRAPHQL_VALIDATION_FAILED: 400,
          INTERNAL_SERVER_ERROR: 500
        }
        const httpStatus = code ? httpStatusMap[code as string] : undefined

        return {
          message,
          locations,
          path,
          extensions: httpStatus
            ? { ...extensions, http: { status: httpStatus } }
            : extensions
        }
      },
      plugins: [
        ApolloServerPluginUsageReporting({
          sendVariableValues: { all: true },
          generateClientInfo,
          sendReportsImmediately: environment<boolean>(
            'APOLLO_SCHEMA_REPORTING_SEND_REPORTS_IMMEDIATELY',
            false,
            {
              isSwitch: true
            }
          )
        }),
        ApolloServerPluginSchemaReporting({
          initialDelayMaxMs: 30 * 1000
        }),
        ...(isProduction ? [ApolloServerPluginLandingPageDisabled()] : []),
        {
          requestDidStart: () => ({
            willSendResponse(
              requestContext: GraphQLRequestContext<RequestContext>
            ) {
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
              debug(
                `${instancesIds.length} container instance(s) left in memory.`
              )
            }
          })
        }
      ] as ApolloServerPlugin[]
    })
    await server.start()
    app.use(
      path,
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
        context: ({ req }) => RequestContext.create(req, mcl)
      })
    )
    debug(
      `ApolloServer server started and available at ${colors.magenta(path)}`
    )
  } catch (error) {
    console.error('[FATAL] Failed to initialize GraphQL server:', error)
    throw error
  }
}
