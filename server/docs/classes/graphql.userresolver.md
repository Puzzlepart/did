[did-server - v0.10.0](../README.md) / [graphql](../modules/graphql.md) / UserResolver

# Class: UserResolver

[graphql](../modules/graphql.md).UserResolver

Resolver for `User`.

`MSGraphService` and `UserService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

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

\+ **new UserResolver**(`_msgraph`: [*MSGraphService*](services.msgraphservice.md), `_user`: [*UserService*](services.userservice.md)): [*UserResolver*](graphql.userresolver.md)

Constructor for UserResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MS Graph service   |
`_user` | [*UserService*](services.userservice.md) | User service    |

**Returns:** [*UserResolver*](graphql.userresolver.md)

Defined in: [server/graphql/resolvers/user/index.ts:25](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L25)

## Methods

### activeDirectoryUsers

▸ **activeDirectoryUsers**(): *Promise*<[*User*](graphql.user.md)[]\>

Get Active Directory users

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [server/graphql/resolvers/user/index.ts:55](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L55)

___

### addOrUpdateUser

▸ **addOrUpdateUser**(`user`: [*UserInput*](graphql.userinput.md), `update`: *boolean*): *Promise*<BaseResult\>

Add or update user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | [*UserInput*](graphql.userinput.md) | User   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/user/index.ts:80](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L80)

___

### addUsers

▸ **addUsers**(`users`: [*UserInput*](graphql.userinput.md)[]): *Promise*<BaseResult\>

Add users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users` | [*UserInput*](graphql.userinput.md)[] | Users    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/user/index.ts:95](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L95)

___

### currentUser

▸ **currentUser**(`context`: [*Context*](graphql_context.context.md)): *Promise*<[*User*](graphql.user.md)\>

Get current user

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** *Promise*<[*User*](graphql.user.md)\>

Defined in: [server/graphql/resolvers/user/index.ts:43](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L43)

___

### updateUserConfiguration

▸ **updateUserConfiguration**(`configuration`: *string*): *Promise*<BaseResult\>

Update user configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configuration` | *string* | Configuration    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/user/index.ts:113](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L113)

___

### users

▸ **users**(`query`: [*UserQuery*](graphql.userquery.md)): *Promise*<[*User*](graphql.user.md)[]\>

Get users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*UserQuery*](graphql.userquery.md) | Query    |

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [server/graphql/resolvers/user/index.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L66)
