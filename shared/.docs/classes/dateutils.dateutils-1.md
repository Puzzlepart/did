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

Defined in: [shared/utils/date.ts:34](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L34)

## Methods

### endOfMonth

▸ **endOfMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): [*DateObject*](dateutils.dateobject.md)

Get end of month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/date.ts:409](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L409)

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

Defined in: [shared/utils/date.ts:127](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L127)

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

Defined in: [shared/utils/date.ts:102](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L102)

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

Defined in: [shared/utils/date.ts:141](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L141)

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

Defined in: [shared/utils/date.ts:331](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L331)

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

Defined in: [shared/utils/date.ts:68](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L68)

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

Defined in: [shared/utils/date.ts:254](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L254)

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

Defined in: [shared/utils/date.ts:272](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L272)

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

Defined in: [shared/utils/date.ts:176](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L176)

___

### getMonthNames

▸ **getMonthNames**(): *string*[]

Get month names in a year

**Returns:** *string*[]

Defined in: [shared/utils/date.ts:231](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L231)

___

### getPeriod

▸ **getPeriod**(`dateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *string*

Get period id for the date

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date time    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:380](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L380)

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

Defined in: [shared/utils/date.ts:195](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L195)

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

Defined in: [shared/utils/date.ts:355](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L355)

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

Defined in: [shared/utils/date.ts:242](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L242)

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

Defined in: [shared/utils/date.ts:283](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L283)

___

### isAfterToday

▸ **isAfterToday**(`dateTime`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): *boolean*

Is after today

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date time    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:371](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L371)

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

Defined in: [shared/utils/date.ts:321](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L321)

___

### isCurrentMonth

▸ **isCurrentMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

Is current month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:301](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L301)

___

### isCurrentWeek

▸ **isCurrentWeek**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

Is current week

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:292](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L292)

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

Defined in: [shared/utils/date.ts:311](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L311)

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

Defined in: [shared/utils/date.ts:391](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L391)

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

Defined in: [shared/utils/date.ts:420](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L420)

___

### setup

▸ **setup**(`locale`: *string*): *void*

Setup DateUtils class using dayjs with plugins

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | Locale    |

**Returns:** *void*

Defined in: [shared/utils/date.ts:52](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L52)

___

### startOfMonth

▸ **startOfMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): [*DateObject*](dateutils.dateobject.md)

Get start of month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/date.ts:400](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L400)

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

Defined in: [shared/utils/date.ts:114](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L114)

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

Defined in: [shared/utils/date.ts:344](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L344)
