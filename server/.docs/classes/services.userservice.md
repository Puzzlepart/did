[did-server - v0.11.5](../README.md) / [Services](../modules/services.md) / UserService

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
- [getUserConfiguration](services.userservice.md#getuserconfiguration)
- [getUsers](services.userservice.md#getusers)
- [insert](services.userservice.md#insert)
- [insertMultiple](services.userservice.md#insertmultiple)
- [update](services.userservice.md#update)
- [updateCurrentUserConfiguration](services.userservice.md#updatecurrentuserconfiguration)
- [updateUser](services.userservice.md#updateuser)
- [updateUsers](services.userservice.md#updateusers)

## Constructors

### constructor

\+ **new UserService**(`context`: *Context*): [*UserService*](services.userservice.md)

Constructor for `UserService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*UserService*](services.userservice.md)

Overrides: void

Defined in: [services/mongo/user.ts:19](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L19)

## Properties

### \_role

• `Private` **\_role**: [*RoleService*](services.roleservice.md)

Defined in: [services/mongo/user.ts:19](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L19)

___

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

• **collection**: *Collection*<[*User*](graphql.user.md)\>

Inherited from: void

Defined in: [services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### collectionName

• **collectionName**: *string*

Inherited from: void

___

### context

• `Readonly` **context**: *Context*

Inherited from: void

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

Defined in: [services/mongo/user.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L39)

___

### addUser

▸ **addUser**(`user`: [*User*](graphql.user.md)): *Promise*<InsertOneWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Add the specified user object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | [*User*](graphql.user.md) | User    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Defined in: [services/mongo/user.ts:112](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L112)

___

### addUsers

▸ **addUsers**(`users_`: [*User*](graphql.user.md)[]): *Promise*<InsertWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Add multiple users in bulk

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users_` | [*User*](graphql.user.md)[] | Users    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*User*](graphql.user.md)\>\>\>

Defined in: [services/mongo/user.ts:126](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L126)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*User*](graphql.user.md)\>, `sort?`: S): *Promise*<[*User*](graphql.user.md)[]\>

Wrapper on _.find().toArray()

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

Inherited from: void

Defined in: [services/mongo/@document.ts:70](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L70)

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

Defined in: [services/mongo/user.ts:72](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L72)

___

### getUserConfiguration

▸ **getUserConfiguration**(`idOrMail`: *string*): *Promise*<any\>

Get configuration by user ID

**`remarks`** Returns null if no user is found.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`idOrMail` | *string* | User ID or mail    |

**Returns:** *Promise*<any\>

Defined in: [services/mongo/user.ts:95](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L95)

___

### getUsers

▸ **getUsers**(`query?`: *FilterQuery*<[*User*](graphql.user.md)\>): *Promise*<[*User*](graphql.user.md)[]\>

Get users by the specified query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*User*](graphql.user.md)\> | Query    |

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [services/mongo/user.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L48)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:100](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L100)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L83)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:116](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L116)

___

### updateCurrentUserConfiguration

▸ **updateCurrentUserConfiguration**(`configuration?`: *string*, `startPage?`: *string*, `lastActive?`: *string*, `preferredLanguage?`: *string*): *Promise*<void\>

Update configuration for the current user

**`remarks`** For now we we're working with the configuration as a string,
to avoid typing the whole configuration object.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configuration?` | *string* | Configuration   |
`startPage?` | *string* | Start page   |
`lastActive?` | *string* | - |
`preferredLanguage?` | *string* | Preferred language    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/user.ts:173](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L173)

___

### updateUser

▸ **updateUser**(`user`: [*User*](graphql.user.md)): *Promise*<void\>

Update the specified user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | [*User*](graphql.user.md) | User to update    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/user.ts:155](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L155)

___

### updateUsers

▸ **updateUsers**(`users`: [*User*](graphql.user.md)[]): *Promise*<void\>

Update multiple users in bulk

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users` | [*User*](graphql.user.md)[] | Users    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/user.ts:140](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/user.ts#L140)
