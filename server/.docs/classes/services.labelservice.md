[did-server - v0.12.0](../README.md) / [Services](../modules/services.md) / LabelService

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

Defined in: [services/mongo/label.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L21)

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

### \_generateId

▸ `Private`**_generateId**(`label`: [*LabelObject*](graphql.labelobject.md)): *string*

Generate an ID for a label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelObject*](graphql.labelobject.md) | Label    |

**Returns:** *string*

Defined in: [services/mongo/label.ts:36](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L36)

___

### addLabel

▸ **addLabel**(`label`: [*LabelObject*](graphql.labelobject.md)): *Promise*<any\>

Add label, then clear the cache key `labels`.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelObject*](graphql.labelobject.md) | Label    |

**Returns:** *Promise*<any\>

Defined in: [services/mongo/label.ts:64](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L64)

___

### deleteLabel

▸ **deleteLabel**(`name`: *string*): *Promise*<any\>

Delete label by name, then clear the cache key `labels`.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<any\>

Defined in: [services/mongo/label.ts:98](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L98)

___

### find

▸ **find**<S\>(`query`: *any*, `sort?`: S): *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

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

**Returns:** *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Inherited from: void

Defined in: [services/mongo/@document.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L68)

___

### getLabels

▸ **getLabels**(`query?`: *any*): *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Get labels from cache or database.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *any* | Query    |

**Returns:** *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Defined in: [services/mongo/label.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L45)

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

___

### updateLabel

▸ **updateLabel**(`label`: [*LabelObject*](graphql.labelobject.md)): *Promise*<void\>

Update label, then clear the cache key `labels`.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelObject*](graphql.labelobject.md) | Label    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/label.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/label.ts#L84)
