[did-server](../README.md) / [@custom-types](../modules/_custom_types.md) / [Express](../modules/_custom_types.express.md) / Request

# Interface: Request

[@custom-types](../modules/_custom_types.md).[Express](../modules/_custom_types.express.md).Request

## Hierarchy

* **Request**

  ↳ [*AuthenticatedRequest*](_custom_types.express.authenticatedrequest.md)

  ↳ [*UnauthenticatedRequest*](_custom_types.express.unauthenticatedrequest.md)

## Table of contents

### Properties

- [authInfo](_custom_types.express.request.md#authinfo)
- [session](_custom_types.express.request.md#session)
- [sessionID](_custom_types.express.request.md#sessionid)
- [token](_custom_types.express.request.md#token)
- [user](_custom_types.express.request.md#user)

### Methods

- [isAuthenticated](_custom_types.express.request.md#isauthenticated)
- [isUnauthenticated](_custom_types.express.request.md#isunauthenticated)
- [logIn](_custom_types.express.request.md#login)
- [logOut](_custom_types.express.request.md#logout)
- [login](_custom_types.express.request.md#login)
- [logout](_custom_types.express.request.md#logout)

## Properties

### authInfo

• `Optional` **authInfo**: [*AuthInfo*](_custom_types.express.authinfo.md)

Defined in: node_modules/@types/passport/index.d.ts:23

___

### session

• `Optional` **session**: [*Session*](_custom_types.express.session.md)

Defined in: node_modules/@types/express-session/index.d.ts:20

___

### sessionID

• `Optional` **sessionID**: *string*

Defined in: node_modules/@types/express-session/index.d.ts:21

___

### token

• `Optional` **token**: *string*

Defined in: node_modules/express-bearer-token/index.d.ts:72

___

### user

• `Optional` **user**: [*User*](_custom_types.express.user.md)

Defined in: node_modules/@types/passport/index.d.ts:24

## Methods

### isAuthenticated

▸ **isAuthenticated**(): this is AuthenticatedRequest

**Returns:** this is AuthenticatedRequest

Defined in: node_modules/@types/passport/index.d.ts:35

___

### isUnauthenticated

▸ **isUnauthenticated**(): this is UnauthenticatedRequest

**Returns:** this is UnauthenticatedRequest

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

Defined in: node_modules/@types/passport/index.d.ts:29

▸ **logIn**(`user`: [*User*](_custom_types.express.user.md), `options`: *any*, `done`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`user` | [*User*](_custom_types.express.user.md) |
`options` | *any* |
`done` | (`err`: *any*) => *void* |

**Returns:** *void*

Defined in: node_modules/@types/passport/index.d.ts:30

___

### logOut

▸ **logOut**(): *void*

**Returns:** *void*

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

Defined in: node_modules/@types/passport/index.d.ts:27

▸ **login**(`user`: [*User*](_custom_types.express.user.md), `options`: *any*, `done`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`user` | [*User*](_custom_types.express.user.md) |
`options` | *any* |
`done` | (`err`: *any*) => *void* |

**Returns:** *void*

Defined in: node_modules/@types/passport/index.d.ts:28

___

### logout

▸ **logout**(): *void*

**Returns:** *void*

Defined in: node_modules/@types/passport/index.d.ts:32
