[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / ForecastedPeriodsService

# Class: ForecastedPeriodsService

[services](../modules/services.md).ForecastedPeriodsService

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

\+ **new ForecastedPeriodsService**(`context`: [*Context*](graphql_context.context.md)): [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)

Constructor for ForecastedPeriodsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi    |

**Returns:** [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)

Defined in: [server/services/mongo/forecasted_periods.ts:7](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/forecasted_periods.ts#L7)

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

Defined in: [server/services/mongo/@document.ts:41](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L41)

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

Defined in: [server/services/mongo/@document.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L68)

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

Defined in: [server/services/mongo/@document.ts:52](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L52)

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

Defined in: [server/services/mongo/@document.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L84)
