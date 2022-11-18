[did-shared - v0.11.1](../README.md) / [DateUtils](../modules/dateutils.md) / DateObject

# Class: DateObject

[DateUtils](../modules/dateutils.md).DateObject

## Table of contents

### Constructors

- [constructor](dateutils.dateobject.md#constructor)

### Properties

- [$](dateutils.dateobject.md#$)

### Accessors

- [endOfMonth](dateutils.dateobject.md#endofmonth)
- [endOfWeek](dateutils.dateobject.md#endofweek)
- [isCurrentMonth](dateutils.dateobject.md#iscurrentmonth)
- [isCurrentWeek](dateutils.dateobject.md#iscurrentweek)
- [jsDate](dateutils.dateobject.md#jsdate)
- [startOfMonth](dateutils.dateobject.md#startofmonth)
- [startOfWeek](dateutils.dateobject.md#startofweek)

### Methods

- [add](dateutils.dateobject.md#add)
- [diff](dateutils.dateobject.md#diff)
- [format](dateutils.dateobject.md#format)
- [fromObject](dateutils.dateobject.md#fromobject)
- [getPeriods](dateutils.dateobject.md#getperiods)
- [isAfterToday](dateutils.dateobject.md#isaftertoday)
- [isBeforeOrSame](dateutils.dateobject.md#isbeforeorsame)
- [isSameDay](dateutils.dateobject.md#issameday)
- [isSameMonth](dateutils.dateobject.md#issamemonth)
- [isSameYear](dateutils.dateobject.md#issameyear)
- [toObject](dateutils.dateobject.md#toobject)

## Constructors

### constructor

\+ **new DateObject**(`date?`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): [*DateObject*](dateutils.dateobject.md)

Constructs a new DateObject from a date input

Sending no value for date will use the current date

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) | Date input    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:23](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L23)

## Properties

### $

• **$**: [*Dayjs*](dateutils._dayjs.dayjs.md)

Using $ as we don't really care if it's dayjs, Temporal or luxon. This class should be
framework-agnostic, or maybe even framework-atheist

Defined in: [shared/utils/DateObject.ts:23](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L23)

## Accessors

### endOfMonth

• get **endOfMonth**(): [*DateObject*](dateutils.dateobject.md)

Get end of month

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:78](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L78)

___

### endOfWeek

• get **endOfWeek**(): [*DateObject*](dateutils.dateobject.md)

Get end of week

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:64](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L64)

___

### isCurrentMonth

• get **isCurrentMonth**(): *boolean*

Is current month

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:99](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L99)

___

### isCurrentWeek

• get **isCurrentWeek**(): *boolean*

Is current week

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:92](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L92)

___

### jsDate

• get **jsDate**(): Date

To get a copy of the native Date object parsed from the Day.js object use dayjs#toDate

**Returns:** Date

Defined in: [shared/utils/DateObject.ts:57](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L57)

___

### startOfMonth

• get **startOfMonth**(): [*DateObject*](dateutils.dateobject.md)

Get start of month

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:85](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L85)

___

### startOfWeek

• get **startOfWeek**(): [*DateObject*](dateutils.dateobject.md)

Get start of week

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:71](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L71)

## Methods

### add

▸ **add**(`add`: *string*): [*DateObject*](dateutils.dateobject.md)

Returns a cloned DateObject with a specified amount of time added

Currently only supporting int (whole numbers)

If we want to support e.g. 1.5h, we could look into using parseFloat insteaf of parseInt

E.g. 1d to add day, or 1m to add 1 month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`add` | *string* | Add    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:169](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L169)

___

### diff

▸ **diff**(`date`: [*DateObject*](dateutils.dateobject.md), `unit`: [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype)): *number*

This indicates the difference between two date-time in the specified unit.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date   *   |
`unit` | [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype) | Unit    |

**Returns:** *number*

Defined in: [shared/utils/DateObject.ts:181](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L181)

___

### format

▸ **format**(`template?`: *string*, `locale?`: *string*): *string*

Get the formatted date according to the string of tokens passed in.

To escape characters, wrap them in square brackets (e.g. [MM]).

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`template` | *string* | 'YYYY-MM-DD' | Template   |
`locale?` | *string* | - | Locale    |

**Returns:** *string*

Defined in: [shared/utils/DateObject.ts:111](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L111)

___

### fromObject

▸ **fromObject**(`input`: ObjectInput, `startOf?`: *any*): [*DateObject*](dateutils.dateobject.md)

Sets the DateObject date from an object consisting of week and year

If week and year is not specified, today's date is used

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`input` | ObjectInput | - | Object input   |
`startOf` | *any* | 'isoWeek' | Optional start of (e.g. year or isoWeek)    |

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:44](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L44)

___

### getPeriods

▸ **getPeriods**(): [*IDatePeriod*](../interfaces/dateutils.idateperiod.md)[]

Get periods in the date's week.

If a week is split between months, we want to return them as two separate
periods.

**Returns:** [*IDatePeriod*](../interfaces/dateutils.idateperiod.md)[]

Defined in: [shared/utils/DateObject.ts:206](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L206)

___

### isAfterToday

▸ **isAfterToday**(): *boolean*

Is after today

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:145](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L145)

___

### isBeforeOrSame

▸ **isBeforeOrSame**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

This indicates whether the Day.js object is the same or before as the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:154](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L154)

___

### isSameDay

▸ **isSameDay**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

This indicates whether the DateObject object is the same day the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:120](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L120)

___

### isSameMonth

▸ **isSameMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

This indicates whether the DateObject object is the same month the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:129](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L129)

___

### isSameYear

▸ **isSameYear**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

This indicates whether the DateObject object is the same year the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:138](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L138)

___

### toObject

▸ **toObject**(...`include`: *string*[]): *Partial*<{ `month`: *number* ; `monthName`: *string* ; `week`: *number* ; `year`: *number*  }\>

Returns an object representation of the DateObject

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...include` | *string*[] | Properties to include    |

**Returns:** *Partial*<{ `month`: *number* ; `monthName`: *string* ; `week`: *number* ; `year`: *number*  }\>

Defined in: [shared/utils/DateObject.ts:190](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L190)
