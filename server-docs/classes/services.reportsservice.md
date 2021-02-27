[did-server](../README.md) / [services](../modules/services.md) / ReportsService

# Class: ReportsService

[services](../modules/services.md).ReportsService

## Hierarchy

* *MongoDocumentService*<[*TimeEntry*](graphql.timeentry.md)\>

  ↳ **ReportsService**

## Table of contents

### Constructors

- [constructor](services.reportsservice.md#constructor)

### Properties

- [\_project](services.reportsservice.md#_project)
- [\_user](services.reportsservice.md#_user)
- [cache](services.reportsservice.md#cache)
- [cachePrefix](services.reportsservice.md#cacheprefix)
- [collection](services.reportsservice.md#collection)
- [collectionName](services.reportsservice.md#collectionname)
- [context](services.reportsservice.md#context)

### Methods

- [find](services.reportsservice.md#find)
- [getReport](services.reportsservice.md#getreport)

## Constructors

### constructor

\+ **new ReportsService**(`context`: [*Context*](graphql_context.context.md)): [*ReportsService*](services.reportsservice.md)

Constructor for ReportsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Context    |

**Returns:** [*ReportsService*](services.reportsservice.md)

Defined in: [server/services/mongo/reports.ts:13](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/reports.ts#L13)

## Properties

### \_project

• `Private` **\_project**: [*ProjectService*](services.projectservice.md)

Defined in: [server/services/mongo/reports.ts:12](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/reports.ts#L12)

___

### \_user

• `Private` **\_user**: [*UserService*](services.userservice.md)

Defined in: [server/services/mongo/reports.ts:13](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/reports.ts#L13)

___

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*TimeEntry*](graphql.timeentry.md)\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/@document.ts#L7)

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

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/@document.ts#L37)

___

### getReport

▸ **getReport**(`query`: [*ReportsQuery*](graphql.reportsquery.md), `sortAsc`: *boolean*): *Promise*<Report\>

Get report

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*ReportsQuery*](graphql.reportsquery.md) | Query   |
`sortAsc` | *boolean* | Sort ascending    |

**Returns:** *Promise*<Report\>

Defined in: [server/services/mongo/reports.ts:32](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/reports.ts#L32)
