[did-client - v0.10.0](../README.md) / GraphQL

# Module: GraphQL

GraphQL

**`see`** https://graphql.org/

## Table of contents

### Variables

- [$usercontext](graphql.md#$usercontext)
- [client](graphql.md#client)

## Variables

### $usercontext

• `Const` **$usercontext**: DocumentNode

This is a GraphQL query imported from a .gql or .graphql file.

The Apollo extension for VS Code is recommended when working with
.gql files.

The extension enables you to:

* Add syntax highlighting for GraphQL files and gql templates inside JavaScript files
* Get instant feedback and intelligent autocomplete for fields, arguments, types, and variables as you write queries
* Manage client side schema alongside remote schema
* See performance information inline with your query definitions
* Validate field and argument usage in operations
* Navigate projects more easily with jump-to and peek-at definitions
* Manage client-only schemas
* Switch graph variants to work with schemas running on different environments

**`see`** https://www.apollographql.com/docs/devtools/editor-plugins/

Defined in: [client/global.d.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/global.d.ts#L24)

___

### client

• `Const` **client**: *ApolloClient*<NormalizedCacheObject\>

Initializing our Apollo Client

* Using InMemoryCache
* Using url /graphql
* Using cache-and-network as default fetchPolicy

Defined in: [client/graphql/index.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/graphql/index.ts#L40)
