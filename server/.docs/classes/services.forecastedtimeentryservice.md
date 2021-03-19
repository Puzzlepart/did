[did-server - v0.9.11](../README.md) / [Services](../modules/services.md) / ForecastedTimeEntryService

# Class: ForecastedTimeEntryService

[Services](../modules/services.md).ForecastedTimeEntryService

Forecasted time entries service

## Hierarchy

* *MongoDocumentService*<[*TimeEntry*](graphql.timeentry.md)\>

  ↳ **ForecastedTimeEntryService**

## Table of contents

### Constructors

- [constructor](services.forecastedtimeentryservice.md#constructor)

### Properties

- [cache](services.forecastedtimeentryservice.md#cache)
- [cachePrefix](services.forecastedtimeentryservice.md#cacheprefix)
- [collection](services.forecastedtimeentryservice.md#collection)
- [collectionName](services.forecastedtimeentryservice.md#collectionname)
- [context](services.forecastedtimeentryservice.md#context)

### Methods

- [find](services.forecastedtimeentryservice.md#find)
- [insert](services.forecastedtimeentryservice.md#insert)
- [insertMultiple](services.forecastedtimeentryservice.md#insertmultiple)
- [update](services.forecastedtimeentryservice.md#update)

## Constructors

### constructor

\+ **new ForecastedTimeEntryService**(`context`: *Context*): [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md)

Constructor for `ForecastedTimeEntryService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md)

Defined in: [services/mongo/forecasted_time_entry.ts:14](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/forecasted_time_entry.ts#L14)

## Properties

### cache

• **cache**: [*CacheService*](services.cacheservice.md)= null

Defined in: [services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*TimeEntry*](graphql.timeentry.md)\>

Defined in: [services/mongo/@document.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L11)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: *Context*

## Methods

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*TimeEntry*](graphql.timeentry.md)\>, `sort?`: S): *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Wrapper on find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*TimeEntry*](graphql.timeentry.md)\> | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Defined in: [services/mongo/@document.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L71)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*TimeEntry*](graphql.timeentry.md)\>\>\>

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*TimeEntry*](graphql.timeentry.md)\>\>\>

Defined in: [services/mongo/@document.ts:101](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L101)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<WithId<[*TimeEntry*](graphql.timeentry.md)\>\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*TimeEntry*](graphql.timeentry.md)\>\>\>

Defined in: [services/mongo/@document.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L84)

___

### update

▸ **update**(`query`: *FilterQuery*<[*TimeEntry*](graphql.timeentry.md)\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*TimeEntry*](graphql.timeentry.md)\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [services/mongo/@document.ts:117](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L117)
