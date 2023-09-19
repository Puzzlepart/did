[did-shared - v0.12.0](../README.md) / [DateUtils](../modules/dateutils.md) / DateUtils

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
- [isCurrentMonth](dateutils.dateutils-1.md#iscurrentmonth)
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

Defined in: [shared/utils/date.ts:35](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L35)

## Methods

### endOfMonth

▸ **endOfMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): [*DateObject*](dateutils.dateobject.md)

Get end of month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/date.ts:419](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L419)

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

Defined in: [shared/utils/date.ts:135](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L135)

___

### formatDate

▸ **formatDate**(`dateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `template`: *string*, `locale?`: *string*, `fallback?`: *any*): *string*

Get the formatted date according to the string of tokens passed in.

To escape characters, wrap them in square brackets (e.g. [MM]).

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | - | Date   |
`template` | *string* | - | Date format   |
`locale?` | *string* | - | Locale to use for formatting   |
`fallback` | *any* | null | Fallback value if date is ´null` or `undefined`    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:105](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L105)

___

### getDays

▸ **getDays**<T\>(`start`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `end`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `template?`: *string*): T[]

Get days between a start and end time in the specified template

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *string* |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`start` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | - | Start   |
`end` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | - | End   |
`template` | *string* | 'dddd DD' | Date template    |

**Returns:** T[]

Defined in: [shared/utils/date.ts:149](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L149)

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

Defined in: [shared/utils/date.ts:341](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L341)

___

### getDurationString

▸ **getDurationString**(`hours`: *number*, `t`: TFunction, `format?`: [*DurationStringFormat*](../enums/dateutils.durationstringformat.md)): *string*

Get duration string

E.g. 15.75 = 15h 45min with `DurationStringFormat.Short` and 15 hours 45 minutes with `DurationStringFormat.Long`

Using solution from https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
to handle floating point number precision.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`hours` | *number* | Duration in hours   |
`t` | TFunction | Translate function   |
`format` | [*DurationStringFormat*](../enums/dateutils.durationstringformat.md) | Format (`DurationStringFormat.Short` or `DurationStringFormat.Long`)    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:70](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L70)

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

Defined in: [shared/utils/date.ts:264](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L264)

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

Defined in: [shared/utils/date.ts:282](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L282)

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

Defined in: [shared/utils/date.ts:186](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L186)

___

### getMonthNames

▸ **getMonthNames**(): *string*[]

Get month names in a year

**Returns:** *string*[]

Defined in: [shared/utils/date.ts:241](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L241)

___

### getPeriod

▸ **getPeriod**(`dateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *string*

Get period id for the date

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date time    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:390](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L390)

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

Defined in: [shared/utils/date.ts:205](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L205)

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

Defined in: [shared/utils/date.ts:365](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L365)

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

Defined in: [shared/utils/date.ts:252](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L252)

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

Defined in: [shared/utils/date.ts:293](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L293)

___

### isAfterToday

▸ **isAfterToday**(`dateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *boolean*

Is after today

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date time    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:381](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L381)

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

Defined in: [shared/utils/date.ts:331](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L331)

___

### isCurrentMonth

▸ **isCurrentMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

Is current month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:311](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L311)

___

### isCurrentWeek

▸ **isCurrentWeek**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

Is current week

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:302](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L302)

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

Defined in: [shared/utils/date.ts:321](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L321)

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

Defined in: [shared/utils/date.ts:401](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L401)

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

Defined in: [shared/utils/date.ts:430](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L430)

___

### setup

▸ **setup**(`locale`: *string*): *void*

Setup DateUtils class using dayjs with plugins

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | Locale    |

**Returns:** *void*

Defined in: [shared/utils/date.ts:54](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L54)

___

### startOfMonth

▸ **startOfMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): [*DateObject*](dateutils.dateobject.md)

Get start of month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/date.ts:410](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L410)

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

Defined in: [shared/utils/date.ts:122](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L122)

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

Defined in: [shared/utils/date.ts:354](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L354)
