[did-server - v0.9.11](../README.md) / [Services](../modules/services.md) / CustomerService

# Class: CustomerService

[Services](../modules/services.md).CustomerService

Customer service

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

\+ **new CustomerService**(`context`: *Context*): [*CustomerService*](services.customerservice.md)

Constructor for `CustomerService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*CustomerService*](services.customerservice.md)

Overrides: void

Defined in: [services/mongo/customer.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L16)

## Properties

### cache

• **cache**: [*CacheService*](services.cacheservice.md)= null

Inherited from: void

Defined in: [services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

Inherited from: void

___

### collection

• **collection**: *Collection*<[*Customer*](graphql.customer.md)\>

Inherited from: void

Defined in: [services/mongo/@document.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L11)

___

### collectionName

• **collectionName**: *string*

Inherited from: void

___

### context

• `Readonly` **context**: *Context*

Inherited from: void

## Methods

### addCustomer

▸ **addCustomer**(`customer`: [*Customer*](graphql.customer.md)): *Promise*<void\>

Add customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customer` | [*Customer*](graphql.customer.md) | Customer to add    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/customer.ts:31](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L31)

___

### deleteCustomer

▸ **deleteCustomer**(`key`: *string*): *Promise*<void\>

Delete customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | Customer key    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/customer.ts:62](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L62)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L71)

___

### getCustomers

▸ **getCustomers**(`query?`: *FilterQuery*<[*Customer*](graphql.customer.md)\>): *Promise*<[*Customer*](graphql.customer.md)[]\>

Get customers

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*Customer*](graphql.customer.md)\> | Query    |

**Returns:** *Promise*<[*Customer*](graphql.customer.md)[]\>

Defined in: [services/mongo/customer.ts:76](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L76)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:101](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L101)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<WithId<[*Customer*](graphql.customer.md)\>\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*Customer*](graphql.customer.md)\>\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L84)

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

Inherited from: void

Defined in: [services/mongo/@document.ts:117](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L117)

___

### updateCustomer

▸ **updateCustomer**(`customer`: [*Customer*](graphql.customer.md)): *Promise*<void\>

Update customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customer` | [*Customer*](graphql.customer.md) | Customer to update    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/customer.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L48)
