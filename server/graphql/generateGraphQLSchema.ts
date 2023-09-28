import 'reflect-metadata'
import { GraphQLDateTime } from 'graphql-scalars'
import { buildSchema, ResolverData } from 'type-graphql'
import { Context } from './context'
import { authChecker } from './authChecker'
import resolvers from './resolvers'

/**
 * Generate [GraphQL](https://graphql.org/) schema using
 * [type-graphql](https://www.npmjs.com/package/type-graphql)
 *
 * * Setting up the schema to use Dependency injection using
 *  [typedi](https://www.npmjs.com/package/typedi) (https://typegraphql.com/docs/dependency-injection.html)
 * * Turns of validation
 * * Sets auth checker
 * * Registers `GraphQLDateTime` scalar type
 *
 * @see https://typegraphql.com/
 */
export const generateGraphQLSchema = async () => {
  const schema = await buildSchema({
    resolvers,
    container: ({ context }: ResolverData<Context>) => context.container,
    emitSchemaFile: false,
    validate: false,
    authChecker,
    authMode: 'error',
    dateScalarMode: 'isoDate',
    scalarsMap: [{ type: Date, scalar: GraphQLDateTime }]
  })
  return schema
}
