[did-server - v0.13.0](../README.md) / [Services](../modules/services.md) / TimeEntryService

# Class: TimeEntryService

[Services](../modules/services.md).TimeEntryService

Time entry service

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
- [insertMultiple](services.timeentryservice.md#insertmultiple)
- [update](services.timeentryservice.md#update)

## Constructors

### constructor

\+ **new TimeEntryService**(`context`: *Context*): [*TimeEntryService*](services.timeentryservice.md)

Constructor for `TimeEntryService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*TimeEntryService*](services.timeentryservice.md)

Overrides: void

Defined in: [services/mongo/time_entry.ts:13](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/time_entry.ts#L13)

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

• `Readonly` **context**: *Context*

Inherited from: void

## Methods

### find

▸ **find**<S\>(`query`: *any*, `sort?`: S): *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

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

**Returns:** *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

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
