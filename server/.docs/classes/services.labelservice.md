[did-server - v0.9.9](../README.md) / [services](../modules/services.md) / LabelService

# Class: LabelService

[services](../modules/services.md).LabelService

## Hierarchy

* *MongoDocumentService*<[*LabelObject*](graphql.labelobject.md)\>

  ↳ **LabelService**

## Table of contents

### Constructors

- [constructor](services.labelservice.md#constructor)

### Properties

- [cache](services.labelservice.md#cache)
- [cachePrefix](services.labelservice.md#cacheprefix)
- [collection](services.labelservice.md#collection)
- [collectionName](services.labelservice.md#collectionname)
- [context](services.labelservice.md#context)

### Methods

- [\_generateId](services.labelservice.md#_generateid)
- [addLabel](services.labelservice.md#addlabel)
- [deleteLabel](services.labelservice.md#deletelabel)
- [find](services.labelservice.md#find)
- [getLabels](services.labelservice.md#getlabels)
- [insert](services.labelservice.md#insert)
- [insertMultiple](services.labelservice.md#insertmultiple)
- [update](services.labelservice.md#update)
- [updateLabel](services.labelservice.md#updatelabel)

## Constructors

### constructor

\+ **new LabelService**(`context`: [*Context*](graphql_context.context.md)): [*LabelService*](services.labelservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** [*LabelService*](services.labelservice.md)

Defined in: [server/services/mongo/label.ts:14](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L14)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*LabelObject*](graphql.labelobject.md)\>

Defined in: [server/services/mongo/@document.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L11)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### \_generateId

▸ `Private`**_generateId**(`label`: [*LabelObject*](graphql.labelobject.md)): *string*

Generate id for a label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelObject*](graphql.labelobject.md) | Label    |

**Returns:** *string*

Defined in: [server/services/mongo/label.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L24)

___

### addLabel

▸ **addLabel**(`label`: [*LabelObject*](graphql.labelobject.md)): *Promise*<InsertOneWriteOpResult<WithId<[*LabelObject*](graphql.labelobject.md)\>\>\>

Add label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelObject*](graphql.labelobject.md) | Label    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*LabelObject*](graphql.labelobject.md)\>\>\>

Defined in: [server/services/mongo/label.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L47)

___

### deleteLabel

▸ **deleteLabel**(`name`: *string*): *Promise*<DeleteWriteOpResultObject\>

Delete label by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<DeleteWriteOpResultObject\>

Defined in: [server/services/mongo/label.ts:79](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L79)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*LabelObject*](graphql.labelobject.md)\>, `sort?`: S): *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Wrapper on find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*LabelObject*](graphql.labelobject.md)\> | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Defined in: [server/services/mongo/@document.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L71)

___

### getLabels

▸ **getLabels**(`query?`: *FilterQuery*<[*LabelObject*](graphql.labelobject.md)\>): *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Get labels

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*LabelObject*](graphql.labelobject.md)\> | Query    |

**Returns:** *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Defined in: [server/services/mongo/label.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L33)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*LabelObject*](graphql.labelobject.md)\>\>\>

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*LabelObject*](graphql.labelobject.md)\>\>\>

Defined in: [server/services/mongo/@document.ts:101](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L101)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<WithId<[*LabelObject*](graphql.labelobject.md)\>\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*LabelObject*](graphql.labelobject.md)\>\>\>

Defined in: [server/services/mongo/@document.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L84)

___

### update

▸ **update**(`query`: *FilterQuery*<[*LabelObject*](graphql.labelobject.md)\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*LabelObject*](graphql.labelobject.md)\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [server/services/mongo/@document.ts:117](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L117)

___

### updateLabel

▸ **updateLabel**(`label`: [*LabelObject*](graphql.labelobject.md)): *Promise*<void\>

Update label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelObject*](graphql.labelobject.md) | Label    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/label.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L66)
