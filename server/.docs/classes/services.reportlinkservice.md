[did-server - v0.12.0](../README.md) / [Services](../modules/services.md) / ReportLinkService

# Class: ReportLinkService

[Services](../modules/services.md).ReportLinkService

Report links service

## Hierarchy

* *MongoDocumentService*<[*ReportLink*](graphql.reportlink.md)\>

  ↳ **ReportLinkService**

## Table of contents

### Constructors

- [constructor](services.reportlinkservice.md#constructor)

### Properties

- [cache](services.reportlinkservice.md#cache)
- [cachePrefix](services.reportlinkservice.md#cacheprefix)
- [collection](services.reportlinkservice.md#collection)
- [collectionName](services.reportlinkservice.md#collectionname)
- [context](services.reportlinkservice.md#context)

### Methods

- [\_generateId](services.reportlinkservice.md#_generateid)
- [addReportLink](services.reportlinkservice.md#addreportlink)
- [deleteReportLink](services.reportlinkservice.md#deletereportlink)
- [find](services.reportlinkservice.md#find)
- [getReportLinks](services.reportlinkservice.md#getreportlinks)
- [insert](services.reportlinkservice.md#insert)
- [insertMultiple](services.reportlinkservice.md#insertmultiple)
- [update](services.reportlinkservice.md#update)
- [updateReportLink](services.reportlinkservice.md#updatereportlink)

## Constructors

### constructor

\+ **new ReportLinkService**(`context`: *Context*): [*ReportLinkService*](services.reportlinkservice.md)

Constructor for `ReportLinkService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*ReportLinkService*](services.reportlinkservice.md)

Overrides: void

Defined in: [services/mongo/reportLink.ts:20](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reportLink.ts#L20)

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

• **collection**: *Collection*<[*ReportLink*](graphql.reportlink.md)\>

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

### \_generateId

▸ `Private`**_generateId**(`reportLink`: [*ReportLink*](graphql.reportlink.md)): *string*

Generate id for a report link

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reportLink` | [*ReportLink*](graphql.reportlink.md) | Label    |

**Returns:** *string*

Defined in: [services/mongo/reportLink.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reportLink.ts#L35)

___

### addReportLink

▸ **addReportLink**(`reportLink`: [*ReportLink*](graphql.reportlink.md)): *Promise*<InsertOneWriteOpResult<WithId<[*ReportLink*](graphql.reportlink.md)\>\>\>

Add report link

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reportLink` | [*ReportLink*](graphql.reportlink.md) | Report link    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*ReportLink*](graphql.reportlink.md)\>\>\>

Defined in: [services/mongo/reportLink.ts:60](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reportLink.ts#L60)

___

### deleteReportLink

▸ **deleteReportLink**(`name`: *string*): *Promise*<DeleteWriteOpResultObject\>

Delete report link by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<DeleteWriteOpResultObject\>

Defined in: [services/mongo/reportLink.ts:96](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reportLink.ts#L96)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*ReportLink*](graphql.reportlink.md)\>, `sort?`: S): *Promise*<[*ReportLink*](graphql.reportlink.md)[]\>

Wrapper on _.find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*ReportLink*](graphql.reportlink.md)\> | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*ReportLink*](graphql.reportlink.md)[]\>

Inherited from: void

Defined in: [services/mongo/@document.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L68)

___

### getReportLinks

▸ **getReportLinks**(`query?`: *FilterQuery*<[*ReportLink*](graphql.reportlink.md)\>): *Promise*<[*ReportLink*](graphql.reportlink.md)[]\>

Get report links using the specified query.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*ReportLink*](graphql.reportlink.md)\> | Query    |

**Returns:** *Promise*<[*ReportLink*](graphql.reportlink.md)[]\>

Defined in: [services/mongo/reportLink.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reportLink.ts#L44)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*ReportLink*](graphql.reportlink.md)\>\>\>

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*ReportLink*](graphql.reportlink.md)\>\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:98](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L98)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<WithId<[*ReportLink*](graphql.reportlink.md)\>\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*ReportLink*](graphql.reportlink.md)\>\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L81)

___

### update

▸ **update**(`query`: *FilterQuery*<[*ReportLink*](graphql.reportlink.md)\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*ReportLink*](graphql.reportlink.md)\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Inherited from: void

Defined in: [services/mongo/@document.ts:114](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L114)

___

### updateReportLink

▸ **updateReportLink**(`reportLink`: [*ReportLink*](graphql.reportlink.md)): *Promise*<void\>

Update report link

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reportLink` | [*ReportLink*](graphql.reportlink.md) | Report link    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/reportLink.ts:80](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/reportLink.ts#L80)
