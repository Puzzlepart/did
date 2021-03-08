[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / ConfirmedPeriodsService

# Class: ConfirmedPeriodsService

[services](../modules/services.md).ConfirmedPeriodsService

## Hierarchy

* *MongoDocumentService*<any\>

  ↳ **ConfirmedPeriodsService**

## Table of contents

### Constructors

- [constructor](services.confirmedperiodsservice.md#constructor)

### Properties

- [cache](services.confirmedperiodsservice.md#cache)
- [cachePrefix](services.confirmedperiodsservice.md#cacheprefix)
- [collection](services.confirmedperiodsservice.md#collection)
- [collectionName](services.confirmedperiodsservice.md#collectionname)
- [context](services.confirmedperiodsservice.md#context)

### Methods

- [find](services.confirmedperiodsservice.md#find)
- [insert](services.confirmedperiodsservice.md#insert)
- [insertMultiple](services.confirmedperiodsservice.md#insertmultiple)
- [update](services.confirmedperiodsservice.md#update)

## Constructors

### constructor

\+ **new ConfirmedPeriodsService**(`context`: [*Context*](graphql_context.context.md)): [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md)

Constructor for ConfirmedPeriodsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi    |

**Returns:** [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md)

Defined in: [server/services/mongo/confirmed_periods.ts:7](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/confirmed_periods.ts#L7)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:8](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L8)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<any\>

Defined in: [server/services/mongo/@document.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L9)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### find

▸ **find**<S\>(`query`: *FilterQuery*<any\>, `sort?`: S): *Promise*<any[]\>

Wrapper on find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<any\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<any[]\>

Defined in: [server/services/mongo/@document.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L39)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<any\>\>

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<any\>\>

Defined in: [server/services/mongo/@document.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L66)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<any\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<any\>\>

Defined in: [server/services/mongo/@document.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L50)

___

### update

▸ **update**(`query`: *FilterQuery*<any\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<any\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [server/services/mongo/@document.ts:82](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L82)