[did-server](../README.md) / [services](../modules/services.md) / ReportsService

# Class: ReportsService

[services](../modules/services.md).ReportsService

## Hierarchy

* *MongoDocumentService*<TimeEntry\>

  ↳ **ReportsService**

## Table of contents

### Constructors

- [constructor](services.reportsservice.md#constructor)

### Properties

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

Defined in: [server/services/mongo/reports.ts:13](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/reports.ts#L13)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<TimeEntry\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### find

▸ **find**(`query`: *FilterQuery*<TimeEntry\>, `sort?`: [*string*, *number*][] \| { [key: string]: V;  } \| { `customer?`: *number* \| { `$meta?`: MetaSortOperators  } ; `description?`: *number* \| { `$meta?`: MetaSortOperators  } ; `duration?`: *number* \| { `$meta?`: MetaSortOperators  } ; `endDateTime?`: *number* \| { `$meta?`: MetaSortOperators  } ; `id?`: *number* \| { `$meta?`: MetaSortOperators  } ; `key?`: *number* \| { `$meta?`: MetaSortOperators  } ; `month?`: *number* \| { `$meta?`: MetaSortOperators  } ; `project?`: *number* \| { `$meta?`: MetaSortOperators  } ; `projectId?`: *number* \| { `$meta?`: MetaSortOperators  } ; `resource?`: *number* \| { `$meta?`: MetaSortOperators  } ; `startDateTime?`: *number* \| { `$meta?`: MetaSortOperators  } ; `title?`: *number* \| { `$meta?`: MetaSortOperators  } ; `userId?`: *number* \| { `$meta?`: MetaSortOperators  } ; `webLink?`: *number* \| { `$meta?`: MetaSortOperators  } ; `webUrl?`: *number* \| { `$meta?`: MetaSortOperators  } ; `week?`: *number* \| { `$meta?`: MetaSortOperators  } ; `year?`: *number* \| { `$meta?`: MetaSortOperators  }  }): *Promise*<TimeEntry[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<TimeEntry\> | Query   |
`sort?` | [*string*, *number*][] \| { [key: string]: V;  } \| { `customer?`: *number* \| { `$meta?`: MetaSortOperators  } ; `description?`: *number* \| { `$meta?`: MetaSortOperators  } ; `duration?`: *number* \| { `$meta?`: MetaSortOperators  } ; `endDateTime?`: *number* \| { `$meta?`: MetaSortOperators  } ; `id?`: *number* \| { `$meta?`: MetaSortOperators  } ; `key?`: *number* \| { `$meta?`: MetaSortOperators  } ; `month?`: *number* \| { `$meta?`: MetaSortOperators  } ; `project?`: *number* \| { `$meta?`: MetaSortOperators  } ; `projectId?`: *number* \| { `$meta?`: MetaSortOperators  } ; `resource?`: *number* \| { `$meta?`: MetaSortOperators  } ; `startDateTime?`: *number* \| { `$meta?`: MetaSortOperators  } ; `title?`: *number* \| { `$meta?`: MetaSortOperators  } ; `userId?`: *number* \| { `$meta?`: MetaSortOperators  } ; `webLink?`: *number* \| { `$meta?`: MetaSortOperators  } ; `webUrl?`: *number* \| { `$meta?`: MetaSortOperators  } ; `week?`: *number* \| { `$meta?`: MetaSortOperators  } ; `year?`: *number* \| { `$meta?`: MetaSortOperators  }  } | Sort options    |

**Returns:** *Promise*<TimeEntry[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L37)

___

### getReport

▸ **getReport**(`query`: *ReportsQuery*, `sortAsc`: *boolean*): *Promise*<Report\>

Get report

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *ReportsQuery* | Query   |
`sortAsc` | *boolean* | Sort ascending    |

**Returns:** *Promise*<Report\>

Defined in: [server/services/mongo/reports.ts:32](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/reports.ts#L32)
