[did-client - v0.9.11](../README.md) / [App](../modules/app.md) / ContextUser

# Class: ContextUser

[App](../modules/app.md).ContextUser

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

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_user?` | *User* | User object    |

**Returns:** [*ContextUser*](app.contextuser.md)

Defined in: client/app/ContextUser.ts:15

## Properties

### configuration

• **configuration**: *Record*<string, any\>

Defined in: client/app/ContextUser.ts:14

___

### displayName

• **displayName**: *string*

Defined in: client/app/ContextUser.ts:10

___

### id

• **id**: *string*

Defined in: client/app/ContextUser.ts:9

___

### mail

• **mail**: *string*

Defined in: client/app/ContextUser.ts:12

___

### photo

• **photo**: *UserPhoto*

Defined in: client/app/ContextUser.ts:15

___

### role

• **role**: *Role*

Defined in: client/app/ContextUser.ts:11

___

### startPage

• **startPage**: *string*

Defined in: client/app/ContextUser.ts:13

## Accessors

### preferredLanguage

• get **preferredLanguage**(): *string*

Preferred user language

- `nb-no` are mapped to `nb`
- `nn-no` are mapped to `nn`
- Default is `config.app.DEFAULT_USER_LANGUAGE`

**Returns:** *string*

Defined in: client/app/ContextUser.ts:41

## Methods

### hasPermission

▸ `Optional`**hasPermission**(`permission?`: PermissionScope): *boolean*

Checks if the user has the specified permission

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`permission?` | PermissionScope | Permission    |

**Returns:** *boolean*

Defined in: client/app/ContextUser.ts:62
