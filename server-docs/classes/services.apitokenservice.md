[did-server](../README.md) / [services](../modules/services.md) / ApiTokenService

# Class: ApiTokenService

[services](../modules/services.md).ApiTokenService

## Hierarchy

* *MongoDocumentService*<ApiToken\>

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

## Constructors

### constructor

\+ **new ApiTokenService**(`context`: [*Context*](graphql_context.context.md)): [*ApiTokenService*](services.apitokenservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** [*ApiTokenService*](services.apitokenservice.md)

Defined in: [server/services/mongo/apitoken.ts:9](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/apitoken.ts#L9)

## Properties

### cache

• **cache**: [*CacheService*](services_cache.cacheservice.md)= null

Defined in: [server/services/mongo/@document.ts:6](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L6)

___

### cachePrefix

• `Optional` **cachePrefix**: *string*

___

### collection

• **collection**: *Collection*<ApiToken\>

Defined in: [server/services/mongo/@document.ts:7](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L7)

___

### collectionName

• **collectionName**: *string*

___

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### addToken

▸ **addToken**(`token`: *ApiToken*, `subscriptionId`: *string*): *Promise*<string\>

Add API token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | *ApiToken* | Token to add   |
`subscriptionId` | *string* | Subscription id    |

**Returns:** *Promise*<string\>

Defined in: [server/services/mongo/apitoken.ts:34](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/apitoken.ts#L34)

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

Defined in: [server/services/mongo/apitoken.ts:58](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/apitoken.ts#L58)

___

### find

▸ **find**(`query`: *FilterQuery*<ApiToken\>, `sort?`: [*string*, *number*][] \| { [key: string]: V;  } \| { `apiKey?`: *number* \| { `$meta?`: MetaSortOperators  } ; `created?`: *number* \| { `$meta?`: MetaSortOperators  } ; `expires?`: *number* \| { `$meta?`: MetaSortOperators  } ; `name?`: *number* \| { `$meta?`: MetaSortOperators  } ; `permissions?`: *number* \| { `$meta?`: MetaSortOperators  } ; `subscriptionId?`: *number* \| { `$meta?`: MetaSortOperators  }  }): *Promise*<ApiToken[]\>

Wrapper on find().toArray()

**`see`** — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *FilterQuery*<ApiToken\> | Query   |
`sort?` | [*string*, *number*][] \| { [key: string]: V;  } \| { `apiKey?`: *number* \| { `$meta?`: MetaSortOperators  } ; `created?`: *number* \| { `$meta?`: MetaSortOperators  } ; `expires?`: *number* \| { `$meta?`: MetaSortOperators  } ; `name?`: *number* \| { `$meta?`: MetaSortOperators  } ; `permissions?`: *number* \| { `$meta?`: MetaSortOperators  } ; `subscriptionId?`: *number* \| { `$meta?`: MetaSortOperators  }  } | Sort options    |

**Returns:** *Promise*<ApiToken[]\>

Defined in: [server/services/mongo/@document.ts:37](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/@document.ts#L37)

___

### getTokens

▸ **getTokens**(`query?`: *FilterQuery*<ApiToken\>): *Promise*<ApiToken[]\>

Get tokens

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | *FilterQuery*<ApiToken\> | Query    |

**Returns:** *Promise*<ApiToken[]\>

Defined in: [server/services/mongo/apitoken.ts:19](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/services/mongo/apitoken.ts#L19)
