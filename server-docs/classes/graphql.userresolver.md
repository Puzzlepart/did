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

Defined in: [server/graphql/resolvers/user/index.ts:15](https://github.com/Puzzlepart/did/blob/3f22c56c/server/graphql/resolvers/user/index.ts#L15)

## Methods

### activeDirectoryUsers

▸ **activeDirectoryUsers**(): *Promise*<any\>

Get Active Directory users

**Returns:** *Promise*<any\>

Defined in: [server/graphql/resolvers/user/index.ts:45](https://github.com/Puzzlepart/did/blob/3f22c56c/server/graphql/resolvers/user/index.ts#L45)

___

### addOrUpdateUser

▸ **addOrUpdateUser**(`user`: *UserInput*, `update`: *boolean*): *Promise*<BaseResult\>

Add or update user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`user` | *UserInput* | User   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/user/index.ts:68](https://github.com/Puzzlepart/did/blob/3f22c56c/server/graphql/resolvers/user/index.ts#L68)

___

### addUsers

▸ **addUsers**(`users`: *UserInput*[]): *Promise*<BaseResult\>

Add users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`users` | *UserInput*[] | Users    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/user/index.ts:84](https://github.com/Puzzlepart/did/blob/3f22c56c/server/graphql/resolvers/user/index.ts#L84)

___

### currentUser

▸ **currentUser**(`ctx`: [*Context*](graphql_context.context.md)): *Promise*<{ `_id?`: *string* ; `configuration?`: *any* ; `displayName?`: *string* ; `givenName?`: *string* ; `id?`: *string* ; `jobTitle?`: *string* ; `mail?`: *string* ; `mobilePhone?`: *string* ; `preferredLanguage?`: *string* ; `role?`: *string* \| *Role* ; `subscription`: *Pick*<Subscription, *name* \| *id*\> ; `surname?`: *string*  }\>

Get current user

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`ctx` | [*Context*](graphql_context.context.md) | GraphQL context    |

**Returns:** *Promise*<{ `_id?`: *string* ; `configuration?`: *any* ; `displayName?`: *string* ; `givenName?`: *string* ; `id?`: *string* ; `jobTitle?`: *string* ; `mail?`: *string* ; `mobilePhone?`: *string* ; `preferredLanguage?`: *string* ; `role?`: *string* \| *Role* ; `subscription`: *Pick*<Subscription, *name* \| *id*\> ; `surname?`: *string*  }\>

Defined in: [server/graphql/resolvers/user/index.ts:33](https://github.com/Puzzlepart/did/blob/3f22c56c/server/graphql/resolvers/user/index.ts#L33)

___

### updateUserConfiguration

▸ **updateUserConfiguration**(`configuration`: *string*): *Promise*<BaseResult\>

Update user configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`configuration` | *string* | Configuration    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/user/index.ts:102](https://github.com/Puzzlepart/did/blob/3f22c56c/server/graphql/resolvers/user/index.ts#L102)

___

### users

▸ **users**(`query`: *UserQuery*): *Promise*<User[]\>

Get users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *UserQuery* | Query    |

**Returns:** *Promise*<User[]\>

Defined in: [server/graphql/resolvers/user/index.ts:56](https://github.com/Puzzlepart/did/blob/3f22c56c/server/graphql/resolvers/user/index.ts#L56)
