[did-client - v0.11.3](../README.md) / [Pages](../modules/pages.md) / ITimesheetState

# Interface: ITimesheetState

[Pages](../modules/pages.md).ITimesheetState

## Table of contents

### Properties

- [dateRange](pages.itimesheetstate.md#daterange)
- [dateRangeType](pages.itimesheetstate.md#daterangetype)
- [error](pages.itimesheetstate.md#error)
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

Defined in: [client/pages/Timesheet/types.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L37)

___

### dateRangeType

• **dateRangeType**: DateRangeType

The current date range type

Defined in: [client/pages/Timesheet/types.ts:42](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L42)

___

### error

• `Optional` **error**: *any*

Error

Defined in: [client/pages/Timesheet/types.ts:52](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L52)

___

### loading

• `Optional` **loading**: *IProgressProps*

Loading props

Defined in: [client/pages/Timesheet/types.ts:47](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L47)

___

### navHistory

• `Optional` **navHistory**: *string*[]

Navigation history

Defined in: [client/pages/Timesheet/types.ts:62](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L62)

___

### periods

• **periods**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)[]

Periods for the seleted scope

Defined in: [client/pages/Timesheet/types.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L22)

___

### selectedPeriod

• `Optional` **selectedPeriod**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)

The currently selected period

Defined in: [client/pages/Timesheet/types.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L27)

___

### selectedView

• **selectedView**: [*TimesheetView*](../enums/pages.timesheetview.md)

The currently seelcted view

Defined in: [client/pages/Timesheet/types.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L32)

___

### showHotkeysModal

• `Optional` **showHotkeysModal**: *boolean*

Show hotkeys modal

Defined in: [client/pages/Timesheet/types.ts:57](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L57)
