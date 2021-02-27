[did-server](../README.md) / [graphql](../modules/graphql.md) / UserResolver

# Class: UserResolver

[graphql](../modules/graphql.md).UserResolver

## Table of contents

### Constructors

- [constructor](graphql.userresolver.md#constructor)

### Methods

- [activeDirectoryUsers](graphql.userresolver.md#activedirectoryusers)
- [addOrUpdateUser](graphql.userresolver.md#addorupdateuser)
- [addUsers](graphql.userresolver.md#addusers)
- [currentUser](graphql.userresolver.md#currentuser)
- [updateUserConfiguration](graphql.userresolver.md#updateuserconfiguration)
- [users](graphql.userresolver.md#users)

## Constructors

### constructor

\+ **new UserResolver**(`_msgraph`: [*MSGraphService*](services.msgraphservice.md), `_mongo`: [*MongoService*](services.mongoservice.md)): [*UserResolver*](graphql.userresolver.md)

Constructor for UserResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MS Graph service   |
`_mongo` | [*MongoService*](services.mongoservice.md) | Mongo service    |

**Returns:** [*UserResolver*](graphql.userresolver.md)

Defined in: [server/graphql/resolvers/user/index.ts:14](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/user/index.ts#L14)

## Methods

### activeDirectoryUsers

▸ **activeDirectoryUsers**(): *Promise*<[*User*](graphql.user.md)[]\>

Get Active Directory users

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [server/graphql/resolvers/user/index.ts:44](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/user/index.ts#L44)

___

### addOrUpdateUser

▸ **addOrUpdateUser**(`user`: [*UserInput*](graphql.userinput.md), `update`: *boolean*): *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Add or update user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | [*UserInput*](graphql.userinput.md) | User   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Defined in: [server/graphql/resolvers/user/index.ts:69](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/user/index.ts#L69)

___

### addUsers

▸ **addUsers**(`users`: [*UserInput*](graphql.userinput.md)[]): *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Add users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users` | [*UserInput*](graphql.userinput.md)[] | Users    |

**Returns:** *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Defined in: [server/graphql/resolvers/user/index.ts:85](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/user/index.ts#L85)

___

### currentUser

▸ **currentUser**(`ctx`: [*Context*](graphql_context.context.md)): *Promise*<[*User*](graphql.user.md)\>

Get current user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`ctx` | [*Context*](graphql_context.context.md) | GraphQL context    |

**Returns:** *Promise*<[*User*](graphql.user.md)\>

Defined in: [server/graphql/resolvers/user/index.ts:32](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/user/index.ts#L32)

___

### updateUserConfiguration

▸ **updateUserConfiguration**(`configuration`: *string*): *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Update user configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configuration` | *string* | Configuration    |

**Returns:** *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Defined in: [server/graphql/resolvers/user/index.ts:103](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/user/index.ts#L103)

___

### users

▸ **users**(`query`: [*UserQuery*](graphql.userquery.md)): *Promise*<[*User*](graphql.user.md)[]\>

Get users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*UserQuery*](graphql.userquery.md) | Query    |

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [server/graphql/resolvers/user/index.ts:55](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/user/index.ts#L55)
