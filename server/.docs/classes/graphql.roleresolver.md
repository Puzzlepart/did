[did-server - v0.9.11](../README.md) / [GraphQL](../modules/graphql.md) / RoleResolver

# Class: RoleResolver

[GraphQL](../modules/graphql.md).RoleResolver

Resolver for `Role`.

`RoleService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

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

Defined in: [graphql/resolvers/role/index.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/role/index.ts#L23)

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

Defined in: [graphql/resolvers/role/index.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/role/index.ts#L48)

___

### deleteRole

▸ **deleteRole**(`name`: *string*): *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Delete role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Defined in: [graphql/resolvers/role/index.ts:63](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/role/index.ts#L63)

___

### roles

▸ **roles**(): *Promise*<[*Role*](graphql.role.md)[]\>

Get roles

**Returns:** *Promise*<[*Role*](graphql.role.md)[]\>

Defined in: [graphql/resolvers/role/index.ts:36](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/role/index.ts#L36)
