[did-server - v0.9.10](../README.md) / [graphql](../modules/graphql.md) / User

# Class: User

[graphql](../modules/graphql.md).User

A type that describes a User

## Table of contents

### Constructors

- [constructor](graphql.user.md#constructor)

### Properties

- [\_id](graphql.user.md#_id)
- [configuration](graphql.user.md#configuration)
- [displayName](graphql.user.md#displayname)
- [givenName](graphql.user.md#givenname)
- [hiddenFromReports](graphql.user.md#hiddenfromreports)
- [id](graphql.user.md#id)
- [jobTitle](graphql.user.md#jobtitle)
- [mail](graphql.user.md#mail)
- [mobilePhone](graphql.user.md#mobilephone)
- [photo](graphql.user.md#photo)
- [preferredLanguage](graphql.user.md#preferredlanguage)
- [provider](graphql.user.md#provider)
- [role](graphql.user.md#role)
- [startPage](graphql.user.md#startpage)
- [subscription](graphql.user.md#subscription)
- [surname](graphql.user.md#surname)

### Methods

- [create](graphql.user.md#create)

## Constructors

### constructor

\+ **new User**(): [*User*](graphql.user.md)

**Returns:** [*User*](graphql.user.md)

## Properties

### \_id

• `Optional` **\_id**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:32](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L32)

___

### configuration

• `Optional` **configuration**: *any*

Defined in: [server/graphql/resolvers/user/types.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L71)

___

### displayName

• `Optional` **displayName**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:38](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L38)

___

### givenName

• `Optional` **givenName**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L41)

___

### hiddenFromReports

• `Optional` **hiddenFromReports**: *boolean*

Defined in: [server/graphql/resolvers/user/types.ts:62](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L62)

___

### id

• `Optional` **id**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L35)

___

### jobTitle

• `Optional` **jobTitle**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L47)

___

### mail

• `Optional` **mail**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:53](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L53)

___

### mobilePhone

• `Optional` **mobilePhone**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L50)

___

### photo

• `Optional` **photo**: [*UserPhoto*](graphql.userphoto.md)

Defined in: [server/graphql/resolvers/user/types.ts:77](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L77)

___

### preferredLanguage

• `Optional` **preferredLanguage**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:59](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L59)

___

### provider

• `Optional` **provider**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:74](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L74)

___

### role

• `Optional` **role**: *string* \| [*Role*](graphql.role.md)

Defined in: [server/graphql/resolvers/user/types.ts:65](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L65)

___

### startPage

• `Optional` **startPage**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:56](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L56)

___

### subscription

• `Optional` **subscription**: [*Subscription*](graphql.subscription.md)

Defined in: [server/graphql/resolvers/user/types.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L68)

___

### surname

• `Optional` **surname**: *string*

Defined in: [server/graphql/resolvers/user/types.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L44)

## Methods

### create

▸ `Optional`**create**(`user`: [*User*](graphql.user.md)): [*User*](graphql.user.md)

#### Parameters:

Name | Type |
:------ | :------ |
`user` | [*User*](graphql.user.md) |

**Returns:** [*User*](graphql.user.md)

Defined in: [server/graphql/resolvers/user/types.ts:79](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L79)
