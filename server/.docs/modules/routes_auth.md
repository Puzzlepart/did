[did-server - v0.9.11](../README.md) / routes/auth

# Module: routes/auth

## Table of contents

### Variables

- [default](routes_auth.md#default)

### Functions

- [authCallbackHandler](routes_auth.md#authcallbackhandler)
- [signInHandler](routes_auth.md#signinhandler)
- [signOutHandler](routes_auth.md#signouthandler)

## Variables

### default

• `Const` **default**: *Router*

Defined in: [server/routes/auth.ts:7](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L7)

## Functions

### authCallbackHandler

▸ `Const`**authCallbackHandler**(`strategy`: *google* \| *azuread-openidconnect*): *function*

Handler for /auth/azuread-openidconnect/callback and  /auth/google/callback

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | *google* \| *azuread-openidconnect* |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Defined in: [server/routes/auth.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L35)

___

### signInHandler

▸ `Const`**signInHandler**(`strategy`: *google* \| *azuread-openidconnect*, `options`: AuthenticateOptions): *function*

Handler for /auth/azuread-openidconnect/signin and /auth/google/signin

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | *google* \| *azuread-openidconnect* |
`options` | AuthenticateOptions |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Defined in: [server/routes/auth.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L18)

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

Defined in: [server/routes/auth.ts:72](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L72)
