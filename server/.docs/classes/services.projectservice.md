[did-server - v0.11.5](../README.md) / [Services](../modules/services.md) / ProjectService

# Class: ProjectService

[Services](../modules/services.md).ProjectService

Project service

## Hierarchy

* *MongoDocumentService*<[*Project*](graphql.project.md)\>

  ↳ **ProjectService**

## Table of contents

### Constructors

- [constructor](services.projectservice.md#constructor)

### Properties

- [cache](services.projectservice.md#cache)
- [cachePrefix](services.projectservice.md#cacheprefix)
- [collection](services.projectservice.md#collection)
- [collectionName](services.projectservice.md#collectionname)
- [context](services.projectservice.md#context)

### Methods

- [addProject](services.projectservice.md#addproject)
- [find](services.projectservice.md#find)
- [getProjectsData](services.projectservice.md#getprojectsdata)
- [insert](services.projectservice.md#insert)
- [insertMultiple](services.projectservice.md#insertmultiple)
- [update](services.projectservice.md#update)
- [updateProject](services.projectservice.md#updateproject)

## Constructors

### constructor

\+ **new ProjectService**(`context`: *Context*, `_customerSvc`: [*CustomerService*](services.customerservice.md), `_labelSvc`: [*LabelService*](services.labelservice.md)): [*ProjectService*](services.projectservice.md)

Constructor for `ProjectService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`   |
`_customerSvc` | [*CustomerService*](services.customerservice.md) | Injected `CustomerService` through `typedi`   |
`_labelSvc` | [*LabelService*](services.labelservice.md) | Injected `LabelService` through `typedi`    |

**Returns:** [*ProjectService*](services.projectservice.md)

Overrides: void

Defined in: [services/mongo/project.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/project.ts#L27)

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

• **collection**: *Collection*<[*Project*](graphql.project.md)\>

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

### addProject

▸ **addProject**(`project`: [*Project*](graphql.project.md)): *Promise*<string\>

Add project

Returns the ID of the added project

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`project` | [*Project*](graphql.project.md) | Project to add    |

**Returns:** *Promise*<string\>

Defined in: [services/mongo/project.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/project.ts#L50)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*Project*](graphql.project.md)\>, `sort?`: S): *Promise*<[*Project*](graphql.project.md)[]\>

Wrapper on _.find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Project*](graphql.project.md)\> | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*Project*](graphql.project.md)[]\>

Inherited from: void

Defined in: [services/mongo/@document.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L68)

___

### getProjectsData

▸ **getProjectsData**(`query?`: *FilterQuery*<[*Project*](graphql.project.md)\>): *Promise*<ProjectsData\>

Get projects, customers and labels.

Projects are sorted by the name property

Connects labels and customer to projects

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*Project*](graphql.project.md)\> | Query    |

**Returns:** *Promise*<ProjectsData\>

Defined in: [services/mongo/project.ts:92](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/project.ts#L92)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*Project*](graphql.project.md)\>\>\>

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*Project*](graphql.project.md)\>\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:98](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L98)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<WithId<[*Project*](graphql.project.md)\>\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*Project*](graphql.project.md)\>\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L81)

___

### update

▸ **update**(`query`: *FilterQuery*<[*Project*](graphql.project.md)\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Project*](graphql.project.md)\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Inherited from: void

Defined in: [services/mongo/@document.ts:114](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L114)

___

### updateProject

▸ **updateProject**(`project`: [*Project*](graphql.project.md)): *Promise*<boolean\>

Update project

Returns true if the operation was successful

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`project` | [*Project*](graphql.project.md) | Project to update    |

**Returns:** *Promise*<boolean\>

Defined in: [services/mongo/project.ts:72](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/project.ts#L72)
