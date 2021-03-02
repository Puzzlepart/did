[did-server - v0.9.8](../README.md) / [graphql/context](../modules/graphql_context.md) / Context

# Class: Context

[graphql/context](../modules/graphql_context.md).Context

GraphQL context

## Table of contents

### Constructors

- [constructor](graphql_context.context.md#constructor)

### Properties

- [container](graphql_context.context.md#container)
- [db](graphql_context.context.md#db)
- [mongoClient](graphql_context.context.md#mongoclient)
- [permissions](graphql_context.context.md#permissions)
- [requestId](graphql_context.context.md#requestid)
- [subscription](graphql_context.context.md#subscription)
- [userId](graphql_context.context.md#userid)

## Constructors

### constructor

\+ **new Context**(): [*Context*](graphql_context.context.md)

**Returns:** [*Context*](graphql_context.context.md)

## Properties

### container

• `Optional` **container**: *ContainerInstance*

Container instance

Defined in: [server/graphql/context.ts:37](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L37)

___

### db

• `Optional` **db**: *Db*

Mongo database

Defined in: [server/graphql/context.ts:52](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L52)

___

### mongoClient

• `Optional` **mongoClient**: *MongoClient*

Mongo client

Defined in: [server/graphql/context.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L47)

___

### permissions

• `Optional` **permissions**: *string*[]

Permissions

Defined in: [server/graphql/context.ts:42](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L42)

___

### requestId

• `Optional` **requestId**: *string*

Request ID

Generated per request using Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

Defined in: [server/graphql/context.ts:22](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L22)

___

### subscription

• `Optional` **subscription**: [*Subscription*](graphql.subscription.md)

Subscription

Defined in: [server/graphql/context.ts:32](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L32)

___

### userId

• `Optional` **userId**: *string*

User ID

Defined in: [server/graphql/context.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L27)
