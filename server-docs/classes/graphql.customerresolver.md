[did-server](../README.md) / [graphql](../modules/graphql.md) / CustomerResolver

# Class: CustomerResolver

[graphql](../modules/graphql.md).CustomerResolver

## Table of contents

### Constructors

- [constructor](graphql.customerresolver.md#constructor)

### Methods

- [createOrUpdateCustomer](graphql.customerresolver.md#createorupdatecustomer)
- [customers](graphql.customerresolver.md#customers)
- [deleteCustomer](graphql.customerresolver.md#deletecustomer)

## Constructors

### constructor

\+ **new CustomerResolver**(`_mongo`: [*MongoService*](services.mongoservice.md)): [*CustomerResolver*](graphql.customerresolver.md)

Constructor for CustomerResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_mongo` | [*MongoService*](services.mongoservice.md) | Mongo service    |

**Returns:** [*CustomerResolver*](graphql.customerresolver.md)

Defined in: [server/graphql/resolvers/customer/index.ts:12](https://github.com/Puzzlepart/did/blob/1b47620b/server/graphql/resolvers/customer/index.ts#L12)

## Methods

### createOrUpdateCustomer

▸ **createOrUpdateCustomer**(`customer`: *CustomerInput*, `update`: *boolean*): *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Create or update customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customer` | *CustomerInput* | Customer   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<{ `error`: *any* = null; `success`: *boolean* = true }\>

Defined in: [server/graphql/resolvers/customer/index.ts:39](https://github.com/Puzzlepart/did/blob/1b47620b/server/graphql/resolvers/customer/index.ts#L39)

___

### customers

▸ **customers**(`sortBy`: *string*): *Promise*<Customer[]\>

Get customers

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`sortBy` | *string* | Sort by    |

**Returns:** *Promise*<Customer[]\>

Defined in: [server/graphql/resolvers/customer/index.ts:27](https://github.com/Puzzlepart/did/blob/1b47620b/server/graphql/resolvers/customer/index.ts#L27)

___

### deleteCustomer

▸ **deleteCustomer**(`key`: *string*): *Promise*<void\>

Delete customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | Key    |

**Returns:** *Promise*<void\>

Defined in: [server/graphql/resolvers/customer/index.ts:56](https://github.com/Puzzlepart/did/blob/1b47620b/server/graphql/resolvers/customer/index.ts#L56)
