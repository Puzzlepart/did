[did-server - v0.10.0](../README.md) / [graphql](../modules/graphql.md) / ApiTokenResolver

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

\+ **new ApiTokenResolver**(`_apiToken`: [*ApiTokenService*](services.apitokenservice.md)): [*ApiTokenResolver*](graphql.apitokenresolver.md)

Constructor for ApiTokenResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_apiToken` | [*ApiTokenService*](services.apitokenservice.md) | API token service    |

**Returns:** [*ApiTokenResolver*](graphql.apitokenresolver.md)

Defined in: [server/graphql/resolvers/apiToken/index.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L18)

## Methods

### addApiToken

▸ **addApiToken**(`token`: [*ApiTokenInput*](graphql.apitokeninput.md), `context`: [*Context*](graphql_context.context.md)): *Promise*<string\>

Add API token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | [*ApiTokenInput*](graphql.apitokeninput.md) | Token   |
`context` | [*Context*](graphql_context.context.md) | - |

**Returns:** *Promise*<string\>

Defined in: [server/graphql/resolvers/apiToken/index.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L47)

___

### apiTokens

▸ **apiTokens**(`context`: [*Context*](graphql_context.context.md)): *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Get API tokens

#### Parameters:

Name | Type |
:------ | :------ |
`context` | [*Context*](graphql_context.context.md) |

**Returns:** *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Defined in: [server/graphql/resolvers/apiToken/index.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L33)

___

### deleteApiToken

▸ **deleteApiToken**(`name`: *string*, `context`: [*Context*](graphql_context.context.md)): *Promise*<BaseResult\>

Delete API token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name   |
`context` | [*Context*](graphql_context.context.md) | - |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/apiToken/index.ts:62](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L62)
