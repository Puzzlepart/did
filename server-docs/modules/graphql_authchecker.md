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

#### Parameters:

Name | Type |
:------ | :------ |
`resolverData` | *ResolverData*<[*Context*](../classes/graphql_context.context.md)\> |
`roles` | [*IAuthOptions*](../interfaces/graphql_authchecker.iauthoptions.md)[] |

**Returns:** *boolean* \| *Promise*<boolean\>

Defined in: [server/graphql/authChecker.ts:17](https://github.com/Puzzlepart/did/blob/ea0aea7b/server/graphql/authChecker.ts#L17)
