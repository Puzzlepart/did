[did-client - v0.9.11](../README.md) / [App](../modules/app.md) / ContextUser

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
- [mail](app.contextuser.md#mail)
- [photo](app.contextuser.md#photo)
- [role](app.contextuser.md#role)
- [startPage](app.contextuser.md#startpage)

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

* id
* displayName
* mail
* role
* startPage
* photo

We can't extend the `User` class
due the usage of [type-graphql](https://www.npmjs.com/package/type-graphql)
decorators.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_user?` | *User* | User object    |

**Returns:** [*ContextUser*](app.contextuser.md)

Defined in: [app/ContextUser.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L18)

## Properties

### configuration

• **configuration**: *Record*<string, any\>

Defined in: [app/ContextUser.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L17)

___

### displayName

• **displayName**: *string*

Defined in: [app/ContextUser.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L13)

___

### id

• **id**: *string*

Defined in: [app/ContextUser.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L12)

___

### mail

• **mail**: *string*

Defined in: [app/ContextUser.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L15)

___

### photo

• **photo**: *UserPhoto*

Defined in: [app/ContextUser.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L18)

___

### role

• **role**: *Role*

Defined in: [app/ContextUser.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L14)

___

### startPage

• **startPage**: *string*

Defined in: [app/ContextUser.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L16)

## Accessors

### preferredLanguage

• get **preferredLanguage**(): *string*

Preferred user language

- `nb-no` are mapped to `nb`
- `nn-no` are mapped to `nn`
- Default is `en-GB`

**Returns:** *string*

Defined in: [app/ContextUser.ts:56](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L56)

## Methods

### hasPermission

▸ `Optional`**hasPermission**(`permission?`: PermissionScope): *boolean*

Checks if the user has the specified permission

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`permission?` | PermissionScope | Permission    |

**Returns:** *boolean*

Defined in: [app/ContextUser.ts:77](https://github.com/Puzzlepart/did/blob/dev/client/app/ContextUser.ts#L77)
