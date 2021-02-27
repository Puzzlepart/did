[did-server](../README.md) / graphql/authChecker

# Module: graphql/authChecker

## Table of contents

### Interfaces

- [IAuthOptions](../interfaces/graphql_authchecker.iauthoptions.md)

### Functions

- [authChecker](graphql_authchecker.md#authchecker)

## Functions

### authChecker

▸ `Const`**authChecker**(`resolverData`: *ResolverData*<[*Context*](../classes/graphql_context.context.md)\>, `roles`: [*IAuthOptions*](../interfaces/graphql_authchecker.iauthoptions.md)[]): *boolean* \| *Promise*<boolean\>

Checks auth for the context.

#### Parameters:

Name | Type |
:------ | :------ |
`resolverData` | *ResolverData*<[*Context*](../classes/graphql_context.context.md)\> |
`roles` | [*IAuthOptions*](../interfaces/graphql_authchecker.iauthoptions.md)[] |

**Returns:** *boolean* \| *Promise*<boolean\>

Defined in: [server/graphql/authChecker.ts:23](https://github.com/Puzzlepart/did/blob/3f22c56c/server/graphql/authChecker.ts#L23)
