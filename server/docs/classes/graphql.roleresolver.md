[did-server - v0.10.0](../README.md) / [graphql](../modules/graphql.md) / RoleResolver

# Class: RoleResolver

[graphql](../modules/graphql.md).RoleResolver

## Table of contents

### Constructors

- [constructor](graphql.roleresolver.md#constructor)

### Methods

- [addOrUpdateRole](graphql.roleresolver.md#addorupdaterole)
- [deleteRole](graphql.roleresolver.md#deleterole)
- [roles](graphql.roleresolver.md#roles)

## Constructors

### constructor

\+ **new RoleResolver**(`_role`: [*RoleService*](services.roleservice.md)): [*RoleResolver*](graphql.roleresolver.md)

Constructor for RoleResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_role` | [*RoleService*](services.roleservice.md) | Role service    |

**Returns:** [*RoleResolver*](graphql.roleresolver.md)

Defined in: [server/graphql/resolvers/role/index.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/role/index.ts#L17)

## Methods

### addOrUpdateRole

▸ **addOrUpdateRole**(`role`: [*RoleInput*](graphql.roleinput.md), `update`: *boolean*): *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Add or update role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | [*RoleInput*](graphql.roleinput.md) | Role   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Defined in: [server/graphql/resolvers/role/index.ts:42](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/role/index.ts#L42)

___

### deleteRole

▸ **deleteRole**(`name`: *string*): *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Delete role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Defined in: [server/graphql/resolvers/role/index.ts:59](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/role/index.ts#L59)

___

### roles

▸ **roles**(): *Promise*<[*Role*](graphql.role.md)[]\>

Get roles

**Returns:** *Promise*<[*Role*](graphql.role.md)[]\>

Defined in: [server/graphql/resolvers/role/index.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/role/index.ts#L30)
