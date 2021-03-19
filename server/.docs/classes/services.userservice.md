[did-server - v0.9.11](../README.md) / [Services](../modules/services.md) / UserService

# Class: UserService

[Services](../modules/services.md).UserService

User service

## Hierarchy

* *MongoDocumentService*<[*User*](graphql.user.md)\>

  ↳ **UserService**

## Table of contents

### Constructors

- [constructor](services.userservice.md#constructor)

### Properties

- [\_role](services.userservice.md#_role)
- [cache](services.userservice.md#cache)
- [cachePrefix](services.userservice.md#cacheprefix)
- [collection](services.userservice.md#collection)
- [collectionName](services.userservice.md#collectionname)
- [context](services.userservice.md#context)

### Methods

- [\_replaceId](services.userservice.md#_replaceid)
- [addUser](services.userservice.md#adduser)
- [addUsers](services.userservice.md#addusers)
- [find](services.userservice.md#find)
- [getById](services.userservice.md#getbyid)
- [getUsers](services.userservice.md#getusers)
- [insert](services.userservice.md#insert)
- [insertMultiple](services.userservice.md#insertmultiple)
- [update](services.userservice.md#update)
- [updateCurrentUserConfiguration](services.userservice.md#updatecurrentuserconfiguration)
- [updateUser](services.userservice.md#updateuser)

## Constructors

### constructor

\+ **new UserService**(`context`: *Context*): [*UserService*](services.userservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *Context* |

**Returns:** [*UserService*](services.userservice.md)

Defined in: [services/mongo/user.ts:19](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L19)

## Properties

### \_role

• `Private` **\_role**: [*RoleService*](services.roleservice.md)

Defined in: [services/mongo/user.ts:19](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L19)

___

### cache

• **cache**: [*CacheService*](services.cacheservice.md)= null

Defined in: [services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*User*](graphql.user.md)\>

Defined in: [services/mongo/@document.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L11)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: *Context*

## Methods

### \_replaceId

▸ `Private`**_replaceId**<T\>(`user`: [*User*](graphql.user.md)): T

Replace id with _id for the User Object

**`remarks`** We want to store the user with _id in the mongodb collection, but
use id when working with the user in our code.

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | [*User*](graphql.user.md) | User    |

**Returns:** T

Defined in: [services/mongo/user.ts:34](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L34)

___

### addUser

▸ **addUser**(`user`: [*User*](graphql.user.md)): *Promise*<InsertOneWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Add the specified user object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | [*User*](graphql.user.md) | User    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Defined in: [services/mongo/user.ts:88](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L88)

___

### addUsers

▸ **addUsers**(`users_`: [*User*](graphql.user.md)[]): *Promise*<InsertWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Add multiple users in bulk

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users_` | [*User*](graphql.user.md)[] | Users    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Defined in: [services/mongo/user.ts:102](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L102)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*User*](graphql.user.md)\>, `sort?`: S): *Promise*<[*User*](graphql.user.md)[]\>

Wrapper on find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*User*](graphql.user.md)\> | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [services/mongo/@document.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L71)

___

### getById

▸ **getById**(`idOrMail`: *string*): *Promise*<[*User*](graphql.user.md)\>

Get user by ID

**`remarks`** Returns null if no user is found.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`idOrMail` | *string* | User ID or mail    |

**Returns:** *Promise*<[*User*](graphql.user.md)\>

Defined in: [services/mongo/user.ts:67](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L67)

___

### getUsers

▸ **getUsers**(`query?`: *FilterQuery*<[*User*](graphql.user.md)\>): *Promise*<[*User*](graphql.user.md)[]\>

Get users by the specified query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*User*](graphql.user.md)\> | Query    |

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [services/mongo/user.ts:43](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L43)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Defined in: [services/mongo/@document.ts:101](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L101)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Defined in: [services/mongo/@document.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L84)

___

### update

▸ **update**(`query`: *FilterQuery*<[*User*](graphql.user.md)\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*User*](graphql.user.md)\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [services/mongo/@document.ts:117](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L117)

___

### updateCurrentUserConfiguration

▸ **updateCurrentUserConfiguration**(`configuration`: *string*): *Promise*<void\>

Update configuration for the current user

**`remarks`** For now we we're working with the configuration as a string,
to avoid typing the whole configuration object.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configuration` | *string* | Configuration    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/user.ts:132](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L132)

___

### updateUser

▸ **updateUser**(`user`: [*User*](graphql.user.md)): *Promise*<void\>

Update the specified user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | [*User*](graphql.user.md) | User to update    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/user.ts:116](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L116)
