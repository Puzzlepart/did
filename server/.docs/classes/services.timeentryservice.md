[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / TimeEntryService

# Class: TimeEntryService

[services](../modules/services.md).TimeEntryService

## Hierarchy

* *MongoDocumentService*<[*TimeEntry*](graphql.timeentry.md)\>

  ↳ **TimeEntryService**

## Table of contents

### Constructors

- [constructor](services.timeentryservice.md#constructor)

### Properties

- [cache](services.timeentryservice.md#cache)
- [cachePrefix](services.timeentryservice.md#cacheprefix)
- [collection](services.timeentryservice.md#collection)
- [collectionName](services.timeentryservice.md#collectionname)
- [context](services.timeentryservice.md#context)

### Methods

- [find](services.timeentryservice.md#find)
- [insert](services.timeentryservice.md#insert)
- [update](services.timeentryservice.md#update)

## Constructors

### constructor

\+ **new TimeEntryService**(`context`: [*Context*](graphql_context.context.md)): [*TimeEntryService*](services.timeentryservice.md)

Constructor for ReportsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi    |

**Returns:** [*TimeEntryService*](services.timeentryservice.md)

Defined in: [server/services/mongo/time_entry.ts:7](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/time_entry.ts#L7)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:8](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L8)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*TimeEntry*](graphql.timeentry.md)\>

Defined in: [server/services/mongo/@document.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L9)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

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
`query` | *FilterQuery*<[*TimeEntry*](graphql.timeentry.md)\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Defined in: [server/services/mongo/@document.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L39)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*TimeEntry*](graphql.timeentry.md)\>\>\>

Wrapper on insertOne() that also updates `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*TimeEntry*](graphql.timeentry.md)\>\>\>

Defined in: [server/services/mongo/@document.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L50)

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

Defined in: [server/services/mongo/@document.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L66)
