[did-server - v0.11.5](../README.md) / [Services](../modules/services.md) / ConfirmedPeriodsService

# Class: ConfirmedPeriodsService

[Services](../modules/services.md).ConfirmedPeriodsService

Confirmed periods service

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

\+ **new ConfirmedPeriodsService**(`context`: *Context*): [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md)

Constructor for `ConfirmedPeriodsService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md)

Overrides: void

Defined in: [services/mongo/confirmed_periods.ts:12](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/confirmed_periods.ts#L12)

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

• **collection**: *Collection*<any\>

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

### find

▸ **find**<S\>(`query`: *FilterQuery*<any\>, `sort?`: S): *Promise*<any[]\>

Wrapper on _.find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<any\> | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<any[]\>

Inherited from: void

Defined in: [services/mongo/@document.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L68)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:98](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L98)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<any\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<any\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L81)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:114](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L114)
