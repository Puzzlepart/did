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

## Constructors

### constructor

\+ **new TimeEntryService**(`context`: [*Context*](graphql_context.context.md)): [*TimeEntryService*](services.timeentryservice.md)

Constructor for ReportsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Context    |

**Returns:** [*TimeEntryService*](services.timeentryservice.md)

Defined in: [server/services/mongo/time_entry.ts:7](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/time_entry.ts#L7)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*TimeEntry*](graphql.timeentry.md)\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L7)

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

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

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

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L37)
