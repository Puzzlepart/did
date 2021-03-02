[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / ReportsService

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

- [\_generatePresetQuery](services.reportsservice.md#_generatepresetquery)
- [\_generateReport](services.reportsservice.md#_generatereport)
- [find](services.reportsservice.md#find)
- [getReport](services.reportsservice.md#getreport)
- [getUserReport](services.reportsservice.md#getuserreport)

## Constructors

### constructor

\+ **new ReportsService**(`context`: [*Context*](graphql_context.context.md)): [*ReportsService*](services.reportsservice.md)

Constructor for ReportsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Context    |

**Returns:** [*ReportsService*](services.reportsservice.md)

Defined in: [server/services/mongo/reports.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reports.ts#L30)

## Properties

### \_project

• `Private` **\_project**: [*ProjectService*](services.projectservice.md)

Defined in: [server/services/mongo/reports.ts:29](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reports.ts#L29)

___

### \_user

• `Private` **\_user**: [*UserService*](services.userservice.md)

Defined in: [server/services/mongo/reports.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reports.ts#L30)

___

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

### \_generatePresetQuery

▸ `Private`**_generatePresetQuery**(`preset`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset)): *FilterQuery*<[*TimeEntry*](graphql.timeentry.md)\>

Generate preset query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query preset    |

**Returns:** *FilterQuery*<[*TimeEntry*](graphql.timeentry.md)\>

Defined in: [server/services/mongo/reports.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reports.ts#L48)

___

### \_generateReport

▸ `Private`**_generateReport**(`__namedParameters`: IGenerateReportParameters): *any*[]

Generate report

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IGenerateReportParameters |

**Returns:** *any*[]

Defined in: [server/services/mongo/reports.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reports.ts#L83)

___

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

___

### getReport

▸ **getReport**(`preset?`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `query?`: [*ReportsQuery*](graphql.reportsquery.md), `sortAsc?`: *boolean*): *Promise*<Report\>

Get report

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset?` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query preset   |
`query` | [*ReportsQuery*](graphql.reportsquery.md) | Custom query   |
`sortAsc?` | *boolean* | Sort ascending    |

**Returns:** *Promise*<Report\>

Defined in: [server/services/mongo/reports.ts:119](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reports.ts#L119)

___

### getUserReport

▸ **getUserReport**(`preset`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `_userId`: *string*, `sortAsc?`: *boolean*): *Promise*<Report\>

Get user report using presets

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query preset   |
`_userId` | *string* | - |
`sortAsc?` | *boolean* | Sort ascending    |

**Returns:** *Promise*<Report\>

Defined in: [server/services/mongo/reports.ts:152](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reports.ts#L152)
