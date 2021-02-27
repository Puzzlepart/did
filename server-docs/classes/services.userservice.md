[did-server](../README.md) / [services](../modules/services.md) / UserService

# Class: UserService

[services](../modules/services.md).UserService

## Hierarchy

* *MongoDocumentService*<User\>

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
- [updateCurrentUserConfiguration](services.userservice.md#updatecurrentuserconfiguration)
- [updateUser](services.userservice.md#updateuser)

## Constructors

### constructor

\+ **new UserService**(`context`: [*Context*](graphql_context.context.md)): [*UserService*](services.userservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** [*UserService*](services.userservice.md)

Defined in: [server/services/mongo/user.ts:11](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/user.ts#L11)

## Properties

### \_role

• `Private` **\_role**: [*RoleService*](services.roleservice.md)

Defined in: [server/services/mongo/user.ts:11](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/user.ts#L11)

___

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<User\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### \_replaceId

▸ `Private`**_replaceId**<T\>(`user`: *User*): T

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
`user` | *User* | User    |

**Returns:** T

Defined in: [server/services/mongo/user.ts:26](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/user.ts#L26)

___

### addUser

▸ **addUser**(`user`: *User*): *Promise*<InsertOneWriteOpResult<WithId<User\>\>\>

Add the specified user object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | *User* | User    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<User\>\>\>

Defined in: [server/services/mongo/user.ts:75](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/user.ts#L75)

___

### addUsers

▸ **addUsers**(`users`: *User*[]): *Promise*<InsertWriteOpResult<WithId<User\>\>\>

Add users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users` | *User*[] | Users    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<User\>\>\>

Defined in: [server/services/mongo/user.ts:89](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/user.ts#L89)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<User\>, `sort?`: S): *Promise*<User[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<User\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<User[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/@document.ts#L37)

___

### getById

▸ **getById**(`id`: *string*): *Promise*<User\>

Get user by ID

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | User ID    |

**Returns:** *Promise*<User\>

Defined in: [server/services/mongo/user.ts:57](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/user.ts#L57)

___

### getUsers

▸ **getUsers**(`query?`: *FilterQuery*<User\>): *Promise*<User[]\>

Get users by the specified query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<User\> | Query    |

**Returns:** *Promise*<User[]\>

Defined in: [server/services/mongo/user.ts:35](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/user.ts#L35)

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

Defined in: [server/services/mongo/user.ts:121](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/user.ts#L121)

___

### updateUser

▸ **updateUser**(`user`: *User*): *Promise*<void\>

Update the specified user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | *User* | User to update    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/user.ts:105](https://github.com/Puzzlepart/did/blob/7f92b547/server/services/mongo/user.ts#L105)
