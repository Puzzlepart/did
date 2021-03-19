[did-server - v0.9.11](../README.md) / [graphql](../modules/graphql.md) / CustomerResolver

# Class: CustomerResolver

[graphql](../modules/graphql.md).CustomerResolver

Resolver for `Customer`.

`CustomerService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

## Table of contents

### Constructors

- [constructor](graphql.customerresolver.md#constructor)

### Methods

- [createOrUpdateCustomer](graphql.customerresolver.md#createorupdatecustomer)
- [customers](graphql.customerresolver.md#customers)
- [deleteCustomer](graphql.customerresolver.md#deletecustomer)

## Constructors

### constructor

\+ **new CustomerResolver**(`_customer`: [*CustomerService*](services.customerservice.md)): [*CustomerResolver*](graphql.customerresolver.md)

Constructor for CustomerResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_customer` | [*CustomerService*](services.customerservice.md) | Customer service    |

**Returns:** [*CustomerResolver*](graphql.customerresolver.md)

Defined in: [graphql/resolvers/customer/index.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/index.ts#L24)

## Methods

### createOrUpdateCustomer

▸ **createOrUpdateCustomer**(`customer`: [*CustomerInput*](graphql.customerinput.md), `update`: *boolean*): *Promise*<{ `success`: *boolean* = true }\>

Create or update customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customer` | [*CustomerInput*](graphql.customerinput.md) | Customer   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<{ `success`: *boolean* = true }\>

Defined in: [graphql/resolvers/customer/index.ts:51](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/index.ts#L51)

___

### customers

▸ **customers**(`sortBy`: *string*): *Promise*<[*Customer*](graphql.customer.md)[]\>

Get customers

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`sortBy` | *string* | Sort by    |

**Returns:** *Promise*<[*Customer*](graphql.customer.md)[]\>

Defined in: [graphql/resolvers/customer/index.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/index.ts#L39)

___

### deleteCustomer

▸ **deleteCustomer**(`key`: *string*): *Promise*<void\>

Delete customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | Key    |

**Returns:** *Promise*<void\>

Defined in: [graphql/resolvers/customer/index.ts:69](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/customer/index.ts#L69)
