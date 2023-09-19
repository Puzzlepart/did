[did-server - v0.12.0](../README.md) / [GraphQL](../modules/graphql.md) / ApiTokenInput

# Class: ApiTokenInput

[GraphQL](../modules/graphql.md).ApiTokenInput

## Table of contents

### Constructors

- [constructor](graphql.apitokeninput.md#constructor)

### Properties

- [description](graphql.apitokeninput.md#description)
- [expires](graphql.apitokeninput.md#expires)
- [name](graphql.apitokeninput.md#name)
- [permissions](graphql.apitokeninput.md#permissions)

## Constructors

### constructor

\+ **new ApiTokenInput**(): [*ApiTokenInput*](graphql.apitokeninput.md)

**Returns:** [*ApiTokenInput*](graphql.apitokeninput.md)

## Properties

### description

• **description**: *string*

The description of the API token input (optional)

Defined in: [graphql/resolvers/apiToken/types.ts:75](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L75)

___

### expires

• **expires**: Date

The date when the API token expires.

Defined in: [graphql/resolvers/apiToken/types.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L81)

___

### name

• **name**: *string*

The name of the API token.

Defined in: [graphql/resolvers/apiToken/types.ts:69](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L69)

___

### permissions

• **permissions**: *string*[]

An array of permissions associated with the API token.

Defined in: [graphql/resolvers/apiToken/types.ts:87](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/apiToken/types.ts#L87)
