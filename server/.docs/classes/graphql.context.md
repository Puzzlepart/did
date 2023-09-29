[did-server - v0.13.0](../README.md) / [GraphQL](../modules/graphql.md) / Context

# Class: Context

[GraphQL](../modules/graphql.md).Context

The context object provides access to various resources and information
for the current request, such as the user ID, user object, user configuration,
provider, subscription, container instance, permissions, and MongoDB client and database.

## Table of contents

### Constructors

- [constructor](graphql.context.md#constructor)

### Properties

- [container](graphql.context.md#container)
- [db](graphql.context.md#db)
- [mcl](graphql.context.md#mcl)
- [permissions](graphql.context.md#permissions)
- [provider](graphql.context.md#provider)
- [requestId](graphql.context.md#requestid)
- [subscription](graphql.context.md#subscription)
- [user](graphql.context.md#user)
- [userConfiguration](graphql.context.md#userconfiguration)
- [userId](graphql.context.md#userid)

## Constructors

### constructor

\+ **new Context**(): [*Context*](graphql.context.md)

**Returns:** [*Context*](graphql.context.md)

## Properties

### container

• `Optional` **container**: *ContainerInstance*

Container instance

Defined in: [graphql/context.ts:59](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L59)

___

### db

• `Optional` **db**: *any*

Mongo database

Defined in: [graphql/context.ts:75](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L75)

___

### mcl

• `Optional` **mcl**: *any*

Mongo client instance

Defined in: [graphql/context.ts:70](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L70)

___

### permissions

• `Optional` **permissions**: *string*[]

Permissions for the logged in user, or
the API key used by external calls

Defined in: [graphql/context.ts:65](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L65)

___

### provider

• `Optional` **provider**: *azuread-openidconnect* \| *google*

Provider

`google` or `azuread-openidconnect`

Defined in: [graphql/context.ts:49](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L49)

___

### requestId

• `Optional` **requestId**: *string*

Request ID

Generated per request using Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

Defined in: [graphql/context.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L27)

___

### subscription

• `Optional` **subscription**: [*Subscription*](graphql.subscription.md)

Subscription

Defined in: [graphql/context.ts:54](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L54)

___

### user

• `Optional` **user**: *Record*<string, any\>

User object

Defined in: [graphql/context.ts:37](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L37)

___

### userConfiguration

• `Optional` **userConfiguration**: *Record*<string, any\>

User configuration

Defined in: [graphql/context.ts:42](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L42)

___

### userId

• `Optional` **userId**: *string*

User ID

Defined in: [graphql/context.ts:32](https://github.com/Puzzlepart/did/blob/dev/server/graphql/context.ts#L32)
