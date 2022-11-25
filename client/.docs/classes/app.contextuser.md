[did-client - v0.11.3](../README.md) / [App](../modules/app.md) / ContextUser

# Class: ContextUser

[App](../modules/app.md).ContextUser

`ContextUser` is the user object used for
the `AppContext`

## Table of contents

### Constructors

- [constructor](app.contextuser.md#constructor)

### Properties

- [configuration](app.contextuser.md#configuration)
- [displayName](app.contextuser.md#displayname)
- [id](app.contextuser.md#id)
- [lastActive](app.contextuser.md#lastactive)
- [mail](app.contextuser.md#mail)
- [photo](app.contextuser.md#photo)
- [role](app.contextuser.md#role)
- [startPage](app.contextuser.md#startpage)
- [theme](app.contextuser.md#theme)

### Accessors

- [preferredLanguage](app.contextuser.md#preferredlanguage)

### Methods

- [hasPermission](app.contextuser.md#haspermission)

## Constructors

### constructor

\+ **new ContextUser**(`_user?`: *User*): [*ContextUser*](app.contextuser.md)

Constructor for `ContextUser`

Assigns the following properties
from the User object:

* `id`
* `displayName`
* `mail`
* `role`
* `startPage`
* `photo`
* `lastActive`

We can't extend the `User` class
due the usage of [type-graphql](https://www.npmjs.com/package/type-graphql)
decorators.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_user?` | *User* | User object    |

**Returns:** [*ContextUser*](app.contextuser.md)

Defined in: [client/app/ContextUser.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L22)

## Properties

### configuration

• **configuration**: *Record*<string, any\>

Defined in: [client/app/ContextUser.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L19)

___

### displayName

• **displayName**: *string*

Defined in: [client/app/ContextUser.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L15)

___

### id

• **id**: *string*

Defined in: [client/app/ContextUser.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L14)

___

### lastActive

• **lastActive**: Date

Defined in: [client/app/ContextUser.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L22)

___

### mail

• **mail**: *string*

Defined in: [client/app/ContextUser.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L17)

___

### photo

• **photo**: *UserPhoto*

Defined in: [client/app/ContextUser.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L20)

___

### role

• **role**: *Role*

Defined in: [client/app/ContextUser.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L16)

___

### startPage

• **startPage**: *string*

Defined in: [client/app/ContextUser.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L18)

___

### theme

• **theme**: PartialTheme

Defined in: [client/app/ContextUser.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L21)

## Accessors

### preferredLanguage

• get **preferredLanguage**(): *string*

Preferred user language

- `nb-no` are mapped to `nb`
- `nn-no` are mapped to `nn`
- Default is `en-GB`

**Returns:** *string*

Defined in: [client/app/ContextUser.ts:73](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L73)

## Methods

### hasPermission

▸ `Optional`**hasPermission**(`permission?`: PermissionScope): *boolean*

Checks if the user has the specified permission

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`permission?` | PermissionScope | Permission    |

**Returns:** *boolean*

Defined in: [client/app/ContextUser.ts:94](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L94)
