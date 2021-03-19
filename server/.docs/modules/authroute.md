[did-server - v0.9.11](../README.md) / AuthRoute

# Module: AuthRoute

NodeJS `express` auth route

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

Defined in: [routes/auth.ts:13](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L13)

## Functions

### authCallbackHandler

▸ `Const`**authCallbackHandler**(`strategy`: *azuread-openidconnect* \| *google*): *function*

Handler for /auth/azuread-openidconnect/callback and  /auth/google/callback

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | *azuread-openidconnect* \| *google* |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Defined in: [routes/auth.ts:41](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L41)

___

### signInHandler

▸ `Const`**signInHandler**(`strategy`: *azuread-openidconnect* \| *google*, `options`: AuthenticateOptions): *function*

Handler for /auth/azuread-openidconnect/signin and /auth/google/signin

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | *azuread-openidconnect* \| *google* |
`options` | AuthenticateOptions |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Defined in: [routes/auth.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L24)

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

Defined in: [routes/auth.ts:78](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L78)
