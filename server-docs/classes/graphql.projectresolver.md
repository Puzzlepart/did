[did-server](../README.md) / [graphql](../modules/graphql.md) / ProjectResolver

# Class: ProjectResolver

[graphql](../modules/graphql.md).ProjectResolver

## Table of contents

### Constructors

- [constructor](graphql.projectresolver.md#constructor)

### Methods

- [createOrUpdateProject](graphql.projectresolver.md#createorupdateproject)
- [projects](graphql.projectresolver.md#projects)

## Constructors

### constructor

\+ **new ProjectResolver**(`_mongo`: *MongoService*, `_msgraph`: [*MSGraphService*](services.msgraphservice.md)): [*ProjectResolver*](graphql.projectresolver.md)

Constructor for ProjectResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_mongo` | *MongoService* | Mongo service   |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MSGraphService    |

**Returns:** [*ProjectResolver*](graphql.projectresolver.md)

Defined in: [server/graphql/resolvers/project/index.ts:16](https://github.com/Puzzlepart/did/blob/ea0aea7b/server/graphql/resolvers/project/index.ts#L16)

## Methods

### createOrUpdateProject

▸ **createOrUpdateProject**(`project`: *ProjectInput*, `options`: *ProjectOptions*, `update`: *boolean*): *Promise*<CreateOrUpdateProjectResult\>

Create or update project

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`project` | *ProjectInput* | Project   |
`options` | *ProjectOptions* | Options   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<CreateOrUpdateProjectResult\>

Defined in: [server/graphql/resolvers/project/index.ts:55](https://github.com/Puzzlepart/did/blob/ea0aea7b/server/graphql/resolvers/project/index.ts#L55)

___

### projects

▸ **projects**(`customerKey`: *string*): *Promise*<Project[]\>

Get projects

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customerKey` | *string* | Customer key    |

**Returns:** *Promise*<Project[]\>

Defined in: [server/graphql/resolvers/project/index.ts:35](https://github.com/Puzzlepart/did/blob/ea0aea7b/server/graphql/resolvers/project/index.ts#L35)
