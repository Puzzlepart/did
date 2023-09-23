[did-server - v0.13.0](../README.md) / [Services](../modules/services.md) / CustomerService

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

\+ **new CustomerService**(`context`: *Context*, `_labelSvc`: [*LabelService*](services.labelservice.md)): [*CustomerService*](services.customerservice.md)

Constructor for `CustomerService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`   |
`_labelSvc` | [*LabelService*](services.labelservice.md) | Injected `LabelService` through `typedi`    |

**Returns:** [*CustomerService*](services.customerservice.md)

Overrides: void

Defined in: [services/mongo/customer.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L16)

## Properties

### cache

• **cache**: [*CacheService*](services.cacheservice.md)= null

Inherited from: void

Defined in: [services/mongo/@document.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L9)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

Inherited from: void

___

### collection

• **collection**: *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L10)

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

Defined in: [services/mongo/customer.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L35)

___

### deleteCustomer

▸ **deleteCustomer**(`key`: *string*): *Promise*<void\>

Delete customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | Customer key    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/customer.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L66)

___

### find

▸ **find**<S\>(`query`: *any*, `sort?`: S): *Promise*<[*Customer*](graphql.customer.md)[]\>

Wrapper on _.find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*Customer*](graphql.customer.md)[]\>

Inherited from: void

Defined in: [services/mongo/@document.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L68)

___

### getCustomers

▸ **getCustomers**(`query?`: *any*): *Promise*<[*Customer*](graphql.customer.md)[]\>

Get customers from cache or database using the provided `query`.
The result is sorted by the `name` property, then labels are
added to each customer based on the `labels` property.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *any* | Query    |

**Returns:** *Promise*<[*Customer*](graphql.customer.md)[]\>

Defined in: [services/mongo/customer.ts:82](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L82)

___

### insert

▸ **insert**(`document_`: *any*): *any*

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:98](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L98)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *any*

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L81)

___

### update

▸ **update**(`query`: *any*, `document_`: *any*): *any*

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *any* | Query   |
`document_` | *any* | Document    |

**Returns:** *any*

Inherited from: void

Defined in: [services/mongo/@document.ts:114](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L114)

___

### updateCustomer

▸ **updateCustomer**(`customer`: [*Customer*](graphql.customer.md)): *Promise*<void\>

Update customer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`customer` | [*Customer*](graphql.customer.md) | Customer to update    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/customer.ts:52](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/customer.ts#L52)
