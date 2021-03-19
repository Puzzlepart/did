[did-server - v0.9.11](../README.md) / [graphql](../modules/graphql.md) / UserResolver

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

Defined in: [graphql/resolvers/user/index.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L30)

## Methods

### activeDirectoryUsers

▸ **activeDirectoryUsers**(): *Promise*<[*User*](graphql.user.md)[]\>

Get Active Directory users

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [graphql/resolvers/user/index.ts:74](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L74)

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

Defined in: [graphql/resolvers/user/index.ts:99](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L99)

___

### addUsers

▸ **addUsers**(`users`: [*UserInput*](graphql.userinput.md)[]): *Promise*<BaseResult\>

Add users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users` | [*UserInput*](graphql.userinput.md)[] | Users    |

**Returns:** *Promise*<BaseResult\>

Defined in: [graphql/resolvers/user/index.ts:121](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L121)

___

### authProviders

▸ **authProviders**(): *string*[]

Get auth providers

**Returns:** *string*[]

Defined in: [graphql/resolvers/user/index.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L48)

___

### currentUser

▸ **currentUser**(`context`: *Context*): *Promise*<[*User*](graphql.user.md)\>

Get current user

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *Context* |

**Returns:** *Promise*<[*User*](graphql.user.md)\>

Defined in: [graphql/resolvers/user/index.ts:61](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L61)

___

### updateUserConfiguration

▸ **updateUserConfiguration**(`configuration`: *string*): *Promise*<BaseResult\>

Update user configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configuration` | *string* | Configuration    |

**Returns:** *Promise*<BaseResult\>

Defined in: [graphql/resolvers/user/index.ts:139](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L139)

___

### users

▸ **users**(`query`: [*UserQuery*](graphql.userquery.md)): *Promise*<[*User*](graphql.user.md)[]\>

Get users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*UserQuery*](graphql.userquery.md) | Query    |

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [graphql/resolvers/user/index.ts:85](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L85)
