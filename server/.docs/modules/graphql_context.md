[did-server - v0.9.8](../README.md) / graphql/context

# Module: graphql/context

## Table of contents

### Classes

- [Context](../classes/graphql_context.context.md)

### Functions

- [createContext](graphql_context.md#createcontext)
- [generateUniqueRequestId](graphql_context.md#generateuniquerequestid)

## Functions

### createContext

▸ `Const`**createContext**(`request`: *Request*, `mongoClient`: *MongoClient*): *Promise*<[*Context*](../classes/graphql_context.context.md)\>

Create GraphQL context

* Sets the default mongodb instance on the context
* Sets the user subscription on the context
* Checks token auth using handleTokenAuthentication
* Generates a random request ID using Math random
* Sets CONTEXT and REQUEST on the container to enable
  dependency injection in the resolvers.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | *Request* | Express request   |
`mongoClient` | *MongoClient* | Mongo client    |

**Returns:** *Promise*<[*Context*](../classes/graphql_context.context.md)\>

Defined in: [server/graphql/context.ts:75](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L75)

___

### generateUniqueRequestId

▸ **generateUniqueRequestId**(): *string*

Generate unique ID for the request

**Returns:** *string*

Defined in: [server/graphql/context.ts:58](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L58)
