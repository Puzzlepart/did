[did-shared - v0.9.10](../README.md) / [DateUtils](../modules/dateutils.md) / DateUtils

# Class: DateUtils

[DateUtils](../modules/dateutils.md).DateUtils

## Table of contents

### Constructors

- [constructor](dateutils.dateutils-1.md#constructor)

### Methods

- [endOfMonth](dateutils.dateutils-1.md#endofmonth)
- [endOfWeek](dateutils.dateutils-1.md#endofweek)
- [formatDate](dateutils.dateutils-1.md#formatdate)
- [getDays](dateutils.dateutils-1.md#getdays)
- [getDurationHours](dateutils.dateutils-1.md#getdurationhours)
- [getDurationString](dateutils.dateutils-1.md#getdurationstring)
- [getIsoWeek](dateutils.dateutils-1.md#getisoweek)
- [getMonthIndex](dateutils.dateutils-1.md#getmonthindex)
- [getMonthName](dateutils.dateutils-1.md#getmonthname)
- [getMonthNames](dateutils.dateutils-1.md#getmonthnames)
- [getPeriod](dateutils.dateutils-1.md#getperiod)
- [getTimespanString](dateutils.dateutils-1.md#gettimespanstring)
- [getTimezone](dateutils.dateutils-1.md#gettimezone)
- [getWeek](dateutils.dateutils-1.md#getweek)
- [getYear](dateutils.dateutils-1.md#getyear)
- [isAfterToday](dateutils.dateutils-1.md#isaftertoday)
- [isBefore](dateutils.dateutils-1.md#isbefore)
- [isCurrentWeek](dateutils.dateutils-1.md#iscurrentweek)
- [isCurrentYear](dateutils.dateutils-1.md#iscurrentyear)
- [isSameMonth](dateutils.dateutils-1.md#issamemonth)
- [parseDateWithTimezone](dateutils.dateutils-1.md#parsedatewithtimezone)
- [setup](dateutils.dateutils-1.md#setup)
- [startOfMonth](dateutils.dateutils-1.md#startofmonth)
- [startOfWeek](dateutils.dateutils-1.md#startofweek)
- [toISOString](dateutils.dateutils-1.md#toisostring)

## Constructors

### constructor

\+ **new DateUtils**(`$`: [*IDateUtils*](../interfaces/dateutils.idateutils.md)): [*DateUtils*](dateutils.dateutils-1.md)

#### Parameters:

Name | Type |
:------ | :------ |
`$` | [*IDateUtils*](../interfaces/dateutils.idateutils.md) |

**Returns:** [*DateUtils*](dateutils.dateutils-1.md)

Defined in: [shared/utils/date.ts:29](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L29)

## Methods

### endOfMonth

▸ **endOfMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): [*DateObject*](dateutils.dateobject.md)

Get end of month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/date.ts:360](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L360)

___

### endOfWeek

▸ **endOfWeek**(`date?`: [*DateObject*](dateutils.dateobject.md), `isoWeek?`: *boolean*): [*DateObject*](dateutils.dateobject.md)

Get end of week

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*DateObject*](dateutils.dateobject.md) | Date   |
`isoWeek` | *boolean* | Use ISO week    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/date.ts:109](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L109)

___

### formatDate

▸ **formatDate**(`dateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `template`: *string*, `locale?`: *string*): *string*

Get the formatted date according to the string of tokens passed in.

To escape characters, wrap them in square brackets (e.g. [MM]).

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date   |
`template` | *string* | Date format   |
`locale?` | *string* | Locale    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:85](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L85)

___

### getDays

▸ **getDays**(`start`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `end`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `template?`: *string*): *string*[]

Get days between a start and end time in the specified template

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`start` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | - | Start   |
`end` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | - | End   |
`template` | *string* | 'dddd DD' | Date template    |

**Returns:** *string*[]

Defined in: [shared/utils/date.ts:123](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L123)

___

### getDurationHours

▸ **getDurationHours**(`startDateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `endDateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *number*

Get duration between two times in hours

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Start time   |
`endDateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | End time    |

**Returns:** *number*

Defined in: [shared/utils/date.ts:282](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L282)

___

### getDurationString

▸ **getDurationString**(`hours`: *number*, `t`: TFunction): *string*

Get duration string

E.g. 15.75 = 15 hours 45 minutes

Using solution from https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
to handle floating point number precision.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`hours` | *number* | Duration in hours   |
`t` | TFunction | Translate function    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:62](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L62)

___

### getIsoWeek

▸ **getIsoWeek**(`isoWeek`: *number*, `year`: *number*): *number*

Get Iso Week number
Handles a weakness in dayjs, where week 53 occuring in january of a year
e.g. jan 1-3 2021, is returned as january 2022

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`isoWeek` | *number* | Iso week number   |
`year` | *number* | Year    |

**Returns:** *number*

Defined in: [shared/utils/date.ts:214](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L214)

___

### getMonthIndex

▸ **getMonthIndex**(`date?`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *number*

Get the month.

Months are zero indexed, so January is month 0 and December is 11 (obviously).

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Optional date    |

**Returns:** *number*

Defined in: [shared/utils/date.ts:232](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L232)

___

### getMonthName

▸ **getMonthName**(`monthIndex?`: *number*, `template?`: *string*): *string*

Get month name for the speicifed month index

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`monthIndex?` | *number* | Month index   |
`template` | *string* | -Template    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:144](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L144)

___

### getMonthNames

▸ **getMonthNames**(): *string*[]

Get month names in a year

**Returns:** *string*[]

Defined in: [shared/utils/date.ts:191](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L191)

___

### getPeriod

▸ **getPeriod**(`dateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *string*

Get period id for the date

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date time    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:331](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L331)

___

### getTimespanString

▸ **getTimespanString**(`__namedParameters`: [*TimeSpanStringOptions*](../modules/dateutils.md#timespanstringoptions)): *string*

Get timespan string

Supports either start and end dates, or week
number and year. `monthFormat` and `yearFormat`
are optional.

Date formats are based on if the dates are the same
month and year, and if the year is the current year.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*TimeSpanStringOptions*](../modules/dateutils.md#timespanstringoptions) |

**Returns:** *string*

Defined in: [shared/utils/date.ts:163](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L163)

___

### getTimezone

▸ **getTimezone**(`tzOffset`: *number*): *string*

Get timezone from offset

See https://stackoverflow.com/questions/24500375/get-clients-gmt-offset-in-javascript

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tzOffset` | *number* | Offset in minutes    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:306](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L306)

___

### getWeek

▸ **getWeek**(`date?`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *number*

Get week number

If no date parameter is specified the current week is returned

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Optional date    |

**Returns:** *number*

Defined in: [shared/utils/date.ts:202](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L202)

___

### getYear

▸ **getYear**(`date?`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *number*

Get the year

If no date parameter is specified the current year is returned

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Optional date    |

**Returns:** *number*

Defined in: [shared/utils/date.ts:243](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L243)

___

### isAfterToday

▸ **isAfterToday**(`dateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *boolean*

Is after today

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date time    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:322](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L322)

___

### isBefore

▸ **isBefore**(`a`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `b?`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *boolean*

Is current year

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`a` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date b    |
`b?` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | - |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:272](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L272)

___

### isCurrentWeek

▸ **isCurrentWeek**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

Is current week

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:252](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L252)

___

### isCurrentYear

▸ **isCurrentYear**(`date`: [*DateObject*](dateutils.dateobject.md), `year?`: *number*): *boolean*

Is current year

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date   |
`year?` | *number* | Year    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:262](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L262)

___

### isSameMonth

▸ **isSameMonth**(`a`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `b`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *boolean*

Is same month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`a` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date A   |
`b` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date B    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:342](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L342)

___

### parseDateWithTimezone

▸ **parseDateWithTimezone**(`date`: [*DateWithTimezone*](../modules/dateutils.md#datewithtimezone)): Date

Parse date with timezone

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateWithTimezone*](../modules/dateutils.md#datewithtimezone) | Date with timezone    |

**Returns:** Date

The JS date

Defined in: [shared/utils/date.ts:371](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L371)

___

### setup

▸ **setup**(`locale`: *string*): *void*

Setup DateUtils class using dayjs with plugins

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | Locale    |

**Returns:** *void*

Defined in: [shared/utils/date.ts:47](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L47)

___

### startOfMonth

▸ **startOfMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): [*DateObject*](dateutils.dateobject.md)

Get start of month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/date.ts:351](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L351)

___

### startOfWeek

▸ **startOfWeek**(`date?`: [*DateObject*](dateutils.dateobject.md), `isoWeek?`: *boolean*): [*DateObject*](dateutils.dateobject.md)

Get start of week

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*DateObject*](dateutils.dateobject.md) | Date   |
`isoWeek` | *boolean* | Use ISO week    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/date.ts:96](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L96)

___

### toISOString

▸ **toISOString**(`dateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `tzOffset`: *number*): *string*

Converts the date time to ISO format using the specified offset

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date   |
`tzOffset` | *number* | Offset in minutes    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:295](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L295)
