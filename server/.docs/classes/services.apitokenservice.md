[did-server - v0.9.11](../README.md) / [Services](../modules/services.md) / ApiTokenService

# Class: ApiTokenService

[Services](../modules/services.md).ApiTokenService

API token service

## Hierarchy

* *MongoDocumentService*<[*ApiToken*](graphql.apitoken.md)\>

  ↳ **ApiTokenService**

## Table of contents

### Constructors

- [constructor](services.apitokenservice.md#constructor)

### Properties

- [cache](services.apitokenservice.md#cache)
- [cachePrefix](services.apitokenservice.md#cacheprefix)
- [collection](services.apitokenservice.md#collection)
- [collectionName](services.apitokenservice.md#collectionname)
- [context](services.apitokenservice.md#context)

### Methods

- [addToken](services.apitokenservice.md#addtoken)
- [deleteToken](services.apitokenservice.md#deletetoken)
- [find](services.apitokenservice.md#find)
- [getTokens](services.apitokenservice.md#gettokens)
- [insert](services.apitokenservice.md#insert)
- [insertMultiple](services.apitokenservice.md#insertmultiple)
- [update](services.apitokenservice.md#update)

## Constructors

### constructor

\+ **new ApiTokenService**(`context`: *Context*): [*ApiTokenService*](services.apitokenservice.md)

Constructor for `ApiTokenService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`    |

**Returns:** [*ApiTokenService*](services.apitokenservice.md)

Overrides: void

Defined in: [services/mongo/api_token.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/api_token.ts#L18)

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

• **collection**: *Collection*<[*ApiToken*](graphql.apitoken.md)\>

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

### addToken

▸ **addToken**(`token`: [*ApiToken*](graphql.apitoken.md), `subscriptionId`: *string*): *Promise*<string\>

Add API token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | [*ApiToken*](graphql.apitoken.md) | Token to add   |
`subscriptionId` | *string* | Subscription id    |

**Returns:** *Promise*<string\>

Defined in: [services/mongo/api_token.ts:53](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/api_token.ts#L53)

___

### deleteToken

▸ **deleteToken**(`name`: *string*, `subscriptionId`: *string*): *Promise*<void\>

Delete token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Token name   |
`subscriptionId` | *string* | Subscription id    |

**Returns:** *Promise*<void\>

Defined in: [services/mongo/api_token.ts:80](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/api_token.ts#L80)

___

### find

▸ **find**<S\>(`query`: *FilterQuery*<[*ApiToken*](graphql.apitoken.md)\>, `sort?`: S): *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Wrapper on find().toArray()

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Type parameters:

Name | Default |
:------ | :------ |
`S` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*ApiToken*](graphql.apitoken.md)\> | Filter query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Inherited from: void

Defined in: [services/mongo/@document.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L71)

___

### getTokens

▸ **getTokens**(`query?`: *FilterQuery*<[*ApiToken*](graphql.apitoken.md)\>): *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Get tokens

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*ApiToken*](graphql.apitoken.md)\> | Query    |

**Returns:** *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Defined in: [services/mongo/api_token.ts:38](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/api_token.ts#L38)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*ApiToken*](graphql.apitoken.md)\>\>\>

Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*ApiToken*](graphql.apitoken.md)\>\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:101](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L101)

___

### insertMultiple

▸ **insertMultiple**(`documents_`: *any*[]): *Promise*<InsertWriteOpResult<WithId<[*ApiToken*](graphql.apitoken.md)\>\>\>

Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties

**`remarks`** Returns void if documents_ is empty

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`documents_` | *any*[] | Documents    |

**Returns:** *Promise*<InsertWriteOpResult<WithId<[*ApiToken*](graphql.apitoken.md)\>\>\>

Inherited from: void

Defined in: [services/mongo/@document.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L84)

___

### update

▸ **update**(`query`: *FilterQuery*<[*ApiToken*](graphql.apitoken.md)\>, `document_`: *any*): *Promise*<UpdateWriteOpResult\>

Wrapper on updateOne() that also updates `updatedAt` property

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<[*ApiToken*](graphql.apitoken.md)\> | Query   |
`document_` | *any* | Document    |

**Returns:** *Promise*<UpdateWriteOpResult\>

Inherited from: void

Defined in: [services/mongo/@document.ts:117](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L117)
