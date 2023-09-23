[did-server - v0.13.0](../README.md) / [GraphQL](../modules/graphql.md) / User

# Class: User

[GraphQL](../modules/graphql.md).User

A type that describes a User

## Table of contents

### Constructors

- [constructor](graphql.user.md#constructor)

### Properties

- [\_id](graphql.user.md#_id)
- [accountEnabled](graphql.user.md#accountenabled)
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

Defined in: [graphql/resolvers/user/types.ts:73](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L73)

___

### accountEnabled

• `Optional` **accountEnabled**: *boolean*

Defined in: [graphql/resolvers/user/types.ts:124](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L124)

___

### configuration

• `Optional` **configuration**: *any*

Defined in: [graphql/resolvers/user/types.ts:112](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L112)

___

### displayName

• `Optional` **displayName**: *string*

Defined in: [graphql/resolvers/user/types.ts:79](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L79)

___

### givenName

• `Optional` **givenName**: *string*

Defined in: [graphql/resolvers/user/types.ts:82](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L82)

___

### hiddenFromReports

• `Optional` **hiddenFromReports**: *boolean*

Defined in: [graphql/resolvers/user/types.ts:103](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L103)

___

### id

• `Optional` **id**: *string*

Defined in: [graphql/resolvers/user/types.ts:76](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L76)

___

### jobTitle

• `Optional` **jobTitle**: *string*

Defined in: [graphql/resolvers/user/types.ts:88](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L88)

___

### lastActive

• `Optional` **lastActive**: Date

Defined in: [graphql/resolvers/user/types.ts:121](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L121)

___

### mail

• `Optional` **mail**: *string*

Defined in: [graphql/resolvers/user/types.ts:94](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L94)

___

### mobilePhone

• `Optional` **mobilePhone**: *string*

Defined in: [graphql/resolvers/user/types.ts:91](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L91)

___

### photo

• `Optional` **photo**: [*UserPhoto*](graphql.userphoto.md)

Defined in: [graphql/resolvers/user/types.ts:118](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L118)

___

### preferredLanguage

• `Optional` **preferredLanguage**: *string*

Defined in: [graphql/resolvers/user/types.ts:100](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L100)

___

### provider

• `Optional` **provider**: *string*

Defined in: [graphql/resolvers/user/types.ts:115](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L115)

___

### role

• `Optional` **role**: *string* \| [*Role*](graphql.role.md)

Defined in: [graphql/resolvers/user/types.ts:106](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L106)

___

### startPage

• `Optional` **startPage**: *string*

Defined in: [graphql/resolvers/user/types.ts:97](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L97)

___

### subscription

• `Optional` **subscription**: [*Subscription*](graphql.subscription.md)

Defined in: [graphql/resolvers/user/types.ts:109](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L109)

___

### surname

• `Optional` **surname**: *string*

Defined in: [graphql/resolvers/user/types.ts:85](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L85)

## Methods

### create

▸ `Optional`**create**(`user`: [*User*](graphql.user.md)): [*User*](graphql.user.md)

#### Parameters:

Name | Type |
:------ | :------ |
`user` | [*User*](graphql.user.md) |

**Returns:** [*User*](graphql.user.md)

Defined in: [graphql/resolvers/user/types.ts:126](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/user/types.ts#L126)
