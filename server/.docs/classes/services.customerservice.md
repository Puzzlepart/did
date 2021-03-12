[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / CustomerService

# Class: CustomerService

[services](../modules/services.md).CustomerService

## Hierarchy

* *MongoDocumentService*<[*Customer*](graphql.customer.md)\>

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
- [insert](services.customerservice.md#insert)
- [insertMultiple](services.customerservice.md#insertmultiple)
- [update](services.customerservice.md#update)
- [updateCustomer](services.customerservice.md#updatecustomer)

## Constructors

### constructor

\+ **new CustomerService**(`context`: [*Context*](graphql_context.context.md)): [*CustomerService*](services.customerservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** [*CustomerService*](services.customerservice.md)

Defined in: [server/services/mongo/customer.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L9)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L9)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*Customer*](graphql.customer.md)\>

Defined in: [server/services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### addCustomer

▸ **addCustomer**(`customer`: [*Customer*](graphql.customer.md)): *Promise*<void\>

Add customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customer` | [*Customer*](graphql.customer.md) | Customer to add    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/customer.ts:19](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L19)

___

### deleteCustomer

▸ **deleteCustomer**(`key`: *string*): *Promise*<void\>

Delete customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | Customer key    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/customer.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L47)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*Customer*](graphql.customer.md)\>, `sort?`: S): *Promise*<[*Customer*](graphql.customer.md)[]\>

Wrapper on find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Customer*](graphql.customer.md)\> | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*Customer*](graphql.customer.md)[]\>

Defined in: [server/services/mongo/@document.ts:70](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L70)

___

### getCustomers

▸ **getCustomers**(`query?`: *FilterQuery*<[*Customer*](graphql.customer.md)\>): *Promise*<[*Customer*](graphql.customer.md)[]\>

Get customers

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*Customer*](graphql.customer.md)\> | Query    |

**Returns:** *Promise*<[*Customer*](graphql.customer.md)[]\>

Defined in: [server/services/mongo/customer.ts:61](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L61)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*Customer*](graphql.customer.md)\>\>\>

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*Customer*](graphql.customer.md)\>\>\>

Defined in: [server/services/mongo/@document.ts:97](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L97)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<WithId<[*Customer*](graphql.customer.md)\>\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*Customer*](graphql.customer.md)\>\>\>

Defined in: [server/services/mongo/@document.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L81)

___

### update

▸ **update**(`query`: *FilterQuery*<[*Customer*](graphql.customer.md)\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*Customer*](graphql.customer.md)\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Defined in: [server/services/mongo/@document.ts:113](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L113)

___

### updateCustomer

▸ **updateCustomer**(`customer`: [*Customer*](graphql.customer.md)): *Promise*<void\>

Update customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customer` | [*Customer*](graphql.customer.md) | Customer to update    |

**Returns:** *Promise*<void\>

Defined in: [server/services/mongo/customer.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L33)
