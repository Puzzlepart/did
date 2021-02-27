[did-server](../README.md) / [services](../modules/services.md) / SubscriptionService

# Class: SubscriptionService

[services](../modules/services.md).SubscriptionService

## Hierarchy

* *MongoDocumentService*<Subscription\>

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

Defined in: [server/services/mongo/subscription.ts:9](https://github.com/Puzzlepart/did/blob/553eb42d/server/services/mongo/subscription.ts#L9)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/553eb42d/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<Subscription\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/553eb42d/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### \_replaceId

▸ `Private`**_replaceId**<T\>(`subscription`: *Subscription*): T

Replace id with _id

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`subscription` | *Subscription* | Subscription    |

**Returns:** T

Defined in: [server/services/mongo/subscription.ts:19](https://github.com/Puzzlepart/did/blob/553eb42d/server/services/mongo/subscription.ts#L19)

___

### addSubscription

▸ **addSubscription**(`subscription`: *Subscription*): *Promise*<InsertOneWriteOpResult<WithId<Subscription\>\>\>

Add subscription

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`subscription` | *Subscription* | Subscription    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<Subscription\>\>\>

Defined in: [server/services/mongo/subscription.ts:48](https://github.com/Puzzlepart/did/blob/553eb42d/server/services/mongo/subscription.ts#L48)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<Subscription\>, `sort?`: S): *Promise*<Subscription[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<Subscription\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<Subscription[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/553eb42d/server/services/mongo/@document.ts#L37)

___

### getById

▸ **getById**(`id`: *string*): *Promise*<Subscription\>

Get subscription by ID

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | Subscription ID    |

**Returns:** *Promise*<Subscription\>

Defined in: [server/services/mongo/subscription.ts:31](https://github.com/Puzzlepart/did/blob/553eb42d/server/services/mongo/subscription.ts#L31)

___

### updateSubscription

▸ **updateSubscription**(`settings`: *SubscriptionSettings*): *Promise*<UpdateWriteOpResult\>

Update subscription

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`settings` | *SubscriptionSettings* | Subscription settings    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [server/services/mongo/subscription.ts:64](https://github.com/Puzzlepart/did/blob/553eb42d/server/services/mongo/subscription.ts#L64)
