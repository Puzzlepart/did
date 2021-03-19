[did-server - v0.9.11](../README.md) / AuthRoute

# Module: AuthRoute

NodeJS `express` auth route

Handles authentication with providers/strategies
`azuread-openidconnect` and `google`

## Table of contents

### Variables

- [default](authroute.md#default)

### Functions

- [authCallbackHandler](authroute.md#authcallbackhandler)
- [signInHandler](authroute.md#signinhandler)
- [signOutHandler](authroute.md#signouthandler)

## Variables

### default

• `Const` **default**: *Router*

Defined in: [routes/auth.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L16)

## Functions

### authCallbackHandler

▸ `Const`**authCallbackHandler**(`strategy`: AuthProvider): *function*

Handler for /auth/azuread-openidconnect/callback and  /auth/google/callback

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | AuthProvider |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Defined in: [routes/auth.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L45)

___

### signInHandler

▸ `Const`**signInHandler**(`strategy`: AuthProvider, `options`: AuthenticateOptions): *function*

Handler for /auth/azuread-openidconnect/signin and /auth/google/signin

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | AuthProvider |
`options` | AuthenticateOptions |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Defined in: [routes/auth.ts:28](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L28)

___

### signOutHandler

▸ `Const`**signOutHandler**(`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>): *void*

Handler for /auth/signout

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | *Request*<ParamsDictionary, any, any, ParsedQs\> | Request   |
`response` | *Response*<any\> | Response   |

**Returns:** *void*

Defined in: [routes/auth.ts:82](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L82)
