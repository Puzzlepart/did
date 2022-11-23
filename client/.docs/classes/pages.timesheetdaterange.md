[did-client - v0.11.2](../README.md) / [Pages](../modules/pages.md) / TimesheetDateRange

# Class: TimesheetDateRange

[Pages](../modules/pages.md).TimesheetDateRange

Handles a date range, the period of time between
a `startDateTime` and `endDateTime`.

**`remarks`** Look into creating a `react` hook
that can ease working with the scope

## Table of contents

### Constructors

- [constructor](pages.timesheetdaterange.md#constructor)

### Properties

- [endDate](pages.timesheetdaterange.md#enddate)
- [startDate](pages.timesheetdaterange.md#startdate)

### Accessors

- [isCurrent](pages.timesheetdaterange.md#iscurrent)
- [timespan](pages.timesheetdaterange.md#timespan)

### Methods

- [\_init](pages.timesheetdaterange.md#_init)
- [getDay](pages.timesheetdaterange.md#getday)
- [query](pages.timesheetdaterange.md#query)
- [set](pages.timesheetdaterange.md#set)

## Constructors

### constructor

\+ **new TimesheetDateRange**(`startDate?`: ConfigType, `_dateRangeType?`: DateRangeType): [*TimesheetDateRange*](pages.timesheetdaterange.md)

Constructs for `TimesheetDateRange`

**`memberof`** TimesheetDateRange

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDate?` | ConfigType | Optional start date   |
`_dateRangeType` | DateRangeType | Optional date range type    |

**Returns:** [*TimesheetDateRange*](pages.timesheetdaterange.md)

Defined in: [client/pages/Timesheet/TimesheetDateRange.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetDateRange.ts#L17)

## Properties

### endDate

• `Optional` **endDate**: *DateObject*

Defined in: [client/pages/Timesheet/TimesheetDateRange.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetDateRange.ts#L17)

___

### startDate

• `Optional` **startDate**: *DateObject*

Defined in: [client/pages/Timesheet/TimesheetDateRange.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetDateRange.ts#L16)

## Accessors

### isCurrent

• get **isCurrent**(): *boolean*

Is the scope the current week or month

**`memberof`** TimesheetDateRange

**Returns:** *boolean*

Defined in: [client/pages/Timesheet/TimesheetDateRange.ts:94](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetDateRange.ts#L94)

___

### timespan

• get **timespan**(): *string*

Get timespan string for the scope

**`memberof`** TimesheetDateRange

**Returns:** *string*

Defined in: [client/pages/Timesheet/TimesheetDateRange.ts:108](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetDateRange.ts#L108)

## Methods

### \_init

▸ `Private`**_init**(`startDate?`: ConfigType): *void*

Initializes the `TimesheetDateRange` from the specified `startDate`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDate?` | ConfigType | Start date    |

**Returns:** *void*

Defined in: [client/pages/Timesheet/TimesheetDateRange.ts:39](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetDateRange.ts#L39)

___

### getDay

▸ **getDay**(`index`: *number*): *DateObject*

Get a day in the scope by index

**`memberof`** TimesheetDateRange

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`index` | *number* | Index    |

**Returns:** *DateObject*

Defined in: [client/pages/Timesheet/TimesheetDateRange.ts:85](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetDateRange.ts#L85)

___

### query

▸ **query**(`template?`: *string*): *TimesheetQuery*

Get TimesheetQuery for the scope

**`memberof`** TimesheetDateRange

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`template` | *string* | 'YYYY-MM-DD' | Template    |

**Returns:** *TimesheetQuery*

Defined in: [client/pages/Timesheet/TimesheetDateRange.ts:57](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetDateRange.ts#L57)

___

### set

▸ **set**(`add`: *string*): [*TimesheetDateRange*](pages.timesheetdaterange.md)

Sets the scope and returns a cloned version of the TimesheetDateRange

**`memberof`** TimesheetDateRange

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`add` | *string* | Add    |

**Returns:** [*TimesheetDateRange*](pages.timesheetdaterange.md)

Defined in: [client/pages/Timesheet/TimesheetDateRange.ts:72](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetDateRange.ts#L72)
