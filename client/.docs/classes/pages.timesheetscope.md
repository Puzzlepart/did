[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / TimesheetScope

# Class: TimesheetScope

[Pages](../modules/pages.md).TimesheetScope

Handles a scope, the period of time between
a startDateTime and endDateTime

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

Defined in: [pages/Timesheet/TimesheetScope.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L14)

## Properties

### endDate

• `Optional` **endDate**: *DateObject*

Defined in: [pages/Timesheet/TimesheetScope.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L14)

___

### startDate

• `Optional` **startDate**: *DateObject*

Defined in: [pages/Timesheet/TimesheetScope.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L13)

## Accessors

### isCurrentWeek

• get **isCurrentWeek**(): *boolean*

Is the scope the current week

**`memberof`** TimesheetScope

**Returns:** *boolean*

Defined in: [pages/Timesheet/TimesheetScope.ts:79](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L79)

___

### timespan

• get **timespan**(): *string*

Get timespan string for the scope

**`memberof`** TimesheetScope

**Returns:** *string*

Defined in: [pages/Timesheet/TimesheetScope.ts:88](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L88)

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

Defined in: [pages/Timesheet/TimesheetScope.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L32)

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

Defined in: [pages/Timesheet/TimesheetScope.ts:70](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L70)

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

Defined in: [pages/Timesheet/TimesheetScope.ts:44](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L44)

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

Defined in: [pages/Timesheet/TimesheetScope.ts:58](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L58)
