[did-server - v0.12.0](../README.md) / [GraphQL](../modules/graphql.md) / ApiToken

# Class: ApiToken

[GraphQL](../modules/graphql.md).ApiToken

A type that describes an API token.

## Table of contents

### Constructors

- [constructor](graphql.apitoken.md#constructor)

### Properties

- [apiKey](graphql.apitoken.md#apikey)
- [created](graphql.apitoken.md#created)
- [description](graphql.apitoken.md#description)
- [expires](graphql.apitoken.md#expires)
- [name](graphql.apitoken.md#name)
- [permissions](graphql.apitoken.md#permissions)
- [subscriptionId](graphql.apitoken.md#subscriptionid)

## Constructors

### constructor

\+ **new ApiToken**(): [*ApiToken*](graphql.apitoken.md)

**Returns:** [*ApiToken*](graphql.apitoken.md)

## Properties

### apiKey

• `Optional` **apiKey**: *string*

The secret API key associated with the API token.

Defined in: [graphql/resolvers/apiToken/types.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L50)

___

### created

• `Optional` **created**: Date

The date when the API token was created.

Defined in: [graphql/resolvers/apiToken/types.ts:32](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L32)

___

### description

• **description**: *string*

The description of the API token.

Defined in: [graphql/resolvers/apiToken/types.ts:26](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L26)

___

### expires

• **expires**: Date

The date when the API token expires.

Defined in: [graphql/resolvers/apiToken/types.ts:38](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L38)

___

### name

• **name**: *string*

The name of the API token.

Defined in: [graphql/resolvers/apiToken/types.ts:20](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L20)

___

### permissions

• **permissions**: *string*[]

An array of permissions associated with the API token.

Defined in: [graphql/resolvers/apiToken/types.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L44)

___

### subscriptionId

• `Optional` **subscriptionId**: *string*

The subscription ID associated with the API token.

Defined in: [graphql/resolvers/apiToken/types.ts:55](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L55)
