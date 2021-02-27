[did-server](../README.md) / [graphql](../modules/graphql.md) / RoleResolver

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

\+ **new RoleResolver**(`_mongo`: [*MongoService*](services.mongoservice.md)): [*RoleResolver*](graphql.roleresolver.md)

Constructor for RoleResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_mongo` | [*MongoService*](services.mongoservice.md) | Mongo service    |

**Returns:** [*RoleResolver*](graphql.roleresolver.md)

Defined in: [server/graphql/resolvers/role/index.ts:13](https://github.com/Puzzlepart/did/blob/7f92b547/server/graphql/resolvers/role/index.ts#L13)

## Methods

### addOrUpdateRole

▸ **addOrUpdateRole**(`role`: *RoleInput*, `update`: *boolean*): *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Add or update role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | *RoleInput* | Role   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Defined in: [server/graphql/resolvers/role/index.ts:38](https://github.com/Puzzlepart/did/blob/7f92b547/server/graphql/resolvers/role/index.ts#L38)

___

### deleteRole

▸ **deleteRole**(`name`: *string*): *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Delete role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Defined in: [server/graphql/resolvers/role/index.ts:54](https://github.com/Puzzlepart/did/blob/7f92b547/server/graphql/resolvers/role/index.ts#L54)

___

### roles

▸ **roles**(): *Promise*<Role[]\>

Get roles

**Returns:** *Promise*<Role[]\>

Defined in: [server/graphql/resolvers/role/index.ts:26](https://github.com/Puzzlepart/did/blob/7f92b547/server/graphql/resolvers/role/index.ts#L26)
