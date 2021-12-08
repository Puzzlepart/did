[did-client - v0.10.6](../README.md) / [Pages](../modules/pages.md) / ITimesheetState

# Interface: ITimesheetState

[Pages](../modules/pages.md).ITimesheetState

## Table of contents

### Properties

- [error](pages.itimesheetstate.md#error)
- [loading](pages.itimesheetstate.md#loading)
- [navHistory](pages.itimesheetstate.md#navhistory)
- [periods](pages.itimesheetstate.md#periods)
- [scope](pages.itimesheetstate.md#scope)
- [selectedPeriod](pages.itimesheetstate.md#selectedperiod)
- [selectedView](pages.itimesheetstate.md#selectedview)
- [showHotkeysModal](pages.itimesheetstate.md#showhotkeysmodal)

## Properties

### error

• `Optional` **error**: *any*

Error

Defined in: [client/pages/Timesheet/types.ts:43](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L43)

___

### loading

• `Optional` **loading**: *IProgressProps*

Loading props

Defined in: [client/pages/Timesheet/types.ts:38](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L38)

___

### navHistory

• `Optional` **navHistory**: *string*[]

Navigation history

Defined in: [client/pages/Timesheet/types.ts:53](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L53)

___

### periods

• **periods**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)[]

Periods for the seleted scope

Defined in: [client/pages/Timesheet/types.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L18)

___

### scope

• **scope**: [*TimesheetScope*](../classes/pages.timesheetscope.md)

The current scope

Defined in: [client/pages/Timesheet/types.ts:33](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L33)

___

### selectedPeriod

• `Optional` **selectedPeriod**: [*TimesheetPeriod*](../classes/pages.timesheetperiod.md)

The currently selected period

Defined in: [client/pages/Timesheet/types.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L23)

___

### selectedView

• **selectedView**: [*TimesheetView*](../modules/pages.md#timesheetview)

The currently seelcted view

Defined in: [client/pages/Timesheet/types.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L28)

___

### showHotkeysModal

• `Optional` **showHotkeysModal**: *boolean*

Show hotkeys modal

Defined in: [client/pages/Timesheet/types.ts:48](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/types.ts#L48)
