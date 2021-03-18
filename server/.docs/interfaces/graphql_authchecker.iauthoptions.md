[did-server - v0.9.9](../README.md) / [graphql/authChecker](../modules/graphql_authchecker.md) / IAuthOptions

# Interface: IAuthOptions

[graphql/authChecker](../modules/graphql_authchecker.md).IAuthOptions

## Table of contents

### Properties

- [scope](graphql_authchecker.iauthoptions.md#scope)
- [userContext](graphql_authchecker.iauthoptions.md#usercontext)

## Properties

### scope

• `Optional` **scope**: PermissionScope

Permission scope required for the resolver

Defined in: [server/graphql/authChecker.ts:15](https://github.com/Puzzlepart/did/blob/dev/server/graphql/authChecker.ts#L15)

___

### userContext

• `Optional` **userContext**: *boolean*

Requires user context and can cannot be called with an API token

Defined in: [server/graphql/authChecker.ts:10](https://github.com/Puzzlepart/did/blob/dev/server/graphql/authChecker.ts#L10)
