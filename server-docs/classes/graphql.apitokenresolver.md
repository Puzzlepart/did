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

Defined in: [server/graphql/resolvers/apiToken/index.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L18)

## Methods

### addApiToken

▸ **addApiToken**(`token`: [*ApiTokenInput*](graphql.apitokeninput.md), `ctx`: [*Context*](graphql_context.context.md)): *Promise*<string\>

Add API token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | [*ApiTokenInput*](graphql.apitokeninput.md) | Token   |
`ctx` | [*Context*](graphql_context.context.md) | GraphQL context    |

**Returns:** *Promise*<string\>

Defined in: [server/graphql/resolvers/apiToken/index.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L47)

___

### apiTokens

▸ **apiTokens**(`ctx`: [*Context*](graphql_context.context.md)): *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Get API tokens

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`ctx` | [*Context*](graphql_context.context.md) | GraphQL context    |

**Returns:** *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Defined in: [server/graphql/resolvers/apiToken/index.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L33)

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

Defined in: [server/graphql/resolvers/apiToken/index.ts:62](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L62)
