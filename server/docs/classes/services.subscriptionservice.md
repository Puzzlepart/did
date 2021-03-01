[did-server - v0.10.0](../README.md) / [services](../modules/services.md) / SubscriptionService

# Class: SubscriptionService

[services](../modules/services.md).SubscriptionService

## Hierarchy

* *MongoDocumentService*<[*Subscription*](graphql.subscription.md)\>

  ↳ **SubscriptionService**

## Table of contents

### Constructors

- [constructor](services.subscriptionservice.md#constructor)

### Properties

- [cache](services.subscriptionservice.md#cache)
- [cachePrefix](services.subscriptionservice.md#cacheprefix)
- [collection](services.subscriptionservice.md#collection)
- [collectionName](services.subscriptionservice.md#collectionname)
- [context](services.subscriptionservice.md#context)

### Methods

- [\_replaceId](services.subscriptionservice.md#_replaceid)
- [addSubscription](services.subscriptionservice.md#addsubscription)
- [find](services.subscriptionservice.md#find)
- [getById](services.subscriptionservice.md#getbyid)
- [updateSubscription](services.subscriptionservice.md#updatesubscription)

## Constructors

### constructor

\+ **new SubscriptionService**(`context`: [*Context*](graphql_context.context.md)): [*SubscriptionService*](services.subscriptionservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** [*SubscriptionService*](services.subscriptionservice.md)

Defined in: [server/services/mongo/subscription.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L11)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*Subscription*](graphql.subscription.md)\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### \_replaceId

▸ `Private`**_replaceId**<T\>(`subscription`: [*Subscription*](graphql.subscription.md)): T

Replace id with _id

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`subscription` | [*Subscription*](graphql.subscription.md) | Subscription    |

**Returns:** T

Defined in: [server/services/mongo/subscription.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L21)

___

### addSubscription

▸ **addSubscription**(`subscription`: [*Subscription*](graphql.subscription.md)): *Promise*<InsertOneWriteOpResult<WithId<[*Subscription*](graphql.subscription.md)\>\>\>

Add subscription

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`subscription` | [*Subscription*](graphql.subscription.md) | Subscription    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*Subscription*](graphql.subscription.md)\>\>\>

Defined in: [server/services/mongo/subscription.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L50)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*Subscription*](graphql.subscription.md)\>, `sort?`: S): *Promise*<[*Subscription*](graphql.subscription.md)[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Subscription*](graphql.subscription.md)\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*Subscription*](graphql.subscription.md)[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L37)

___

### getById

▸ **getById**(`id`: *string*): *Promise*<[*Subscription*](graphql.subscription.md)\>

Get subscription by ID

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | Subscription ID    |

**Returns:** *Promise*<[*Subscription*](graphql.subscription.md)\>

Defined in: [server/services/mongo/subscription.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L33)

___

### updateSubscription

▸ **updateSubscription**(`settings`: [*SubscriptionSettings*](graphql.subscriptionsettings.md)): *Promise*<UpdateWriteOpResult\>

Update subscription

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`settings` | [*SubscriptionSettings*](graphql.subscriptionsettings.md) | Subscription settings    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [server/services/mongo/subscription.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L66)
