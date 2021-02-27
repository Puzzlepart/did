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

- [cache](services.userservice.md#cache)
- [cachePrefix](services.userservice.md#cacheprefix)
- [collection](services.userservice.md#collection)
- [collectionName](services.userservice.md#collectionname)
- [context](services.userservice.md#context)

### Methods

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

Defined in: [server/services/mongo/user.ts:11](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/user.ts#L11)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<User\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### addUser

▸ **addUser**(`user`: *User*): *Promise*<InsertOneWriteOpResult<WithId<User\>\>\>

Add user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | *User* | User    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<User\>\>\>

Defined in: [server/services/mongo/user.ts:72](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/user.ts#L72)

___

### addUsers

▸ **addUsers**(`users`: *User*[]): *Promise*<InsertWriteOpResult<WithId<User\>\>\>

Add users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users` | *User*[] | Users    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<User\>\>\>

Defined in: [server/services/mongo/user.ts:86](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/user.ts#L86)

___

### find

▸ **find**(`query`: *FilterQuery*<User\>, `sort?`: [*string*, *number*][] \| { [key: string]: V;  } \| { `_id?`: *number* \| { `$meta?`: MetaSortOperators  } ; `configuration?`: *number* \| { `$meta?`: MetaSortOperators  } ; `displayName?`: *number* \| { `$meta?`: MetaSortOperators  } ; `givenName?`: *number* \| { `$meta?`: MetaSortOperators  } ; `id?`: *number* \| { `$meta?`: MetaSortOperators  } ; `jobTitle?`: *number* \| { `$meta?`: MetaSortOperators  } ; `mail?`: *number* \| { `$meta?`: MetaSortOperators  } ; `mobilePhone?`: *number* \| { `$meta?`: MetaSortOperators  } ; `preferredLanguage?`: *number* \| { `$meta?`: MetaSortOperators  } ; `role?`: *number* \| { `$meta?`: MetaSortOperators  } ; `subscription?`: *number* \| { `$meta?`: MetaSortOperators  } ; `surname?`: *number* \| { `$meta?`: MetaSortOperators  } ; `create?`:   }): *Promise*<User[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<User\> | Query   |
`sort?` | [*string*, *number*][] \| { [key: string]: V;  } \| { `_id?`: *number* \| { `$meta?`: MetaSortOperators  } ; `configuration?`: *number* \| { `$meta?`: MetaSortOperators  } ; `displayName?`: *number* \| { `$meta?`: MetaSortOperators  } ; `givenName?`: *number* \| { `$meta?`: MetaSortOperators  } ; `id?`: *number* \| { `$meta?`: MetaSortOperators  } ; `jobTitle?`: *number* \| { `$meta?`: MetaSortOperators  } ; `mail?`: *number* \| { `$meta?`: MetaSortOperators  } ; `mobilePhone?`: *number* \| { `$meta?`: MetaSortOperators  } ; `preferredLanguage?`: *number* \| { `$meta?`: MetaSortOperators  } ; `role?`: *number* \| { `$meta?`: MetaSortOperators  } ; `subscription?`: *number* \| { `$meta?`: MetaSortOperators  } ; `surname?`: *number* \| { `$meta?`: MetaSortOperators  } ; `create?`:   } | Sort options    |

**Returns:** *Promise*<User[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L37)

___

### getById

▸ **getById**(`id`: *string*): *Promise*<User\>

Get user by ID

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | User ID    |

**Returns:** *Promise*<User\>

Defined in: [server/services/mongo/user.ts:54](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/user.ts#L54)

___

### getUsers

▸ **getUsers**(`query?`: *FilterQuery*<User\>): *Promise*<User[]\>

Get users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<User\> | Query    |

**Returns:** *Promise*<User[]\>

Defined in: [server/services/mongo/user.ts:32](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/user.ts#L32)

___

### updateCurrentUserConfiguration

▸ **updateCurrentUserConfiguration**(`configuration`: *string*): *Promise*<void\>

Update current user configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configuration` | *string* | Configuration    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/user.ts:115](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/user.ts#L115)

___

### updateUser

▸ **updateUser**(`user`: *User*): *Promise*<void\>

Update customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | *User* | User to update    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/user.ts:102](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/user.ts#L102)
