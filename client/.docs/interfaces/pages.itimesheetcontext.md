[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / ITimesheetContext

# Interface: ITimesheetContext

[Pages](../modules/pages.md).ITimesheetContext

## Hierarchy

* [*UseSubmitActionsHook*](../modules/pages.md#usesubmitactionshook)

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

Defined in: [pages/Timesheet/context.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L20)

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

Defined in: [pages/Timesheet/hooks/useSubmitActions.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L23)

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

Defined in: [pages/Timesheet/hooks/useSubmitActions.tsx:34](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L34)

Inherited from: void

___

### refetch

• `Optional` **refetch**: () => *Promise*<ApolloQueryResult<any\>\>

Refetch data

#### Type declaration:

▸ (): *Promise*<ApolloQueryResult<any\>\>

**Returns:** *Promise*<ApolloQueryResult<any\>\>

Defined in: [pages/Timesheet/context.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L25)

Defined in: [pages/Timesheet/context.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L25)

___

### state

• **state**: [*ITimesheetState*](pages.itimesheetstate.md)

State

Defined in: [pages/Timesheet/context.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L15)
