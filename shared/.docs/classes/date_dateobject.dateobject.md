[did-shared - v0.9.8](../README.md) / [date.dateObject](../modules/date_dateobject.md) / DateObject

# Class: DateObject

[date.dateObject](../modules/date_dateobject.md).DateObject

## Table of contents

### Constructors

- [constructor](date_dateobject.dateobject.md#constructor)

### Properties

- [$](date_dateobject.dateobject.md#$)

### Accessors

- [endOfMonth](date_dateobject.dateobject.md#endofmonth)
- [endOfWeek](date_dateobject.dateobject.md#endofweek)
- [isCurrentWeek](date_dateobject.dateobject.md#iscurrentweek)
- [jsDate](date_dateobject.dateobject.md#jsdate)
- [startOfMonth](date_dateobject.dateobject.md#startofmonth)
- [startOfWeek](date_dateobject.dateobject.md#startofweek)

### Methods

- [add](date_dateobject.dateobject.md#add)
- [diff](date_dateobject.dateobject.md#diff)
- [format](date_dateobject.dateobject.md#format)
- [fromObject](date_dateobject.dateobject.md#fromobject)
- [isAfterToday](date_dateobject.dateobject.md#isaftertoday)
- [isBeforeOrSame](date_dateobject.dateobject.md#isbeforeorsame)
- [isSameMonth](date_dateobject.dateobject.md#issamemonth)
- [isSameYear](date_dateobject.dateobject.md#issameyear)
- [toObject](date_dateobject.dateobject.md#toobject)

## Constructors

### constructor

\+ **new DateObject**(`date?`: [*ConfigType*](../modules/date._dayjs.md#configtype)): [*DateObject*](date_dateobject.dateobject.md)

Constructs a new DateObject from a date input

Sending no value for date will use the current date

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date?` | [*ConfigType*](../modules/date._dayjs.md#configtype) | Date input    |

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.dateObject.ts:15](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L15)

## Properties

### $

• **$**: [*Dayjs*](date._dayjs.dayjs.md)

Using $ as we don't really care if it's dayjs, Temporal or luxon. This class should be
framework-agnostic, or maybe even framework-atheist

Defined in: [shared/utils/date.dateObject.ts:15](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L15)

## Accessors

### endOfMonth

• get **endOfMonth**(): [*DateObject*](date_dateobject.dateobject.md)

Get end of month

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.dateObject.ts:70](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L70)

___

### endOfWeek

• get **endOfWeek**(): [*DateObject*](date_dateobject.dateobject.md)

Get end of week

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.dateObject.ts:56](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L56)

___

### isCurrentWeek

• get **isCurrentWeek**(): *boolean*

Is current week

**Returns:** *boolean*

Defined in: [shared/utils/date.dateObject.ts:84](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L84)

___

### jsDate

• get **jsDate**(): Date

To get a copy of the native Date object parsed from the Day.js object use dayjs#toDate

**Returns:** Date

Defined in: [shared/utils/date.dateObject.ts:49](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L49)

___

### startOfMonth

• get **startOfMonth**(): [*DateObject*](date_dateobject.dateobject.md)

Get start of month

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.dateObject.ts:77](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L77)

___

### startOfWeek

• get **startOfWeek**(): [*DateObject*](date_dateobject.dateobject.md)

Get start of week

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.dateObject.ts:63](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L63)

## Methods

### add

▸ **add**(`add`: *string*): [*DateObject*](date_dateobject.dateobject.md)

Returns a cloned DateObject with a specified amount of time added

Currently only supporting int (whole numbers)

If we want to support e.g. 1.5h, we could look into using parseFloat insteaf of parseInt

E.g. 1d to add day, or 1m to add 1 month

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`add` | *string* | Add    |

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.dateObject.ts:145](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L145)

___

### diff

▸ **diff**(`date`: [*DateObject*](date_dateobject.dateobject.md), `unit`: [*OpUnitType*](../modules/date._dayjs.md#opunittype)): *number*

This indicates the difference between two date-time in the specified unit.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](date_dateobject.dateobject.md) | Date   *   |
`unit` | [*OpUnitType*](../modules/date._dayjs.md#opunittype) | Unit    |

**Returns:** *number*

Defined in: [shared/utils/date.dateObject.ts:157](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L157)

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

Defined in: [shared/utils/date.dateObject.ts:96](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L96)

___

### fromObject

▸ **fromObject**(`input`: [*ObjectInput*](../modules/date_dateobject.md#objectinput), `startOf?`: *any*): [*DateObject*](date_dateobject.dateobject.md)

Sets the DateObject date from an object consisting of week and year

If week and year is not specified, today's date is used

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`input` | [*ObjectInput*](../modules/date_dateobject.md#objectinput) | - | Object input   |
`startOf` | *any* | 'isoWeek' | Optional start of (e.g. year or isoWeek)    |

**Returns:** [*DateObject*](date_dateobject.dateobject.md)

Defined in: [shared/utils/date.dateObject.ts:36](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L36)

___

### isAfterToday

▸ **isAfterToday**(): *boolean*

Is after today

**Returns:** *boolean*

Defined in: [shared/utils/date.dateObject.ts:121](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L121)

___

### isBeforeOrSame

▸ **isBeforeOrSame**(`date`: [*DateObject*](date_dateobject.dateobject.md)): *boolean*

This indicates whether the Day.js object is the same or before as the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](date_dateobject.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/date.dateObject.ts:130](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L130)

___

### isSameMonth

▸ **isSameMonth**(`date`: [*DateObject*](date_dateobject.dateobject.md)): *boolean*

This indicates whether the DateObject object is the same month the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](date_dateobject.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/date.dateObject.ts:105](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L105)

___

### isSameYear

▸ **isSameYear**(`date`: [*DateObject*](date_dateobject.dateobject.md)): *boolean*

This indicates whether the DateObject object is the same year the other supplied date-time.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`date` | [*DateObject*](date_dateobject.dateobject.md) | Date    |

**Returns:** *boolean*

Defined in: [shared/utils/date.dateObject.ts:114](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L114)

___

### toObject

▸ **toObject**(...`include`: *string*[]): *Partial*<{ `month`: *number* ; `monthName`: *string* ; `week`: *number* ; `year`: *number*  }\>

Returns an object representation of the DateObject

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...include` | *string*[] | Properties to include    |

**Returns:** *Partial*<{ `month`: *number* ; `monthName`: *string* ; `week`: *number* ; `year`: *number*  }\>

Defined in: [shared/utils/date.dateObject.ts:166](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.dateObject.ts#L166)
