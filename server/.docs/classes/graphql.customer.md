[did-server - v0.9.8](../README.md) / [graphql](../modules/graphql.md) / Customer

# Class: Customer

[graphql](../modules/graphql.md).Customer

## Table of contents

### Constructors

- [constructor](graphql.customer.md#constructor)

### Properties

- [description](graphql.customer.md#description)
- [externalSystemURL](graphql.customer.md#externalsystemurl)
- [icon](graphql.customer.md#icon)
- [inactive](graphql.customer.md#inactive)
- [key](graphql.customer.md#key)
- [name](graphql.customer.md#name)
- [webLink](graphql.customer.md#weblink)

### Methods

- [fromInput](graphql.customer.md#frominput)

## Constructors

### constructor

\+ **new Customer**(): [*Customer*](graphql.customer.md)

**Returns:** [*Customer*](graphql.customer.md)

## Properties

### description

• **description**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L21)

___

### externalSystemURL

• **externalSystemURL**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L27)

___

### icon

• **icon**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L30)

___

### inactive

• `Optional` **inactive**: *boolean*

Defined in: [server/graphql/resolvers/customer/types.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L33)

___

### key

• **key**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L15)

___

### name

• **name**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L18)

___

### webLink

• **webLink**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L24)

## Methods

### fromInput

▸ **fromInput**(`input`: [*CustomerInput*](graphql.customerinput.md)): [*Customer*](graphql.customer.md)

Creates a Customer object from a CustomerInput object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`input` | [*CustomerInput*](graphql.customerinput.md) | Input object    |

**Returns:** [*Customer*](graphql.customer.md)

Defined in: [server/graphql/resolvers/customer/types.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L40)
