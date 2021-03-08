[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / RoleService

# Class: RoleService

[services](../modules/services.md).RoleService

## Hierarchy

* *MongoDocumentService*<[*Role*](graphql.role.md)\>

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
- [insert](services.roleservice.md#insert)
- [update](services.roleservice.md#update)
- [updateRole](services.roleservice.md#updaterole)

## Constructors

### constructor

\+ **new RoleService**(`context`: [*Context*](graphql_context.context.md)): [*RoleService*](services.roleservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** [*RoleService*](services.roleservice.md)

Defined in: [server/services/mongo/role.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L9)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:8](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L8)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*Role*](graphql.role.md)\>

Defined in: [server/services/mongo/@document.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L9)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### addRole

▸ **addRole**(`role`: [*Role*](graphql.role.md)): *Promise*<InsertOneWriteOpResult<WithId<[*Role*](graphql.role.md)\>\>\>

Add role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | [*Role*](graphql.role.md) | Role    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*Role*](graphql.role.md)\>\>\>

Defined in: [server/services/mongo/role.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L47)

___

### deleteRole

▸ **deleteRole**(`name`: *string*): *Promise*<void\>

Delete role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Role name    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/role.ts:74](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L74)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*Role*](graphql.role.md)\>, `sort?`: S): *Promise*<[*Role*](graphql.role.md)[]\>

Wrapper on find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Role*](graphql.role.md)\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*Role*](graphql.role.md)[]\>

Defined in: [server/services/mongo/@document.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L39)

___

### getByName

▸ **getByName**(`name`: *string*): *Promise*<[*Role*](graphql.role.md)\>

Get Role by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Role name    |

**Returns:** *Promise*<[*Role*](graphql.role.md)\>

Defined in: [server/services/mongo/role.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L33)

___

### getRoles

▸ **getRoles**(`query?`: *FilterQuery*<[*Role*](graphql.role.md)\>): *Promise*<[*Role*](graphql.role.md)[]\>

Get roles

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*Role*](graphql.role.md)\> | Query    |

**Returns:** *Promise*<[*Role*](graphql.role.md)[]\>

Defined in: [server/services/mongo/role.ts:19](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L19)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*Role*](graphql.role.md)\>\>\>

Wrapper on insertOne() that also updates `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*Role*](graphql.role.md)\>\>\>

Defined in: [server/services/mongo/@document.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L50)

___

### update

▸ **update**(`query`: *FilterQuery*<[*Role*](graphql.role.md)\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Role*](graphql.role.md)\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [server/services/mongo/@document.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L66)

___

### updateRole

▸ **updateRole**(`role`: [*Role*](graphql.role.md)): *Promise*<void\>

Update role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | [*Role*](graphql.role.md) | Role    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/role.ts:61](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L61)
