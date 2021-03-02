[did-shared - v0.9.8](../README.md) / [date](../modules/date.md) / DateUtils

# Class: DateUtils

[date](../modules/date.md).DateUtils

## Table of contents

### Constructors

- [constructor](date.dateutils.md#constructor)

### Methods

- [endOfMonth](date.dateutils.md#endofmonth)
- [endOfWeek](date.dateutils.md#endofweek)
- [formatDate](date.dateutils.md#formatdate)
- [getDays](date.dateutils.md#getdays)
- [getDurationHours](date.dateutils.md#getdurationhours)
- [getDurationString](date.dateutils.md#getdurationstring)
- [getIsoWeek](date.dateutils.md#getisoweek)
- [getMonthIndex](date.dateutils.md#getmonthindex)
- [getMonthName](date.dateutils.md#getmonthname)
- [getMonthNames](date.dateutils.md#getmonthnames)
- [getPeriod](date.dateutils.md#getperiod)
- [getTimespanString](date.dateutils.md#gettimespanstring)
- [getTimezone](date.dateutils.md#gettimezone)
- [getWeek](date.dateutils.md#getweek)
- [getYear](date.dateutils.md#getyear)
- [isAfterToday](date.dateutils.md#isaftertoday)
- [isBefore](date.dateutils.md#isbefore)
- [isCurrentWeek](date.dateutils.md#iscurrentweek)
- [isCurrentYear](date.dateutils.md#iscurrentyear)
- [isSameMonth](date.dateutils.md#issamemonth)
- [setup](date.dateutils.md#setup)
- [startOfMonth](date.dateutils.md#startofmonth)
- [startOfWeek](date.dateutils.md#startofweek)
- [toISOString](date.dateutils.md#toisostring)

## Constructors

### constructor

\+ **new DateUtils**(`$`: IDateUtils): [*DateUtils*](date.dateutils.md)

#### Parameters:

Name | Type |
:------ | :------ |
`$` | IDateUtils |

**Returns:** [*DateUtils*](date.dateutils.md)

Defined in: [shared/utils/date.ts:38](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L38)

## Methods

### endOfMonth

▸ **endOfMonth**(`date`: [*DateObject*](date_dateobject.dateobject.md)): [*DateObject*](date_dateobject.dateobject.md)

Get end of month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](date_dateobject.dateobject.md) | Date    |

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.ts:355](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L355)

___

### endOfWeek

▸ **endOfWeek**(`date?`: [*DateObject*](date_dateobject.dateobject.md), `isoWeek?`: *boolean*): [*DateObject*](date_dateobject.dateobject.md)

Get end of week

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*DateObject*](date_dateobject.dateobject.md) | Date   |
`isoWeek` | *boolean* | Use ISO week    |

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.ts:118](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L118)

___

### formatDate

▸ **formatDate**(`dateTime`: [*ConfigType*](../modules/date._dayjs.md#configtype), `template`: *string*, `locale?`: *string*): *string*

Get the formatted date according to the string of tokens passed in.

To escape characters, wrap them in square brackets (e.g. [MM]).

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Date   |
`template` | *string* | Date format   |
`locale?` | *string* | Locale    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:94](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L94)

___

### getDays

▸ **getDays**(`start`: [*ConfigType*](../modules/date._dayjs.md#configtype), `end`: [*ConfigType*](../modules/date._dayjs.md#configtype), `template?`: *string*): *string*[]

Get days between a start and end time in the specified template

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`start` | [*ConfigType*](../modules/date._dayjs.md#configtype) | - | Start   |
`end` | [*ConfigType*](../modules/date._dayjs.md#configtype) | - | End   |
`template` | *string* | 'dddd DD' | Date template    |

**Returns:** *string*[]

Defined in: [shared/utils/date.ts:132](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L132)

___

### getDurationHours

▸ **getDurationHours**(`startDateTime`: [*ConfigType*](../modules/date._dayjs.md#configtype), `endDateTime`: [*ConfigType*](../modules/date._dayjs.md#configtype)): *number*

Get duration between two times in hours

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDateTime` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Start time   |
`endDateTime` | [*ConfigType*](../modules/date._dayjs.md#configtype) | End time    |

**Returns:** *number*

Defined in: [shared/utils/date.ts:277](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L277)

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

Defined in: [shared/utils/date.ts:71](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L71)

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

Defined in: [shared/utils/date.ts:209](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L209)

___

### getMonthIndex

▸ **getMonthIndex**(`date?`: [*ConfigType*](../modules/date._dayjs.md#configtype)): *number*

Get the month.

Months are zero indexed, so January is month 0 and December is 11 (obviously).

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Optional date    |

**Returns:** *number*

Defined in: [shared/utils/date.ts:227](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L227)

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

Defined in: [shared/utils/date.ts:153](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L153)

___

### getMonthNames

▸ **getMonthNames**(): *string*[]

Get month names in a year

**Returns:** *string*[]

Defined in: [shared/utils/date.ts:186](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L186)

___

### getPeriod

▸ **getPeriod**(`dateTime`: [*ConfigType*](../modules/date._dayjs.md#configtype)): *string*

Get period id for the date

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Date time    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:326](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L326)

___

### getTimespanString

▸ **getTimespanString**(`start`: [*DateObject*](date_dateobject.dateobject.md), `end`: [*DateObject*](date_dateobject.dateobject.md), `monthFormat?`: *string*): *string*

Get timespan string

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`start` | [*DateObject*](date_dateobject.dateobject.md) | Start   |
`end` | [*DateObject*](date_dateobject.dateobject.md) | End   |
`monthFormat` | *string* | Month format    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:167](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L167)

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

Defined in: [shared/utils/date.ts:301](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L301)

___

### getWeek

▸ **getWeek**(`date?`: [*ConfigType*](../modules/date._dayjs.md#configtype)): *number*

Get week number

If no date parameter is specified the current week is returned

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Optional date    |

**Returns:** *number*

Defined in: [shared/utils/date.ts:197](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L197)

___

### getYear

▸ **getYear**(`date?`: [*ConfigType*](../modules/date._dayjs.md#configtype)): *number*

Get the year

If no date parameter is specified the current year is returned

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Optional date    |

**Returns:** *number*

Defined in: [shared/utils/date.ts:238](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L238)

___

### isAfterToday

▸ **isAfterToday**(`dateTime`: [*ConfigType*](../modules/date._dayjs.md#configtype)): *boolean*

Is after today

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Date time    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:317](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L317)

___

### isBefore

▸ **isBefore**(`a`: [*ConfigType*](../modules/date._dayjs.md#configtype), `b?`: [*ConfigType*](../modules/date._dayjs.md#configtype)): *boolean*

Is current year

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`a` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Date b    |
`b?` | [*ConfigType*](../modules/date._dayjs.md#configtype) | - |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:267](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L267)

___

### isCurrentWeek

▸ **isCurrentWeek**(`date`: [*DateObject*](date_dateobject.dateobject.md)): *boolean*

Is current week

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](date_dateobject.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:247](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L247)

___

### isCurrentYear

▸ **isCurrentYear**(`date`: [*DateObject*](date_dateobject.dateobject.md), `year?`: *number*): *boolean*

Is current year

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](date_dateobject.dateobject.md) | Date   |
`year?` | *number* | Year    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:257](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L257)

___

### isSameMonth

▸ **isSameMonth**(`a`: [*ConfigType*](../modules/date._dayjs.md#configtype), `b`: [*ConfigType*](../modules/date._dayjs.md#configtype)): *boolean*

Is same month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`a` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Date A   |
`b` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Date B    |

**Returns:** *boolean*

Defined in: [shared/utils/date.ts:337](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L337)

___

### setup

▸ **setup**(`locale`: *string*): *void*

Setup DateUtils class using dayjs with plugins

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`locale` | *string* | Locale    |

**Returns:** *void*

Defined in: [shared/utils/date.ts:56](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L56)

___

### startOfMonth

▸ **startOfMonth**(`date`: [*DateObject*](date_dateobject.dateobject.md)): [*DateObject*](date_dateobject.dateobject.md)

Get start of month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](date_dateobject.dateobject.md) | Date    |

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.ts:346](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L346)

___

### startOfWeek

▸ **startOfWeek**(`date?`: [*DateObject*](date_dateobject.dateobject.md), `isoWeek?`: *boolean*): [*DateObject*](date_dateobject.dateobject.md)

Get start of week

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*DateObject*](date_dateobject.dateobject.md) | Date   |
`isoWeek` | *boolean* | Use ISO week    |

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.ts:105](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L105)

___

### toISOString

▸ **toISOString**(`dateTime`: [*ConfigType*](../modules/date._dayjs.md#configtype), `tzOffset`: *number*): *string*

Converts the date time to ISO format using the specified offset

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dateTime` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Date   |
`tzOffset` | *number* | Offset in minutes    |

**Returns:** *string*

Defined in: [shared/utils/date.ts:290](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L290)
