[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / TimesheetScope

# Class: TimesheetScope

[Pages](../modules/pages.md).TimesheetScope

Handles a scope, the period of time between a startDateTime and endDateTime

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

Constructs a new TimesheetScope

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDate?` | ConfigType | Optional start date    |

**Returns:** [*TimesheetScope*](pages.timesheetscope.md)

Defined in: [client/pages/Timesheet/TimesheetScope.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L13)

## Properties

### endDate

• `Optional` **endDate**: *DateObject*

Defined in: [client/pages/Timesheet/TimesheetScope.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L13)

___

### startDate

• `Optional` **startDate**: *DateObject*

Defined in: [client/pages/Timesheet/TimesheetScope.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L12)

## Accessors

### isCurrentWeek

• get **isCurrentWeek**(): *boolean*

Is the scope the current week

**Returns:** *boolean*

Defined in: [client/pages/Timesheet/TimesheetScope.ts:72](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L72)

___

### timespan

• get **timespan**(): *string*

Get timespan string for the scope

**Returns:** *string*

Defined in: [client/pages/Timesheet/TimesheetScope.ts:79](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L79)

## Methods

### fromParams

▸ **fromParams**(`parameters`: [*ITimesheetParameters*](../interfaces/pages.itimesheetparameters.md)): [*TimesheetScope*](pages.timesheetscope.md)

Sets `startDate` and `endDate` from `params`

#### Parameters:

Name | Type |
:------ | :------ |
`parameters` | [*ITimesheetParameters*](../interfaces/pages.itimesheetparameters.md) |

**Returns:** [*TimesheetScope*](pages.timesheetscope.md)

Defined in: [client/pages/Timesheet/TimesheetScope.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L30)

___

### getDay

▸ **getDay**(`index`: *number*): *DateObject*

Get a day in the scope by index

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`index` | *number* | Index    |

**Returns:** *DateObject*

Defined in: [client/pages/Timesheet/TimesheetScope.ts:65](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L65)

___

### query

▸ **query**(`template?`: *string*): *TimesheetQuery*

Get TimesheetQuery for the scope

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`template` | *string* | 'YYYY-MM-DD' | Template    |

**Returns:** *TimesheetQuery*

Defined in: [client/pages/Timesheet/TimesheetScope.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L41)

___

### set

▸ **set**(`add`: *string*): [*TimesheetScope*](pages.timesheetscope.md)

Sets the scope and returns a cloned version of the TimesheetScope

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`add` | *string* | Add    |

**Returns:** [*TimesheetScope*](pages.timesheetscope.md)

Defined in: [client/pages/Timesheet/TimesheetScope.ts:54](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetScope.ts#L54)
