[did-server - v0.11.3](../README.md) / AuthRoute

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

Defined in: [routes/auth.ts:15](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L15)

## Functions

### authCallbackHandler

▸ `Const`**authCallbackHandler**(`strategy`: AuthProvider): *function*

Handler for `/auth/azuread-openidconnect/callback` and  `/auth/google/callback`

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | AuthProvider |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>, `response`: *Response*<any, Record<string, any\>\>, `next`: NextFunction) => *void*

Defined in: [routes/auth.ts:46](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L46)

___

### signInHandler

▸ `Const`**signInHandler**(`strategy`: AuthProvider, `options`: AuthenticateOptions): *function*

Handler for `/auth/azuread-openidconnect/signin` and `/auth/google/signin

**`remarks`** Regenerates the session before authenticating with the provided
strategy using `request.session.regenerate`.

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | AuthProvider |
`options` | AuthenticateOptions |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>, `response`: *Response*<any, Record<string, any\>\>, `next`: NextFunction) => *void*

Defined in: [routes/auth.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L30)

___

### signOutHandler

▸ `Const`**signOutHandler**(`request`: *Request*<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>, `response`: *Response*<any, Record<string, any\>\>): *void*

Handler for `/auth/signout`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | *Request*<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\> | Request   |
`response` | *Response*<any, Record<string, any\>\> | Response   |

**Returns:** *void*

Defined in: [routes/auth.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L83)
