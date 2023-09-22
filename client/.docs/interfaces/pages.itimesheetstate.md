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

Defined in: [client/pages/Timesheet/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L30)

___

### dateRangeType

• **dateRangeType**: DateRangeType

The current date range type

Defined in: [client/pages/Timesheet/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L35)

___

### error

• `Optional` **error**: *any*

Error object

Defined in: [client/pages/Timesheet/types.ts:45](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L45)

___

### eventToMatch

• `Optional` **eventToMatch**: *EventObject*

Event to match in the `<MatchEventPanel />`

Defined in: [client/pages/Timesheet/types.ts:60](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L60)

___

### loading

• `Optional` **loading**: [*IUserMessageProps*](components.iusermessageprops.md)

Loading props for the `<UserMessage />` component

Defined in: [client/pages/Timesheet/types.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L40)

___

### navHistory

• `Optional` **navHistory**: *string*[]

Navigation history

Defined in: [client/pages/Timesheet/types.ts:55](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L55)

___

### periods

• **periods**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)[]

Periods for the seleted scope

Defined in: [client/pages/Timesheet/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L15)

___

### selectedPeriod

• `Optional` **selectedPeriod**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)

The currently selected period

Defined in: [client/pages/Timesheet/types.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L20)

___

### selectedView

• **selectedView**: *TimesheetViewComponent*

The currently selected view

Defined in: [client/pages/Timesheet/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L25)

___

### showHotkeysModal

• `Optional` **showHotkeysModal**: *boolean*

Show hotkeys modal

Defined in: [client/pages/Timesheet/types.ts:50](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L50)
