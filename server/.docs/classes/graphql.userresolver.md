[did-server - v0.9.9](../README.md) / [graphql](../modules/graphql.md) / UserResolver

# Class: UserResolver

[graphql](../modules/graphql.md).UserResolver

Resolver for `User`.

`MSGraphService`, `UserService` and
`SubscriptionService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

## Table of contents

### Constructors

- [constructor](graphql.userresolver.md#constructor)

### Methods

- [activeDirectoryUsers](graphql.userresolver.md#activedirectoryusers)
- [addOrUpdateUser](graphql.userresolver.md#addorupdateuser)
- [addUsers](graphql.userresolver.md#addusers)
- [authProviders](graphql.userresolver.md#authproviders)
- [currentUser](graphql.userresolver.md#currentuser)
- [updateUserConfiguration](graphql.userresolver.md#updateuserconfiguration)
- [users](graphql.userresolver.md#users)

## Constructors

### constructor

\+ **new UserResolver**(`_msgraph`: [*MSGraphService*](services.msgraphservice.md), `_userSvc`: [*UserService*](services.userservice.md), `_subSvc`: [*SubscriptionService*](services.subscriptionservice.md)): [*UserResolver*](graphql.userresolver.md)

Constructor for UserResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MS Graph service   |
`_userSvc` | [*UserService*](services.userservice.md) | User service   |
`_subSvc` | [*SubscriptionService*](services.subscriptionservice.md) | Subscription service    |

**Returns:** [*UserResolver*](graphql.userresolver.md)

Defined in: [server/graphql/resolvers/user/index.ts:29](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L29)

## Methods

### activeDirectoryUsers

▸ **activeDirectoryUsers**(): *Promise*<[*User*](graphql.user.md)[]\>

Get Active Directory users

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [server/graphql/resolvers/user/index.ts:73](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L73)

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

Defined in: [server/graphql/resolvers/user/index.ts:98](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L98)

___

### addUsers

▸ **addUsers**(`users`: [*UserInput*](graphql.userinput.md)[]): *Promise*<BaseResult\>

Add users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users` | [*UserInput*](graphql.userinput.md)[] | Users    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/user/index.ts:120](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L120)

___

### authProviders

▸ **authProviders**(): *string*[]

Get auth providers

**Returns:** *string*[]

Defined in: [server/graphql/resolvers/user/index.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L47)

___

### currentUser

▸ **currentUser**(`context`: [*Context*](graphql_context.context.md)): *Promise*<[*User*](graphql.user.md)\>

Get current user

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** *Promise*<[*User*](graphql.user.md)\>

Defined in: [server/graphql/resolvers/user/index.ts:60](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L60)

___

### updateUserConfiguration

▸ **updateUserConfiguration**(`configuration`: *string*): *Promise*<BaseResult\>

Update user configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configuration` | *string* | Configuration    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/user/index.ts:138](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L138)

___

### users

▸ **users**(`query`: [*UserQuery*](graphql.userquery.md)): *Promise*<[*User*](graphql.user.md)[]\>

Get users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*UserQuery*](graphql.userquery.md) | Query    |

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [server/graphql/resolvers/user/index.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L84)
