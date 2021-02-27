[did-server](../README.md) / [graphql](../modules/graphql.md) / Customer

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

Defined in: [server/graphql/resolvers/customer/types.ts:16](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/customer/types.ts#L16)

___

### externalSystemURL

• **externalSystemURL**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:22](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/customer/types.ts#L22)

___

### icon

• **icon**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:25](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/customer/types.ts#L25)

___

### inactive

• `Optional` **inactive**: *boolean*

Defined in: [server/graphql/resolvers/customer/types.ts:28](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/customer/types.ts#L28)

___

### key

• **key**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:10](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/customer/types.ts#L10)

___

### name

• **name**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:13](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/customer/types.ts#L13)

___

### webLink

• **webLink**: *string*

Defined in: [server/graphql/resolvers/customer/types.ts:19](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/customer/types.ts#L19)

## Methods

### fromInput

▸ **fromInput**(`input`: [*CustomerInput*](graphql.customerinput.md)): [*Customer*](graphql.customer.md)

Creates a Customer object from a CustomerInput object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`input` | [*CustomerInput*](graphql.customerinput.md) | Input object    |

**Returns:** [*Customer*](graphql.customer.md)

Defined in: [server/graphql/resolvers/customer/types.ts:35](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/customer/types.ts#L35)
