[did-server](../README.md) / [services](../modules/services.md) / CustomerService

# Class: CustomerService

[services](../modules/services.md).CustomerService

## Hierarchy

* *MongoDocumentService*<Customer\>

  ↳ **CustomerService**

## Table of contents

### Constructors

- [constructor](services.customerservice.md#constructor)

### Properties

- [cache](services.customerservice.md#cache)
- [cachePrefix](services.customerservice.md#cacheprefix)
- [collection](services.customerservice.md#collection)
- [collectionName](services.customerservice.md#collectionname)
- [context](services.customerservice.md#context)

### Methods

- [addCustomer](services.customerservice.md#addcustomer)
- [deleteCustomer](services.customerservice.md#deletecustomer)
- [find](services.customerservice.md#find)
- [getCustomers](services.customerservice.md#getcustomers)
- [updateCustomer](services.customerservice.md#updatecustomer)

## Constructors

### constructor

\+ **new CustomerService**(`context`: [*Context*](graphql_context.context.md)): [*CustomerService*](services.customerservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** [*CustomerService*](services.customerservice.md)

Defined in: [server/services/mongo/customer.ts:7](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/customer.ts#L7)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<Customer\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### addCustomer

▸ **addCustomer**(`customer`: *Customer*): *Promise*<void\>

Add customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customer` | *Customer* | Customer to add    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/customer.ts:17](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/customer.ts#L17)

___

### deleteCustomer

▸ **deleteCustomer**(`key`: *string*): *Promise*<void\>

Delete customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | Customer key    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/customer.ts:45](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/customer.ts#L45)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<Customer\>, `sort?`: S): *Promise*<Customer[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<Customer\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<Customer[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/@document.ts#L37)

___

### getCustomers

▸ **getCustomers**(`query?`: *FilterQuery*<Customer\>): *Promise*<Customer[]\>

Get customers

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<Customer\> | Query    |

**Returns:** *Promise*<Customer[]\>

Defined in: [server/services/mongo/customer.ts:59](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/customer.ts#L59)

___

### updateCustomer

▸ **updateCustomer**(`customer`: *Customer*): *Promise*<void\>

Update customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customer` | *Customer* | Customer to update    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/customer.ts:31](https://github.com/Puzzlepart/did/blob/846b6048/server/services/mongo/customer.ts#L31)
