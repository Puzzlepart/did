[did-client - v0.12.0](../README.md) / [Pages](../modules/pages.md) / ITimesheetState

# Interface: ITimesheetState

[Pages](../modules/pages.md).ITimesheetState

## Table of contents

### Properties

- [dateRange](pages.itimesheetstate.md#daterange)
- [dateRangeType](pages.itimesheetstate.md#daterangetype)
- [error](pages.itimesheetstate.md#error)
- [eventToMatch](pages.itimesheetstate.md#eventtomatch)
- [loading](pages.itimesheetstate.md#loading)
- [navHistory](pages.itimesheetstate.md#navhistory)
- [periods](pages.itimesheetstate.md#periods)
- [selectedPeriod](pages.itimesheetstate.md#selectedperiod)
- [selectedView](pages.itimesheetstate.md#selectedview)
- [showHotkeysModal](pages.itimesheetstate.md#showhotkeysmodal)

## Properties

### dateRange

• **dateRange**: [*TimesheetDateRange*](../classes/pages.timesheetdaterange.md)

The current date range

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L31)

___

### dateRangeType

• **dateRangeType**: DateRangeType

The current date range type

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L36)

___

### error

• `Optional` **error**: *any*

Error object

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L46)

___

### eventToMatch

• `Optional` **eventToMatch**: *EventObject*

Event to match in the `<MatchEventPanel />`

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:61](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L61)

___

### loading

• `Optional` **loading**: [*IUserMessageProps*](components.iusermessageprops.md)

Loading props for the `<UserMessage />` component

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L41)

___

### navHistory

• `Optional` **navHistory**: *string*[]

Navigation history

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:56](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L56)

___

### periods

• **periods**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)[]

Periods for the seleted scope

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L16)

___

### selectedPeriod

• `Optional` **selectedPeriod**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)

The currently selected period

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L21)

___

### selectedView

• **selectedView**: *TimesheetViewComponent*

The currently selected view

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L26)

___

### showHotkeysModal

• `Optional` **showHotkeysModal**: *boolean*

Show hotkeys modal

Defined in: [client/pages/Timesheet/types/ITimesheetState.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types/ITimesheetState.ts#L51)
