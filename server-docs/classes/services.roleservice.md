[did-server](../README.md) / [services](../modules/services.md) / RoleService

# Class: RoleService

[services](../modules/services.md).RoleService

## Hierarchy

* *MongoDocumentService*<Role\>

  ↳ **RoleService**

## Table of contents

### Constructors

- [constructor](services.roleservice.md#constructor)

### Properties

- [cache](services.roleservice.md#cache)
- [cachePrefix](services.roleservice.md#cacheprefix)
- [collection](services.roleservice.md#collection)
- [collectionName](services.roleservice.md#collectionname)
- [context](services.roleservice.md#context)

### Methods

- [addRole](services.roleservice.md#addrole)
- [deleteRole](services.roleservice.md#deleterole)
- [find](services.roleservice.md#find)
- [getByName](services.roleservice.md#getbyname)
- [getRoles](services.roleservice.md#getroles)
- [updateRole](services.roleservice.md#updaterole)

## Constructors

### constructor

\+ **new RoleService**(`context`: [*Context*](graphql_context.context.md)): [*RoleService*](services.roleservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** [*RoleService*](services.roleservice.md)

Defined in: [server/services/mongo/role.ts:7](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/role.ts#L7)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<Role\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### addRole

▸ **addRole**(`role`: *Role*): *Promise*<InsertOneWriteOpResult<WithId<Role\>\>\>

Add role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | *Role* | Role    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<Role\>\>\>

Defined in: [server/services/mongo/role.ts:45](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/role.ts#L45)

___

### deleteRole

▸ **deleteRole**(`name`: *string*): *Promise*<void\>

Delete role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Role name    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/role.ts:72](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/role.ts#L72)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<Role\>, `sort?`: S): *Promise*<Role[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<Role\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<Role[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/@document.ts#L37)

___

### getByName

▸ **getByName**(`name`: *string*): *Promise*<Role\>

Get Role by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Role name    |

**Returns:** *Promise*<Role\>

Defined in: [server/services/mongo/role.ts:31](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/role.ts#L31)

___

### getRoles

▸ **getRoles**(`query?`: *FilterQuery*<Role\>): *Promise*<Role[]\>

Get roles

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<Role\> | Query    |

**Returns:** *Promise*<Role[]\>

Defined in: [server/services/mongo/role.ts:17](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/role.ts#L17)

___

### updateRole

▸ **updateRole**(`role`: *Role*): *Promise*<void\>

Update role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | *Role* | Role    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/role.ts:59](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/role.ts#L59)
