[did-server](../README.md) / [graphql/authChecker](../modules/graphql_authchecker.md) / IAuthOptions

# Interface: IAuthOptions

[graphql/authChecker](../modules/graphql_authchecker.md).IAuthOptions

## Table of contents

### Properties

- [permission](graphql_authchecker.iauthoptions.md#permission)
- [userContext](graphql_authchecker.iauthoptions.md#usercontext)

## Properties

### permission

• `Optional` **permission**: *string*

Permission required for the resolver

Defined in: [server/graphql/authChecker.ts:14](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/graphql/authChecker.ts#L14)

___

### userContext

• `Optional` **userContext**: *boolean*

Requires user context and can cannot be called with an API token

Defined in: [server/graphql/authChecker.ts:9](https://github.com/Puzzlepart/did/blob/2ac6d98a/server/graphql/authChecker.ts#L9)
