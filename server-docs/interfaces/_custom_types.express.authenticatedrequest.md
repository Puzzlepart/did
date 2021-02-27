[did-server](../README.md) / [Modules](../modules.md) / [@custom-types](../modules/_custom_types.md) / [Express](../modules/_custom_types.express.md) / AuthenticatedRequest

# Interface: AuthenticatedRequest

[@custom-types](../modules/_custom_types.md).[Express](../modules/_custom_types.express.md).AuthenticatedRequest

## Hierarchy

* [*Request*](_custom_types.express.request.md)

  ↳ **AuthenticatedRequest**

## Table of contents

### Properties

- [authInfo](_custom_types.express.authenticatedrequest.md#authinfo)
- [session](_custom_types.express.authenticatedrequest.md#session)
- [sessionID](_custom_types.express.authenticatedrequest.md#sessionid)
- [token](_custom_types.express.authenticatedrequest.md#token)
- [user](_custom_types.express.authenticatedrequest.md#user)

### Methods

- [isAuthenticated](_custom_types.express.authenticatedrequest.md#isauthenticated)
- [isUnauthenticated](_custom_types.express.authenticatedrequest.md#isunauthenticated)
- [logIn](_custom_types.express.authenticatedrequest.md#login)
- [logOut](_custom_types.express.authenticatedrequest.md#logout)
- [login](_custom_types.express.authenticatedrequest.md#login)
- [logout](_custom_types.express.authenticatedrequest.md#logout)

## Properties

### authInfo

• `Optional` **authInfo**: [*AuthInfo*](_custom_types.express.authinfo.md)

Inherited from: [Request](_custom_types.express.request.md).[authInfo](_custom_types.express.request.md#authinfo)

Defined in: node_modules/@types/passport/index.d.ts:23

___

### session

• `Optional` **session**: [*Session*](_custom_types.express.session.md)

Inherited from: [Request](_custom_types.express.request.md).[session](_custom_types.express.request.md#session)

Defined in: node_modules/@types/express-session/index.d.ts:20

___

### sessionID

• `Optional` **sessionID**: *string*

Inherited from: [Request](_custom_types.express.request.md).[sessionID](_custom_types.express.request.md#sessionid)

Defined in: node_modules/@types/express-session/index.d.ts:21

___

### token

• `Optional` **token**: *string*

Inherited from: [Request](_custom_types.express.request.md).[token](_custom_types.express.request.md#token)

Defined in: node_modules/express-bearer-token/index.d.ts:72

___

### user

• **user**: [*User*](_custom_types.express.user.md)

Overrides: [Request](_custom_types.express.request.md).[user](_custom_types.express.request.md#user)

Defined in: node_modules/@types/passport/index.d.ts:40

## Methods

### isAuthenticated

▸ **isAuthenticated**(): this is AuthenticatedRequest

**Returns:** this is AuthenticatedRequest

Inherited from: [Request](_custom_types.express.request.md)

Defined in: node_modules/@types/passport/index.d.ts:35

___

### isUnauthenticated

▸ **isUnauthenticated**(): this is UnauthenticatedRequest

**Returns:** this is UnauthenticatedRequest

Inherited from: [Request](_custom_types.express.request.md)

Defined in: node_modules/@types/passport/index.d.ts:36

___

### logIn

▸ **logIn**(`user`: [*User*](_custom_types.express.user.md), `done`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`user` | [*User*](_custom_types.express.user.md) |
`done` | (`err`: *any*) => *void* |

**Returns:** *void*

Inherited from: [Request](_custom_types.express.request.md)

Defined in: node_modules/@types/passport/index.d.ts:29

▸ **logIn**(`user`: [*User*](_custom_types.express.user.md), `options`: *any*, `done`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`user` | [*User*](_custom_types.express.user.md) |
`options` | *any* |
`done` | (`err`: *any*) => *void* |

**Returns:** *void*

Inherited from: [Request](_custom_types.express.request.md)

Defined in: node_modules/@types/passport/index.d.ts:30

___

### logOut

▸ **logOut**(): *void*

**Returns:** *void*

Inherited from: [Request](_custom_types.express.request.md)

Defined in: node_modules/@types/passport/index.d.ts:33

___

### login

▸ **login**(`user`: [*User*](_custom_types.express.user.md), `done`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`user` | [*User*](_custom_types.express.user.md) |
`done` | (`err`: *any*) => *void* |

**Returns:** *void*

Inherited from: [Request](_custom_types.express.request.md)

Defined in: node_modules/@types/passport/index.d.ts:27

▸ **login**(`user`: [*User*](_custom_types.express.user.md), `options`: *any*, `done`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`user` | [*User*](_custom_types.express.user.md) |
`options` | *any* |
`done` | (`err`: *any*) => *void* |

**Returns:** *void*

Inherited from: [Request](_custom_types.express.request.md)

Defined in: node_modules/@types/passport/index.d.ts:28

___

### logout

▸ **logout**(): *void*

**Returns:** *void*

Inherited from: [Request](_custom_types.express.request.md)

Defined in: node_modules/@types/passport/index.d.ts:32
