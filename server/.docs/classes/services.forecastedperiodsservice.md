[did-server - v0.13.0](../README.md) / [Services](../modules/services.md) / ForecastedPeriodsService

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

\+ **new ForecastedPeriodsService**(`context`: [*Context*](graphql.context.md)): [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)

Constructor for `ForecastedPeriodsService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql.context.md) | Injected context through `typedi`    |

**Returns:** [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)

Overrides: void

Defined in: [services/mongo/forecasted_periods.ts:12](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/forecasted_periods.ts#L12)

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

• **collection**: *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### collectionName

• **collectionName**: *string*

Inherited from: void

___

### context

• `Readonly` **context**: [*Context*](graphql.context.md)

Inherited from: void

## Methods

### find

▸ **find**<S\>(`query`: *any*, `sort?`: S): *Promise*<any[]\>

Wrapper on _.find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<any[]\>

Inherited from: void

Defined in: [services/mongo/@document.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L68)

___

### insert

▸ **insert**(`document_`: *any*): *any*

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:98](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L98)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *any*

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L81)

___

### update

▸ **update**(`query`: *any*, `document_`: *any*): *any*

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | Query   |
`document_` | *any* | Document    |

**Returns:** *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:114](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L114)
