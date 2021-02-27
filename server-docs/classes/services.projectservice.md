[did-server](../README.md) / [services](../modules/services.md) / ProjectService

# Class: ProjectService

[services](../modules/services.md).ProjectService

## Hierarchy

* *MongoDocumentService*<Project\>

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

Defined in: [server/services/mongo/project.ts:21](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/project.ts#L21)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<Project\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### addProject

▸ **addProject**(`project`: *Project*): *Promise*<string\>

Add project

Returns the ID of the added project

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`project` | *Project* | Project to add    |

**Returns:** *Promise*<string\>

Defined in: [server/services/mongo/project.ts:41](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/project.ts#L41)

___

### find

▸ **find**(`query`: *FilterQuery*<Project\>, `sort?`: [*string*, *number*][] \| { [key: string]: V;  } \| { `_id?`: *number* \| { `$meta?`: MetaSortOperators  } ; `customer?`: *number* \| { `$meta?`: MetaSortOperators  } ; `customerKey?`: *number* \| { `$meta?`: MetaSortOperators  } ; `description?`: *number* \| { `$meta?`: MetaSortOperators  } ; `externalSystemURL?`: *number* \| { `$meta?`: MetaSortOperators  } ; `icon?`: *number* \| { `$meta?`: MetaSortOperators  } ; `inactive?`: *number* \| { `$meta?`: MetaSortOperators  } ; `key?`: *number* \| { `$meta?`: MetaSortOperators  } ; `labels?`: *number* \| { `$meta?`: MetaSortOperators  } ; `name?`: *number* \| { `$meta?`: MetaSortOperators  } ; `outlookCategory?`: *number* \| { `$meta?`: MetaSortOperators  } ; `tag?`: *number* \| { `$meta?`: MetaSortOperators  } ; `webLink?`: *number* \| { `$meta?`: MetaSortOperators  }  }): *Promise*<Project[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<Project\> | Query   |
`sort?` | [*string*, *number*][] \| { [key: string]: V;  } \| { `_id?`: *number* \| { `$meta?`: MetaSortOperators  } ; `customer?`: *number* \| { `$meta?`: MetaSortOperators  } ; `customerKey?`: *number* \| { `$meta?`: MetaSortOperators  } ; `description?`: *number* \| { `$meta?`: MetaSortOperators  } ; `externalSystemURL?`: *number* \| { `$meta?`: MetaSortOperators  } ; `icon?`: *number* \| { `$meta?`: MetaSortOperators  } ; `inactive?`: *number* \| { `$meta?`: MetaSortOperators  } ; `key?`: *number* \| { `$meta?`: MetaSortOperators  } ; `labels?`: *number* \| { `$meta?`: MetaSortOperators  } ; `name?`: *number* \| { `$meta?`: MetaSortOperators  } ; `outlookCategory?`: *number* \| { `$meta?`: MetaSortOperators  } ; `tag?`: *number* \| { `$meta?`: MetaSortOperators  } ; `webLink?`: *number* \| { `$meta?`: MetaSortOperators  }  } | Sort options    |

**Returns:** *Promise*<Project[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L37)

___

### getProjectsData

▸ **getProjectsData**(`query?`: *FilterQuery*<Project\>): *Promise*<ProjectsData\>

Get projects, customers and labels.

Projects are sorted by the name property

Connects labels and customer to projects

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<Project\> | Query    |

**Returns:** *Promise*<ProjectsData\>

Defined in: [server/services/mongo/project.ts:85](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/project.ts#L85)

___

### updateProject

▸ **updateProject**(`project`: *Project*): *Promise*<boolean\>

Update project

Returns true if the operation was successful

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`project` | *Project* | Project to update    |

**Returns:** *Promise*<boolean\>

Defined in: [server/services/mongo/project.ts:63](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/project.ts#L63)
