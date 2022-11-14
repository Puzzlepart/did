[did-client - v0.11.0](../README.md) / [Pages](../modules/pages.md) / ITimesheetContext

# Interface: ITimesheetContext

[Pages](../modules/pages.md).ITimesheetContext

## Hierarchy

* *ReturnType*<*typeof* [*useSubmitActions*](../modules/pages.md#usesubmitactions)\>

  ↳ **ITimesheetContext**

## Table of contents

### Properties

- [dispatch](pages.itimesheetcontext.md#dispatch)
- [onSubmitPeriod](pages.itimesheetcontext.md#onsubmitperiod)
- [onUnsubmitPeriod](pages.itimesheetcontext.md#onunsubmitperiod)
- [refetch](pages.itimesheetcontext.md#refetch)
- [state](pages.itimesheetcontext.md#state)

## Properties

### dispatch

• `Optional` **dispatch**: *Dispatch*<AnyAction\>

Dispatch an action

Defined in: [client/pages/Timesheet/context.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L19)

___

### onSubmitPeriod

• **onSubmitPeriod**: (`forecast`: *boolean*) => *Promise*<void\>

#### Type declaration:

▸ (`forecast`: *boolean*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`forecast` | *boolean* |

**Returns:** *Promise*<void\>

Defined in: [client/pages/Timesheet/hooks/useSubmitActions.tsx:38](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L38)

Inherited from: void

___

### onUnsubmitPeriod

• **onUnsubmitPeriod**: (`forecast`: *boolean*) => *Promise*<void\>

#### Type declaration:

▸ (`forecast`: *boolean*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`forecast` | *boolean* |

**Returns:** *Promise*<void\>

Defined in: [client/pages/Timesheet/hooks/useSubmitActions.tsx:52](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L52)

Inherited from: void

___

### refetch

• `Optional` **refetch**: () => *Promise*<ApolloQueryResult<any\>\>

Refetch data

#### Type declaration:

▸ (): *Promise*<ApolloQueryResult<any\>\>

**Returns:** *Promise*<ApolloQueryResult<any\>\>

Defined in: [client/pages/Timesheet/context.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L24)

Defined in: [client/pages/Timesheet/context.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L24)

___

### state

• **state**: [*ITimesheetState*](pages.itimesheetstate.md)

State

Defined in: [client/pages/Timesheet/context.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L14)
