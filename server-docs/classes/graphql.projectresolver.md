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

\+ **new ProjectResolver**(`_mongo`: [*MongoService*](services.mongoservice.md), `_msgraph`: [*MSGraphService*](services.msgraphservice.md)): [*ProjectResolver*](graphql.projectresolver.md)

Constructor for ProjectResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_mongo` | [*MongoService*](services.mongoservice.md) | Mongo service   |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MSGraphService    |

**Returns:** [*ProjectResolver*](graphql.projectresolver.md)

Defined in: [server/graphql/resolvers/project/index.ts:16](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/project/index.ts#L16)

## Methods

### createOrUpdateProject

▸ **createOrUpdateProject**(`project`: [*ProjectInput*](graphql.projectinput.md), `options`: [*ProjectOptions*](graphql.projectoptions.md), `update`: *boolean*): *Promise*<[*CreateOrUpdateProjectResult*](graphql.createorupdateprojectresult.md)\>

Create or update project

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`project` | [*ProjectInput*](graphql.projectinput.md) | Project   |
`options` | [*ProjectOptions*](graphql.projectoptions.md) | Options   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<[*CreateOrUpdateProjectResult*](graphql.createorupdateprojectresult.md)\>

Defined in: [server/graphql/resolvers/project/index.ts:55](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/project/index.ts#L55)

___

### projects

▸ **projects**(`customerKey`: *string*): *Promise*<[*Project*](graphql.project.md)[]\>

Get projects

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customerKey` | *string* | Customer key    |

**Returns:** *Promise*<[*Project*](graphql.project.md)[]\>

Defined in: [server/graphql/resolvers/project/index.ts:35](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/project/index.ts#L35)
