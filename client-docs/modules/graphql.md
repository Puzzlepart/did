[did-client - v0.10.0](../README.md) / GraphQL

# Module: GraphQL

GraphQL

**`see`** https://graphql.org/

## Table of contents

### Variables

- [$context](graphql.md#$context)
- [client](graphql.md#client)

## Variables

### $context

• `Const` **$context**: DocumentNode

This is a GraphQL query imported from a .gql or .graphql file

Defined in: [client/global.d.ts:8](https://github.com/Puzzlepart/did/blob/dev/client/global.d.ts#L8)

___

### client

• `Const` **client**: *ApolloClient*<NormalizedCacheObject\>

Initializing our Apollo Client

* Using InMemoryCache
* Using url /graphql
* Using cache-and-network as default fetchPolicy

Defined in: [client/graphql/index.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/graphql/index.ts#L40)
