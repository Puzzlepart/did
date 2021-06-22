[did-server - v0.10.4](../README.md) / [GraphQL](../modules/graphql.md) / UserResolver

# Class: UserResolver

[GraphQL](../modules/graphql.md).UserResolver

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
- [submitFeedback](graphql.userresolver.md#submitfeedback)
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

Defined in: [graphql/resolvers/user/index.ts:42](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L42)

## Methods

### activeDirectoryUsers

▸ **activeDirectoryUsers**(): *Promise*<[*User*](graphql.user.md)[]\>

Get Active Directory users

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [graphql/resolvers/user/index.ts:86](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L86)

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

Defined in: [graphql/resolvers/user/index.ts:111](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L111)

___

### addUsers

▸ **addUsers**(`users`: [*UserInput*](graphql.userinput.md)[]): *Promise*<BaseResult\>

Add users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users` | [*UserInput*](graphql.userinput.md)[] | Users    |

**Returns:** *Promise*<BaseResult\>

Defined in: [graphql/resolvers/user/index.ts:133](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L133)

___

### authProviders

▸ **authProviders**(): *string*[]

Get auth providers

**Returns:** *string*[]

Defined in: [graphql/resolvers/user/index.ts:60](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L60)

___

### currentUser

▸ **currentUser**(`context`: *Context*): *Promise*<[*User*](graphql.user.md)\>

Get current user

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *Context* |

**Returns:** *Promise*<[*User*](graphql.user.md)\>

Defined in: [graphql/resolvers/user/index.ts:73](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L73)

___

### submitFeedback

▸ **submitFeedback**(`feedback`: [*UserFeedback*](graphql.userfeedback.md)): *Promise*<[*UserFeedbackResult*](graphql.userfeedbackresult.md)\>

Submit feedback

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`feedback` | [*UserFeedback*](graphql.userfeedback.md) | Feedback model    |

**Returns:** *Promise*<[*UserFeedbackResult*](graphql.userfeedbackresult.md)\>

Defined in: [graphql/resolvers/user/index.ts:172](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L172)

___

### updateUserConfiguration

▸ **updateUserConfiguration**(`configuration`: *string*, `startPage?`: *string*, `preferredLanguage?`: *string*): *Promise*<BaseResult\>

Update user configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configuration` | *string* | Configuration   |
`startPage?` | *string* | Start page   |
`preferredLanguage?` | *string* | Preferred language    |

**Returns:** *Promise*<BaseResult\>

Defined in: [graphql/resolvers/user/index.ts:153](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L153)

___

### users

▸ **users**(`query`: [*UserQuery*](graphql.userquery.md)): *Promise*<[*User*](graphql.user.md)[]\>

Get users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*UserQuery*](graphql.userquery.md) | Query    |

**Returns:** *Promise*<[*User*](graphql.user.md)[]\>

Defined in: [graphql/resolvers/user/index.ts:97](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/index.ts#L97)
