[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / TimesheetScope

# Class: TimesheetScope

[Pages](../modules/pages.md).TimesheetScope

Handles a scope, the period of time between
a `startDateTime` and `endDateTime`

**`remarks`** Look into creating a `react` hook
that can ease working with the scope

## Table of contents

### Constructors

- [constructor](pages.timesheetscope.md#constructor)

### Properties

- [endDate](pages.timesheetscope.md#enddate)
- [startDate](pages.timesheetscope.md#startdate)

### Accessors

- [isCurrentWeek](pages.timesheetscope.md#iscurrentweek)
- [timespan](pages.timesheetscope.md#timespan)

### Methods

- [fromParams](pages.timesheetscope.md#fromparams)
- [getDay](pages.timesheetscope.md#getday)
- [query](pages.timesheetscope.md#query)
- [set](pages.timesheetscope.md#set)

## Constructors

### constructor

\+ **new TimesheetScope**(`startDate?`: ConfigType): [*TimesheetScope*](pages.timesheetscope.md)

Constructs for `TimesheetScope`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDate?` | ConfigType | Optional start date    |

**Returns:** [*TimesheetScope*](pages.timesheetscope.md)

Defined in: [pages/Timesheet/TimesheetScope.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L17)

## Properties

### endDate

• `Optional` **endDate**: *DateObject*

Defined in: [pages/Timesheet/TimesheetScope.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L17)

___

### startDate

• `Optional` **startDate**: *DateObject*

Defined in: [pages/Timesheet/TimesheetScope.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L16)

## Accessors

### isCurrentWeek

• get **isCurrentWeek**(): *boolean*

Is the scope the current week

**`memberof`** TimesheetScope

**Returns:** *boolean*

Defined in: [pages/Timesheet/TimesheetScope.ts:82](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L82)

___

### timespan

• get **timespan**(): *string*

Get timespan string for the scope

**`memberof`** TimesheetScope

**Returns:** *string*

Defined in: [pages/Timesheet/TimesheetScope.ts:91](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L91)

## Methods

### fromParams

▸ **fromParams**(`parameters`: [*ITimesheetParameters*](../interfaces/pages.itimesheetparameters.md)): [*TimesheetScope*](pages.timesheetscope.md)

Sets `startDate` and `endDate` from `params`

**`memberof`** TimesheetScope

#### Parameters:

Name | Type |
:------ | :------ |
`parameters` | [*ITimesheetParameters*](../interfaces/pages.itimesheetparameters.md) |

**Returns:** [*TimesheetScope*](pages.timesheetscope.md)

Defined in: [pages/Timesheet/TimesheetScope.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L35)

___

### getDay

▸ **getDay**(`index`: *number*): *DateObject*

Get a day in the scope by index

**`memberof`** TimesheetScope

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`index` | *number* | Index   |

**Returns:** *DateObject*

Defined in: [pages/Timesheet/TimesheetScope.ts:73](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L73)

___

### query

▸ **query**(`template?`: *string*): *TimesheetQuery*

Get TimesheetQuery for the scope

**`memberof`** TimesheetScope

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`template` | *string* | 'YYYY-MM-DD' | Template   |

**Returns:** *TimesheetQuery*

Defined in: [pages/Timesheet/TimesheetScope.ts:47](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L47)

___

### set

▸ **set**(`add`: *string*): [*TimesheetScope*](pages.timesheetscope.md)

Sets the scope and returns a cloned version of the TimesheetScope

**`memberof`** TimesheetScope

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`add` | *string* | Add   |

**Returns:** [*TimesheetScope*](pages.timesheetscope.md)

Defined in: [pages/Timesheet/TimesheetScope.ts:61](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L61)
