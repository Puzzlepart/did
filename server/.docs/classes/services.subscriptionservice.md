[did-server - v0.11.0](../README.md) / [Services](../modules/services.md) / SubscriptionService

# Class: SubscriptionService

[Services](../modules/services.md).SubscriptionService

Subscription service

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
- [getByExternalId](services.subscriptionservice.md#getbyexternalid)
- [getById](services.subscriptionservice.md#getbyid)
- [insert](services.subscriptionservice.md#insert)
- [insertMultiple](services.subscriptionservice.md#insertmultiple)
- [registerExternalUser](services.subscriptionservice.md#registerexternaluser)
- [update](services.subscriptionservice.md#update)
- [updateSubscription](services.subscriptionservice.md#updatesubscription)

## Constructors

### constructor

\+ **new SubscriptionService**(`context`: *Context*): [*SubscriptionService*](services.subscriptionservice.md)

Constructor for `SubscriptionService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*SubscriptionService*](services.subscriptionservice.md)

Overrides: void

Defined in: [services/mongo/subscription.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L18)

## Properties

### cache

• **cache**: [*CacheService*](services.cacheservice.md)= null

Inherited from: void

Defined in: [services/mongo/@document.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L9)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

Inherited from: void

___

### collection

• **collection**: *Collection*<[*Subscription*](graphql.subscription.md)\>

Inherited from: void

Defined in: [services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### collectionName

• **collectionName**: *string*

Inherited from: void

___

### context

• `Readonly` **context**: *Context*

Inherited from: void

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

Defined in: [services/mongo/subscription.ts:38](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L38)

___

### addSubscription

▸ **addSubscription**(`subscription`: [*Subscription*](graphql.subscription.md)): *Promise*<InsertOneWriteOpResult<WithId<[*Subscription*](graphql.subscription.md)\>\>\>

Add subscription

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`subscription` | [*Subscription*](graphql.subscription.md) | Subscription    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*Subscription*](graphql.subscription.md)\>\>\>

Defined in: [services/mongo/subscription.ts:93](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L93)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*Subscription*](graphql.subscription.md)\>, `sort?`: S): *Promise*<[*Subscription*](graphql.subscription.md)[]\>

Wrapper on _.find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Subscription*](graphql.subscription.md)\> | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*Subscription*](graphql.subscription.md)[]\>

Inherited from: void

Defined in: [services/mongo/@document.ts:70](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L70)

___

### getByExternalId

▸ **getByExternalId**(`idOrMail`: *string*, `provider`: *string*): *Promise*<{ `_id?`: *string* ; `db?`: *string* ; `id`: *string* ; `name`: *string* ; `owner`: *string* ; `settings?`: [*SubscriptionSettings*](graphql.subscriptionsettings.md)  }\>

Get subscription by external id or email

**`remarks`** Returns null if no subscription is found.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`idOrMail` | *string* | User ID or mail   |
`provider` | *string* | Provider    |

**Returns:** *Promise*<{ `_id?`: *string* ; `db?`: *string* ; `id`: *string* ; `name`: *string* ; `owner`: *string* ; `settings?`: [*SubscriptionSettings*](graphql.subscriptionsettings.md)  }\>

Defined in: [services/mongo/subscription.ts:73](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L73)

___

### getById

▸ **getById**(`id`: *string*): *Promise*<[*Subscription*](graphql.subscription.md)\>

Get subscription by ID

**`remarks`** Returns null if no subscription is found.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | Subscription ID    |

**Returns:** *Promise*<[*Subscription*](graphql.subscription.md)\>

Defined in: [services/mongo/subscription.ts:52](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L52)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*Subscription*](graphql.subscription.md)\>\>\>

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*Subscription*](graphql.subscription.md)\>\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:100](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L100)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<WithId<[*Subscription*](graphql.subscription.md)\>\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*Subscription*](graphql.subscription.md)\>\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L83)

___

### registerExternalUser

▸ **registerExternalUser**(`provider`: *string*, `mail`: *string*): *Promise*<UpdateWriteOpResult\>

Register external user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`provider` | *string* | Provider   |
`mail` | *string* | Email address    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [services/mongo/subscription.ts:127](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L127)

___

### update

▸ **update**(`query`: *FilterQuery*<[*Subscription*](graphql.subscription.md)\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Subscription*](graphql.subscription.md)\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Inherited from: void

Defined in: [services/mongo/@document.ts:116](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L116)

___

### updateSubscription

▸ **updateSubscription**(`settings`: [*SubscriptionSettings*](graphql.subscriptionsettings.md)): *Promise*<UpdateWriteOpResult\>

Update subscription

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`settings` | [*SubscriptionSettings*](graphql.subscriptionsettings.md) | Subscription settings    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [services/mongo/subscription.ts:109](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/subscription.ts#L109)
