[did-server - v0.9.9](../README.md) / routes/auth

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

Defined in: [server/routes/auth.ts:6](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L6)

## Functions

### authCallbackHandler

▸ `Const`**authCallbackHandler**(`strategy`: *google* \| *azuread-openidconnect*): *function*

Handler for /auth/ad/callback and  /auth/google/callback

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | *google* \| *azuread-openidconnect* |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Defined in: [server/routes/auth.ts:34](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L34)

___

### signInHandler

▸ `Const`**signInHandler**(`strategy`: *google* \| *azuread-openidconnect*, `options`: AuthenticateOptions): *function*

Handler for /auth/ad/signin and /auth/google/signin

#### Parameters:

Name | Type |
:------ | :------ |
`strategy` | *google* \| *azuread-openidconnect* |
`options` | AuthenticateOptions |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Defined in: [server/routes/auth.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L17)

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

Defined in: [server/routes/auth.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L71)
