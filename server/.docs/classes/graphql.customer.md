[did-server - v0.11.5](../README.md) / [GraphQL](../modules/graphql.md) / Customer

# Class: Customer

[GraphQL](../modules/graphql.md).Customer

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

Defined in: [graphql/resolvers/customer/types.ts:20](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L20)

___

### externalSystemURL

• **externalSystemURL**: *string*

Defined in: [graphql/resolvers/customer/types.ts:26](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L26)

___

### icon

• **icon**: *string*

Defined in: [graphql/resolvers/customer/types.ts:29](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L29)

___

### inactive

• `Optional` **inactive**: *boolean*

Defined in: [graphql/resolvers/customer/types.ts:32](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L32)

___

### key

• **key**: *string*

Defined in: [graphql/resolvers/customer/types.ts:14](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L14)

___

### name

• **name**: *string*

Defined in: [graphql/resolvers/customer/types.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L17)

___

### webLink

• **webLink**: *string*

Defined in: [graphql/resolvers/customer/types.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L23)

## Methods

### fromInput

▸ **fromInput**(`input`: [*CustomerInput*](graphql.customerinput.md)): [*Customer*](graphql.customer.md)

Creates a Customer object from a CustomerInput object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`input` | [*CustomerInput*](graphql.customerinput.md) | Input object    |

**Returns:** [*Customer*](graphql.customer.md)

Defined in: [graphql/resolvers/customer/types.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/types.ts#L39)
