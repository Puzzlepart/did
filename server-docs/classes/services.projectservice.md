[did-server](../README.md) / [services](../modules/services.md) / ProjectService

# Class: ProjectService

[services](../modules/services.md).ProjectService

## Hierarchy

* *MongoDocumentService*<[*Project*](graphql.project.md)\>

  ↳ **ProjectService**

## Table of contents

### Constructors

- [constructor](services.projectservice.md#constructor)

### Properties

- [\_customer](services.projectservice.md#_customer)
- [\_label](services.projectservice.md#_label)
- [cache](services.projectservice.md#cache)
- [cachePrefix](services.projectservice.md#cacheprefix)
- [collection](services.projectservice.md#collection)
- [collectionName](services.projectservice.md#collectionname)
- [context](services.projectservice.md#context)

### Methods

- [addProject](services.projectservice.md#addproject)
- [find](services.projectservice.md#find)
- [getProjectsData](services.projectservice.md#getprojectsdata)
- [updateProject](services.projectservice.md#updateproject)

## Constructors

### constructor

\+ **new ProjectService**(`context`: [*Context*](graphql_context.context.md)): [*ProjectService*](services.projectservice.md)

Constructor for MongoDatabase

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Context    |

**Returns:** [*ProjectService*](services.projectservice.md)

Defined in: [server/services/mongo/project.ts:21](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/project.ts#L21)

## Properties

### \_customer

• `Private` **\_customer**: [*CustomerService*](services.customerservice.md)

Defined in: [server/services/mongo/project.ts:20](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/project.ts#L20)

___

### \_label

• `Private` **\_label**: *LabelService*

Defined in: [server/services/mongo/project.ts:21](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/project.ts#L21)

___

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*Project*](graphql.project.md)\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

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

Defined in: [server/services/mongo/project.ts:41](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/project.ts#L41)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*Project*](graphql.project.md)\>, `sort?`: S): *Promise*<[*Project*](graphql.project.md)[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Project*](graphql.project.md)\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*Project*](graphql.project.md)[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/@document.ts#L37)

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

Defined in: [server/services/mongo/project.ts:85](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/project.ts#L85)

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

Defined in: [server/services/mongo/project.ts:63](https://github.com/Puzzlepart/did/blob/5da6768a/server/services/mongo/project.ts#L63)
