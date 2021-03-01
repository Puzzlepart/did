[did-server - v0.10.0](../README.md) / [graphql](../modules/graphql.md) / ProjectResolver

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

\+ **new ProjectResolver**(`_project`: [*ProjectService*](services.projectservice.md), `_msgraph`: [*MSGraphService*](services.msgraphservice.md)): [*ProjectResolver*](graphql.projectresolver.md)

Constructor for ProjectResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_project` | [*ProjectService*](services.projectservice.md) | Project service   |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MSGraphService    |

**Returns:** [*ProjectResolver*](graphql.projectresolver.md)

Defined in: [server/graphql/resolvers/project/index.ts:20](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/index.ts#L20)

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

Defined in: [server/graphql/resolvers/project/index.ts:59](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/index.ts#L59)

___

### projects

▸ **projects**(`customerKey`: *string*): *Promise*<[*Project*](graphql.project.md)[]\>

Get projects

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customerKey` | *string* | Customer key    |

**Returns:** *Promise*<[*Project*](graphql.project.md)[]\>

Defined in: [server/graphql/resolvers/project/index.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/index.ts#L39)
