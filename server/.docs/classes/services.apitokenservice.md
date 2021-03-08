[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / ApiTokenService

# Class: ApiTokenService

[services](../modules/services.md).ApiTokenService

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
- [update](services.apitokenservice.md#update)

## Constructors

### constructor

\+ **new ApiTokenService**(`context`: [*Context*](graphql_context.context.md)): [*ApiTokenService*](services.apitokenservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** [*ApiTokenService*](services.apitokenservice.md)

Defined in: [server/services/mongo/apitoken.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/apitoken.ts#L11)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:8](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L8)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<[*ApiToken*](graphql.apitoken.md)\>

Defined in: [server/services/mongo/@document.ts:9](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L9)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

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

Defined in: [server/services/mongo/apitoken.ts:36](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/apitoken.ts#L36)

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

Defined in: [server/services/mongo/apitoken.ts:63](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/apitoken.ts#L63)

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
`query` | *FilterQuery*<[*ApiToken*](graphql.apitoken.md)\> | Query   |
`sort?` | S | Sort options    |

**Returns:** *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Defined in: [server/services/mongo/@document.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L39)

___

### getTokens

▸ **getTokens**(`query?`: *FilterQuery*<[*ApiToken*](graphql.apitoken.md)\>): *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Get tokens

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<[*ApiToken*](graphql.apitoken.md)\> | Query    |

**Returns:** *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Defined in: [server/services/mongo/apitoken.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/apitoken.ts#L21)

___

### insert

▸ **insert**(`document_`: *any*): *Promise*<InsertOneWriteOpResult<WithId<[*ApiToken*](graphql.apitoken.md)\>\>\>

Wrapper on insertOne() that also updates `updatedAt` and `createdAt` properties

**`see`** — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document_` | *any* | Document    |

**Returns:** *Promise*<InsertOneWriteOpResult<WithId<[*ApiToken*](graphql.apitoken.md)\>\>\>

Defined in: [server/services/mongo/@document.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L50)

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

Defined in: [server/services/mongo/@document.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/services/mongo/@document.ts#L66)
