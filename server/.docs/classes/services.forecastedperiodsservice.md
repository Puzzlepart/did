[did-server - v0.9.11](../README.md) / [Services](../modules/services.md) / ForecastedPeriodsService

# Class: ForecastedPeriodsService

[Services](../modules/services.md).ForecastedPeriodsService

Forecasted periods service

## Hierarchy

* *MongoDocumentService*<any\>

  ↳ **ForecastedPeriodsService**

## Table of contents

### Constructors

- [constructor](services.forecastedperiodsservice.md#constructor)

### Properties

- [cache](services.forecastedperiodsservice.md#cache)
- [cachePrefix](services.forecastedperiodsservice.md#cacheprefix)
- [collection](services.forecastedperiodsservice.md#collection)
- [collectionName](services.forecastedperiodsservice.md#collectionname)
- [context](services.forecastedperiodsservice.md#context)

### Methods

- [find](services.forecastedperiodsservice.md#find)
- [insert](services.forecastedperiodsservice.md#insert)
- [insertMultiple](services.forecastedperiodsservice.md#insertmultiple)
- [update](services.forecastedperiodsservice.md#update)

## Constructors

### constructor

\+ **new ForecastedPeriodsService**(`context`: *Context*): [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)

Constructor for `ForecastedPeriodsService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)

Overrides: void

Defined in: [services/mongo/forecasted_periods.ts:13](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/forecasted_periods.ts#L13)

## Properties

### cache

• **cache**: [*CacheService*](services.cacheservice.md)= null

Inherited from: void

Defined in: [services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

Inherited from: void

___

### collection

• **collection**: *Collection*<any\>

Inherited from: void

Defined in: [services/mongo/@document.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L11)

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

Wrapper on find().toArray()

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

Defined in: [services/mongo/@document.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L71)

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

Defined in: [services/mongo/@document.ts:101](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L101)

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

Defined in: [services/mongo/@document.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L84)

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

Defined in: [services/mongo/@document.ts:117](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L117)
