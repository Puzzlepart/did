[did-server - v0.10.9](../README.md) / [GraphQL](../modules/graphql.md) / User

# Class: User

[GraphQL](../modules/graphql.md).User

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
- [lastActive](graphql.user.md#lastactive)
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

Defined in: [graphql/resolvers/user/types.ts:36](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L36)

___

### configuration

• `Optional` **configuration**: *any*

User configuration is stored as a JSON string.

Defined in: [graphql/resolvers/user/types.ts:78](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L78)

___

### displayName

• `Optional` **displayName**: *string*

Defined in: [graphql/resolvers/user/types.ts:42](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L42)

___

### givenName

• `Optional` **givenName**: *string*

Defined in: [graphql/resolvers/user/types.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L45)

___

### hiddenFromReports

• `Optional` **hiddenFromReports**: *boolean*

Defined in: [graphql/resolvers/user/types.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L66)

___

### id

• `Optional` **id**: *string*

Defined in: [graphql/resolvers/user/types.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L39)

___

### jobTitle

• `Optional` **jobTitle**: *string*

Defined in: [graphql/resolvers/user/types.ts:51](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L51)

___

### lastActive

• `Optional` **lastActive**: Date

Defined in: [graphql/resolvers/user/types.ts:87](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L87)

___

### mail

• `Optional` **mail**: *string*

Defined in: [graphql/resolvers/user/types.ts:57](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L57)

___

### mobilePhone

• `Optional` **mobilePhone**: *string*

Defined in: [graphql/resolvers/user/types.ts:54](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L54)

___

### photo

• `Optional` **photo**: [*UserPhoto*](graphql.userphoto.md)

Defined in: [graphql/resolvers/user/types.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L84)

___

### preferredLanguage

• `Optional` **preferredLanguage**: *string*

Defined in: [graphql/resolvers/user/types.ts:63](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L63)

___

### provider

• `Optional` **provider**: *string*

Defined in: [graphql/resolvers/user/types.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L81)

___

### role

• `Optional` **role**: *string* \| [*Role*](graphql.role.md)

Defined in: [graphql/resolvers/user/types.ts:69](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L69)

___

### startPage

• `Optional` **startPage**: *string*

Defined in: [graphql/resolvers/user/types.ts:60](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L60)

___

### subscription

• `Optional` **subscription**: [*Subscription*](graphql.subscription.md)

Defined in: [graphql/resolvers/user/types.ts:72](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L72)

___

### surname

• `Optional` **surname**: *string*

Defined in: [graphql/resolvers/user/types.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L48)

## Methods

### create

▸ `Optional`**create**(`user`: [*User*](graphql.user.md)): [*User*](graphql.user.md)

#### Parameters:

Name | Type |
:------ | :------ |
`user` | [*User*](graphql.user.md) |

**Returns:** [*User*](graphql.user.md)

Defined in: [graphql/resolvers/user/types.ts:89](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L89)
