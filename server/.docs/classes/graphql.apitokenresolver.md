[did-server - v0.10.3](../README.md) / [GraphQL](../modules/graphql.md) / ApiTokenResolver

# Class: ApiTokenResolver

[GraphQL](../modules/graphql.md).ApiTokenResolver

Resolver for `ApiToken`.

`ApiTokenService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

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

Defined in: [graphql/resolvers/apiToken/index.ts:25](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L25)

## Methods

### addApiToken

▸ **addApiToken**(`token`: [*ApiTokenInput*](graphql.apitokeninput.md), `context`: *Context*): *Promise*<string\>

Add API token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | [*ApiTokenInput*](graphql.apitokeninput.md) | Token   |
`context` | *Context* | - |

**Returns:** *Promise*<string\>

Defined in: [graphql/resolvers/apiToken/index.ts:54](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L54)

___

### apiTokens

▸ **apiTokens**(`context`: *Context*): *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Get API tokens

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *Context* |

**Returns:** *Promise*<[*ApiToken*](graphql.apitoken.md)[]\>

Defined in: [graphql/resolvers/apiToken/index.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L40)

___

### deleteApiToken

▸ **deleteApiToken**(`name`: *string*, `context`: *Context*): *Promise*<BaseResult\>

Delete API token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name   |
`context` | *Context* | - |

**Returns:** *Promise*<BaseResult\>

Defined in: [graphql/resolvers/apiToken/index.ts:69](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/index.ts#L69)
