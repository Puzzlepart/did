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

▸ `Const`**authCallbackHandler**(`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction): *void*

Handler for /auth/callback

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | *Request*<ParamsDictionary, any, any, ParsedQs\> | Request   |
`response` | *Response*<any\> | Response   |
`next` | NextFunction | Next function    |

**Returns:** *void*

Defined in: [server/routes/auth.ts:38](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L38)

___

### signInHandler

▸ `Const`**signInHandler**(`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction): *void*

Handler for /auth/signin

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`request` | *Request*<ParamsDictionary, any, any, ParsedQs\> | Request   |
`response` | *Response*<any\> | Response   |
`next` | NextFunction | Next function    |

**Returns:** *void*

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

Defined in: [server/routes/auth.ts:80](https://github.com/Puzzlepart/did/blob/dev/server/routes/auth.ts#L80)
