[did-server](../README.md) / [graphql](../modules/graphql.md) / ApiTokenResolver

# Class: ApiTokenResolver

[graphql](../modules/graphql.md).ApiTokenResolver

## Table of contents

### Constructors

- [constructor](graphql.apitokenresolver.md#constructor)

### Methods

- [addApiToken](graphql.apitokenresolver.md#addapitoken)
- [apiTokens](graphql.apitokenresolver.md#apitokens)
- [deleteApiToken](graphql.apitokenresolver.md#deleteapitoken)

## Constructors

### constructor

\+ **new ApiTokenResolver**(`_mongo`: [*MongoService*](services.mongoservice.md)): [*ApiTokenResolver*](graphql.apitokenresolver.md)

Constructor for ApiTokenResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_mongo` | [*MongoService*](services.mongoservice.md) | Mongo service    |

**Returns:** [*ApiTokenResolver*](graphql.apitokenresolver.md)

Defined in: [server/graphql/resolvers/apiToken/index.ts:14](https://github.com/Puzzlepart/did/blob/4b4bc3ec/server/graphql/resolvers/apiToken/index.ts#L14)

## Methods

### addApiToken

▸ **addApiToken**(`token`: *ApiTokenInput*, `ctx`: [*Context*](graphql_context.context.md)): *Promise*<string\>

Add API token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | *ApiTokenInput* | Token   |
`ctx` | [*Context*](graphql_context.context.md) | GraphQL context    |

**Returns:** *Promise*<string\>

Defined in: [server/graphql/resolvers/apiToken/index.ts:43](https://github.com/Puzzlepart/did/blob/4b4bc3ec/server/graphql/resolvers/apiToken/index.ts#L43)

___

### apiTokens

▸ **apiTokens**(`ctx`: [*Context*](graphql_context.context.md)): *Promise*<ApiToken[]\>

Get API tokens

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`ctx` | [*Context*](graphql_context.context.md) | GraphQL context    |

**Returns:** *Promise*<ApiToken[]\>

Defined in: [server/graphql/resolvers/apiToken/index.ts:29](https://github.com/Puzzlepart/did/blob/4b4bc3ec/server/graphql/resolvers/apiToken/index.ts#L29)

___

### deleteApiToken

▸ **deleteApiToken**(`name`: *string*, `ctx`: [*Context*](graphql_context.context.md)): *Promise*<BaseResult\>

Delete API token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name   |
`ctx` | [*Context*](graphql_context.context.md) | GraphQL context    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/apiToken/index.ts:58](https://github.com/Puzzlepart/did/blob/4b4bc3ec/server/graphql/resolvers/apiToken/index.ts#L58)
