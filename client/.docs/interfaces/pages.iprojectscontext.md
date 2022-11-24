[did-client - v0.11.2](../README.md) / [Pages](../modules/pages.md) / IProjectsContext

# Interface: IProjectsContext

[Pages](../modules/pages.md).IProjectsContext

## Table of contents

### Properties

- [dispatch](pages.iprojectscontext.md#dispatch)
- [loading](pages.iprojectscontext.md#loading)
- [state](pages.iprojectscontext.md#state)

### Methods

- [refetch](pages.iprojectscontext.md#refetch)

## Properties

### dispatch

• **dispatch**: *Dispatch*<AnyAction\>

Defined in: [client/pages/Projects/context.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L11)

___

### loading

• **loading**: *boolean*

Defined in: [client/pages/Projects/context.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L13)

___

### state

• **state**: [*IProjectsState*](pages.iprojectsstate.md)

Defined in: [client/pages/Projects/context.tsx:10](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L10)

## Methods

### refetch

▸ **refetch**(`variables?`: *any*): *Promise*<ApolloQueryResult<any\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`variables?` | *any* |

**Returns:** *Promise*<ApolloQueryResult<any\>\>

Defined in: [client/pages/Projects/context.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/context.tsx#L12)
