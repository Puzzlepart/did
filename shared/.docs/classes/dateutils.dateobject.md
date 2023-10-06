[did-shared - v0.13.0](../README.md) / [DateUtils](../modules/dateutils.md) / DateObject

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
- [isNationalHoliday](dateutils.dateobject.md#isnationalholiday)
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

Defined in: [shared/utils/DateObject.ts:52](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L52)

## Properties

### $

• **$**: [*Dayjs*](dateutils._dayjs.dayjs.md)

Using $ as we don't really care if it's dayjs, Temporal or luxon. This class should be
framework-agnostic, or maybe even framework-atheist

Defined in: [shared/utils/DateObject.ts:52](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L52)

## Accessors

### endOfMonth

• get **endOfMonth**(): [*DateObject*](dateutils.dateobject.md)

Get end of month

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:107](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L107)

___

### endOfWeek

• get **endOfWeek**(): [*DateObject*](dateutils.dateobject.md)

Get end of week

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:93](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L93)

___

### isCurrentMonth

• get **isCurrentMonth**(): *boolean*

Is current month

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:128](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L128)

___

### isCurrentWeek

• get **isCurrentWeek**(): *boolean*

Is current week

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:121](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L121)

___

### jsDate

• get **jsDate**(): Date

To get a copy of the native Date object parsed from the Day.js object use dayjs#toDate

**Returns:** Date

Defined in: [shared/utils/DateObject.ts:86](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L86)

___

### startOfMonth

• get **startOfMonth**(): [*DateObject*](dateutils.dateobject.md)

Get start of month

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:114](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L114)

___

### startOfWeek

• get **startOfWeek**(): [*DateObject*](dateutils.dateobject.md)

Get start of week

**Returns:** [*DateObject*](dateutils.dateobject.md)

Defined in: [shared/utils/DateObject.ts:100](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L100)

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

Defined in: [shared/utils/DateObject.ts:198](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L198)

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

Defined in: [shared/utils/DateObject.ts:210](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L210)

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

Defined in: [shared/utils/DateObject.ts:140](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L140)

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

Defined in: [shared/utils/DateObject.ts:73](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L73)

___

### getPeriods

▸ **getPeriods**(): [*IDatePeriod*](../interfaces/dateutils.idateperiod.md)[]

Get periods in the date's week.

If a week is split between months, we want to return them as two separate
periods.

**Returns:** [*IDatePeriod*](../interfaces/dateutils.idateperiod.md)[]

Defined in: [shared/utils/DateObject.ts:246](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L246)

___

### isAfterToday

▸ **isAfterToday**(): *boolean*

Is after today

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:174](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L174)

___

### isBeforeOrSame

▸ **isBeforeOrSame**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

This indicates whether the Day.js object is the same or before as the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:183](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L183)

___

### isNationalHoliday

▸ **isNationalHoliday**(`holidays?`: *HolidayObject*[]): *HolidayObject*

Checks if the date is a national holiday and returns the holiday object if
the date/day is a national holiday.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`holidays` | *HolidayObject*[] | Collection of holidays to check towards    |

**Returns:** *HolidayObject*

Defined in: [shared/utils/DateObject.ts:234](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L234)

___

### isSameDay

▸ **isSameDay**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

This indicates whether the DateObject object is the same day the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:149](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L149)

___

### isSameMonth

▸ **isSameMonth**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

This indicates whether the DateObject object is the same month the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:158](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L158)

___

### isSameYear

▸ **isSameYear**(`date`: [*DateObject*](dateutils.dateobject.md)): *boolean*

This indicates whether the DateObject object is the same year the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](dateutils.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/DateObject.ts:167](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L167)

___

### toObject

▸ **toObject**(...`include`: *string*[]): *Partial*<{ `month`: *number* ; `monthName`: *string* ; `week`: *number* ; `year`: *number*  }\>

Returns an object representation of the DateObject

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...include` | *string*[] | Properties to include    |

**Returns:** *Partial*<{ `month`: *number* ; `monthName`: *string* ; `week`: *number* ; `year`: *number*  }\>

Defined in: [shared/utils/DateObject.ts:218](https://github.com/Puzzlepart/did/blob/dev/shared/utils/DateObject.ts#L218)
