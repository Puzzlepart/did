[did-server](../README.md) / graphql/context

# Module: graphql/context

## Table of contents

### Classes

- [Context](../classes/graphql_context.context.md)

### Functions

- [createContext](graphql_context.md#createcontext)

## Functions

### createContext

▸ `Const`**createContext**(`request`: *Request*, `client`: *MongoClient*): *Promise*<[*Context*](../classes/graphql_context.context.md)\>

Create context

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | *Request* | Express request   |
`client` | *MongoClient* | Mongo client    |

**Returns:** *Promise*<[*Context*](../classes/graphql_context.context.md)\>

Defined in: [server/graphql/context.ts:58](https://github.com/Puzzlepart/did/blob/dea0e5c1/server/graphql/context.ts#L58)
