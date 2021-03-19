[did-server - v0.9.11](../README.md) / [graphql](../modules/graphql.md) / ProjectResolver

# Class: ProjectResolver

[graphql](../modules/graphql.md).ProjectResolver

Resolver for `Project`.

`ProjectService` and `MSGraphService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

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
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | Microsoft Graph service    |

**Returns:** [*ProjectResolver*](graphql.projectresolver.md)

Defined in: [graphql/resolvers/project/index.ts:28](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/index.ts#L28)

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

Defined in: [graphql/resolvers/project/index.ts:67](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/index.ts#L67)

___

### projects

▸ **projects**(`customerKey`: *string*): *Promise*<[*Project*](graphql.project.md)[]\>

Get projects

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customerKey` | *string* | Customer key    |

**Returns:** *Promise*<[*Project*](graphql.project.md)[]\>

Defined in: [graphql/resolvers/project/index.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/index.ts#L47)
