[did-server - v0.13.0](../README.md) / [Services](../modules/services.md) / RoleService

# Class: RoleService

[Services](../modules/services.md).RoleService

Role service

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
- [insertMultiple](services.roleservice.md#insertmultiple)
- [update](services.roleservice.md#update)
- [updateRole](services.roleservice.md#updaterole)

## Constructors

### constructor

\+ **new RoleService**(`context`: [*Context*](graphql.context.md)): [*RoleService*](services.roleservice.md)

Constructor for `RoleService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql.context.md) | Injected context through `typedi`    |

**Returns:** [*RoleService*](services.roleservice.md)

Overrides: void

Defined in: [services/mongo/role.ts:15](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L15)

## Properties

### cache

• **cache**: [*CacheService*](services.cacheservice.md)= null

Inherited from: void

Defined in: [services/mongo/@document.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L9)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

Inherited from: void

___

### collection

• **collection**: *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### collectionName

• **collectionName**: *string*

Inherited from: void

___

### context

• `Readonly` **context**: [*Context*](graphql.context.md)

Inherited from: void

## Methods

### addRole

▸ **addRole**(`role`: [*Role*](graphql.role.md)): *Promise*<any\>

Add role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | [*Role*](graphql.role.md) | Role    |

**Returns:** *Promise*<any\>

Defined in: [services/mongo/role.ts:58](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L58)

___

### deleteRole

▸ **deleteRole**(`name`: *string*): *Promise*<void\>

Delete role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Role name    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/role.ts:85](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L85)

___

### find

▸ **find**<S\>(`query`: *any*, `sort?`: S): *Promise*<[*Role*](graphql.role.md)[]\>

Wrapper on _.find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*Role*](graphql.role.md)[]\>

Inherited from: void

Defined in: [services/mongo/@document.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L68)

___

### getByName

▸ **getByName**(`name`: *string*): *Promise*<[*Role*](graphql.role.md)\>

Get Role by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Role name    |

**Returns:** *Promise*<[*Role*](graphql.role.md)\>

Defined in: [services/mongo/role.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L44)

___

### getRoles

▸ **getRoles**(`query?`: *any*): *Promise*<[*Role*](graphql.role.md)[]\>

Get roles

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *any* | Query    |

**Returns:** *Promise*<[*Role*](graphql.role.md)[]\>

Defined in: [services/mongo/role.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L30)

___

### insert

▸ **insert**(`document_`: *any*): *any*

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:98](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L98)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *any*

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L81)

___

### update

▸ **update**(`query`: *any*, `document_`: *any*): *any*

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | Query   |
`document_` | *any* | Document    |

**Returns:** *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:114](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L114)

___

### updateRole

▸ **updateRole**(`role`: [*Role*](graphql.role.md)): *Promise*<void\>

Update role

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`role` | [*Role*](graphql.role.md) | Role    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/role.ts:72](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/role.ts#L72)
