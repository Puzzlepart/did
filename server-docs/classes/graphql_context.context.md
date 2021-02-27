[did-server](../README.md) / [graphql/context](../modules/graphql_context.md) / Context

# Class: Context

[graphql/context](../modules/graphql_context.md).Context

## Table of contents

### Constructors

- [constructor](graphql_context.context.md#constructor)

### Properties

- [client](graphql_context.context.md#client)
- [container](graphql_context.context.md#container)
- [db](graphql_context.context.md#db)
- [permissions](graphql_context.context.md#permissions)
- [requestId](graphql_context.context.md#requestid)
- [subscription](graphql_context.context.md#subscription)
- [userId](graphql_context.context.md#userid)

## Constructors

### constructor

\+ **new Context**(): [*Context*](graphql_context.context.md)

**Returns:** [*Context*](graphql_context.context.md)

## Properties

### client

• `Optional` **client**: *MongoClient*

Mongo client

Defined in: [server/graphql/context.ts:44](https://github.com/Puzzlepart/did/blob/846b6048/server/graphql/context.ts#L44)

___

### container

• `Optional` **container**: *ContainerInstance*

Container instance

Defined in: [server/graphql/context.ts:34](https://github.com/Puzzlepart/did/blob/846b6048/server/graphql/context.ts#L34)

___

### db

• `Optional` **db**: *Db*

Mongo database

Defined in: [server/graphql/context.ts:49](https://github.com/Puzzlepart/did/blob/846b6048/server/graphql/context.ts#L49)

___

### permissions

• `Optional` **permissions**: *string*[]

Permissions

Defined in: [server/graphql/context.ts:39](https://github.com/Puzzlepart/did/blob/846b6048/server/graphql/context.ts#L39)

___

### requestId

• `Optional` **requestId**: *string*

Request ID

Generated per request using Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

Defined in: [server/graphql/context.ts:19](https://github.com/Puzzlepart/did/blob/846b6048/server/graphql/context.ts#L19)

___

### subscription

• `Optional` **subscription**: *Subscription*

Subscription

Defined in: [server/graphql/context.ts:29](https://github.com/Puzzlepart/did/blob/846b6048/server/graphql/context.ts#L29)

___

### userId

• `Optional` **userId**: *string*

User ID

Defined in: [server/graphql/context.ts:24](https://github.com/Puzzlepart/did/blob/846b6048/server/graphql/context.ts#L24)
