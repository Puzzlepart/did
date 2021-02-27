[did](../README.md) / [@custom-types](../modules/_custom_types.md) / [Express](../modules/_custom_types.express.md) / SessionCookie

# Interface: SessionCookie

[@custom-types](../modules/_custom_types.md).[Express](../modules/_custom_types.express.md).SessionCookie

## Hierarchy

* [*SessionCookieData*](_custom_types.express.sessioncookiedata.md)

  ↳ **SessionCookie**

## Table of contents

### Properties

- [domain](_custom_types.express.sessioncookie.md#domain)
- [expires](_custom_types.express.sessioncookie.md#expires)
- [httpOnly](_custom_types.express.sessioncookie.md#httponly)
- [maxAge](_custom_types.express.sessioncookie.md#maxage)
- [originalMaxAge](_custom_types.express.sessioncookie.md#originalmaxage)
- [path](_custom_types.express.sessioncookie.md#path)
- [sameSite](_custom_types.express.sessioncookie.md#samesite)
- [secure](_custom_types.express.sessioncookie.md#secure)

### Methods

- [serialize](_custom_types.express.sessioncookie.md#serialize)

## Properties

### domain

• `Optional` **domain**: *string*

Inherited from: [SessionCookieData](_custom_types.express.sessioncookiedata.md).[domain](_custom_types.express.sessioncookiedata.md#domain)

Defined in: node_modules/@types/express-session/index.d.ts:35

___

### expires

• **expires**: *boolean* \| Date

Inherited from: [SessionCookieData](_custom_types.express.sessioncookiedata.md).[expires](_custom_types.express.sessioncookiedata.md#expires)

Defined in: node_modules/@types/express-session/index.d.ts:36

___

### httpOnly

• **httpOnly**: *boolean*

Inherited from: [SessionCookieData](_custom_types.express.sessioncookiedata.md).[httpOnly](_custom_types.express.sessioncookiedata.md#httponly)

Defined in: node_modules/@types/express-session/index.d.ts:34

___

### maxAge

• **maxAge**: *number*

Inherited from: [SessionCookieData](_custom_types.express.sessioncookiedata.md).[maxAge](_custom_types.express.sessioncookiedata.md#maxage)

Defined in: node_modules/@types/express-session/index.d.ts:32

___

### originalMaxAge

• **originalMaxAge**: *number*

Inherited from: [SessionCookieData](_custom_types.express.sessioncookiedata.md).[originalMaxAge](_custom_types.express.sessioncookiedata.md#originalmaxage)

Defined in: node_modules/@types/express-session/index.d.ts:30

___

### path

• **path**: *string*

Inherited from: [SessionCookieData](_custom_types.express.sessioncookiedata.md).[path](_custom_types.express.sessioncookiedata.md#path)

Defined in: node_modules/@types/express-session/index.d.ts:31

___

### sameSite

• `Optional` **sameSite**: *string* \| *boolean*

Inherited from: [SessionCookieData](_custom_types.express.sessioncookiedata.md).[sameSite](_custom_types.express.sessioncookiedata.md#samesite)

Defined in: node_modules/@types/express-session/index.d.ts:37

___

### secure

• `Optional` **secure**: *boolean*

Inherited from: [SessionCookieData](_custom_types.express.sessioncookiedata.md).[secure](_custom_types.express.sessioncookiedata.md#secure)

Defined in: node_modules/@types/express-session/index.d.ts:33

## Methods

### serialize

▸ **serialize**(`name`: *string*, `value`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`name` | *string* |
`value` | *string* |

**Returns:** *string*

Defined in: node_modules/@types/express-session/index.d.ts:41
