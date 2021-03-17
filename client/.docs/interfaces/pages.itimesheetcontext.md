[did-client - v0.9.9](../README.md) / [Pages](../modules/pages.md) / ITimesheetContext

# Interface: ITimesheetContext

[Pages](../modules/pages.md).ITimesheetContext

## Hierarchy

* [*ITimesheetState*](pages.itimesheetstate.md)

* *ReturnType*<*typeof* [*useSubmitActions*](../modules/pages.md#usesubmitactions)\>

  ↳ **ITimesheetContext**

## Table of contents

### Properties

- [dispatch](pages.itimesheetcontext.md#dispatch)
- [error](pages.itimesheetcontext.md#error)
- [loading](pages.itimesheetcontext.md#loading)
- [onSubmitPeriod](pages.itimesheetcontext.md#onsubmitperiod)
- [onUnsubmitPeriod](pages.itimesheetcontext.md#onunsubmitperiod)
- [periods](pages.itimesheetcontext.md#periods)
- [refetch](pages.itimesheetcontext.md#refetch)
- [scope](pages.itimesheetcontext.md#scope)
- [selectedPeriod](pages.itimesheetcontext.md#selectedperiod)
- [selectedView](pages.itimesheetcontext.md#selectedview)
- [showHotkeysModal](pages.itimesheetcontext.md#showhotkeysmodal)
- [t](pages.itimesheetcontext.md#t)

## Properties

### dispatch

• `Optional` **dispatch**: *Dispatch*<AnyAction\>

Dispatch an action

Defined in: [client/pages/Timesheet/context.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L18)

___

### error

• `Optional` **error**: *any*

Inherited from: [ITimesheetState](pages.itimesheetstate.md).[error](pages.itimesheetstate.md#error)

Defined in: [client/pages/Timesheet/types.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L20)

___

### loading

• `Optional` **loading**: *IProgressProps*

Inherited from: [ITimesheetState](pages.itimesheetstate.md).[loading](pages.itimesheetstate.md#loading)

Defined in: [client/pages/Timesheet/types.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L19)

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

Defined in: [client/pages/Timesheet/hooks/useSubmitActions.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L22)

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

Defined in: [client/pages/Timesheet/hooks/useSubmitActions.tsx:33](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/hooks/useSubmitActions.tsx#L33)

___

### periods

• **periods**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)[]

Inherited from: [ITimesheetState](pages.itimesheetstate.md).[periods](pages.itimesheetstate.md#periods)

Defined in: [client/pages/Timesheet/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L15)

___

### refetch

• `Optional` **refetch**: () => *Promise*<ApolloQueryResult<any\>\>

Refetch data

#### Type declaration:

▸ (): *Promise*<ApolloQueryResult<any\>\>

**Returns:** *Promise*<ApolloQueryResult<any\>\>

Defined in: [client/pages/Timesheet/context.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L23)

Defined in: [client/pages/Timesheet/context.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L23)

___

### scope

• **scope**: [*TimesheetScope*](../classes/pages.timesheetscope.md)

Inherited from: [ITimesheetState](pages.itimesheetstate.md).[scope](pages.itimesheetstate.md#scope)

Defined in: [client/pages/Timesheet/types.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L18)

___

### selectedPeriod

• `Optional` **selectedPeriod**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)

Inherited from: [ITimesheetState](pages.itimesheetstate.md).[selectedPeriod](pages.itimesheetstate.md#selectedperiod)

Defined in: [client/pages/Timesheet/types.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L16)

___

### selectedView

• **selectedView**: [*TimesheetView*](../modules/pages.md#timesheetview)

Inherited from: [ITimesheetState](pages.itimesheetstate.md).[selectedView](pages.itimesheetstate.md#selectedview)

Defined in: [client/pages/Timesheet/types.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L17)

___

### showHotkeysModal

• `Optional` **showHotkeysModal**: *boolean*

Inherited from: [ITimesheetState](pages.itimesheetstate.md).[showHotkeysModal](pages.itimesheetstate.md#showhotkeysmodal)

Defined in: [client/pages/Timesheet/types.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L21)

___

### t

• **t**: TFunction

Translate function

Defined in: [client/pages/Timesheet/context.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/context.ts#L28)
