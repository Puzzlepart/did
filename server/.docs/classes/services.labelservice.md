[did-server - v0.11.2](../README.md) / [Services](../modules/services.md) / LabelService

# Class: LabelService

[Services](../modules/services.md).LabelService

Label service

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

\+ **new LabelService**(`context`: *Context*): [*LabelService*](services.labelservice.md)

Constructor for `LabelService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*LabelService*](services.labelservice.md)

Overrides: void

Defined in: [services/mongo/label.ts:20](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L20)

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

• **collection**: *Collection*<[*LabelObject*](graphql.labelobject.md)\>

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

▸ `Private`**_generateId**(`label`: [*LabelObject*](graphql.labelobject.md)): *string*

Generate id for a label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelObject*](graphql.labelobject.md) | Label    |

**Returns:** *string*

Defined in: [services/mongo/label.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L35)

___

### addLabel

▸ **addLabel**(`label`: [*LabelObject*](graphql.labelobject.md)): *Promise*<InsertOneWriteOpResult<WithId<[*LabelObject*](graphql.labelobject.md)\>\>\>

Add label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelObject*](graphql.labelobject.md) | Label    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*LabelObject*](graphql.labelobject.md)\>\>\>

Defined in: [services/mongo/label.ts:58](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L58)

___

### deleteLabel

▸ **deleteLabel**(`name`: *string*): *Promise*<DeleteWriteOpResultObject\>

Delete label by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<DeleteWriteOpResultObject\>

Defined in: [services/mongo/label.ts:90](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L90)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*LabelObject*](graphql.labelobject.md)\>, `sort?`: S): *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Wrapper on _.find().toArray()

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

Inherited from: void

Defined in: [services/mongo/@document.ts:70](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L70)

___

### getLabels

▸ **getLabels**(`query?`: *FilterQuery*<[*LabelObject*](graphql.labelobject.md)\>): *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Get labels

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*LabelObject*](graphql.labelobject.md)\> | Query    |

**Returns:** *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Defined in: [services/mongo/label.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L44)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:100](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L100)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L83)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:116](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L116)

___

### updateLabel

▸ **updateLabel**(`label`: [*LabelObject*](graphql.labelobject.md)): *Promise*<void\>

Update label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelObject*](graphql.labelobject.md) | Label    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/label.ts:77](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L77)
