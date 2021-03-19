[did-shared - v0.9.11](../README.md) / [DateUtils](../modules/dateutils.md) / [%24dayjs](../modules/dateutils._dayjs.md) / Dayjs

# Class: Dayjs

[DateUtils](../modules/dateutils.md).[$dayjs](../modules/dateutils._dayjs.md).Dayjs

## Table of contents

### Constructors

- [constructor](dateutils._dayjs.dayjs.md#constructor)

### Methods

- [add](dateutils._dayjs.dayjs.md#add)
- [clone](dateutils._dayjs.dayjs.md#clone)
- [date](dateutils._dayjs.dayjs.md#date)
- [day](dateutils._dayjs.dayjs.md#day)
- [daysInMonth](dateutils._dayjs.dayjs.md#daysinmonth)
- [diff](dateutils._dayjs.dayjs.md#diff)
- [endOf](dateutils._dayjs.dayjs.md#endof)
- [format](dateutils._dayjs.dayjs.md#format)
- [get](dateutils._dayjs.dayjs.md#get)
- [hour](dateutils._dayjs.dayjs.md#hour)
- [isAfter](dateutils._dayjs.dayjs.md#isafter)
- [isBefore](dateutils._dayjs.dayjs.md#isbefore)
- [isLeapYear](dateutils._dayjs.dayjs.md#isleapyear)
- [isSame](dateutils._dayjs.dayjs.md#issame)
- [isUTC](dateutils._dayjs.dayjs.md#isutc)
- [isValid](dateutils._dayjs.dayjs.md#isvalid)
- [isoWeek](dateutils._dayjs.dayjs.md#isoweek)
- [isoWeekYear](dateutils._dayjs.dayjs.md#isoweekyear)
- [isoWeekday](dateutils._dayjs.dayjs.md#isoweekday)
- [isoWeeksInYear](dateutils._dayjs.dayjs.md#isoweeksinyear)
- [local](dateutils._dayjs.dayjs.md#local)
- [locale](dateutils._dayjs.dayjs.md#locale)
- [localeData](dateutils._dayjs.dayjs.md#localedata)
- [millisecond](dateutils._dayjs.dayjs.md#millisecond)
- [minute](dateutils._dayjs.dayjs.md#minute)
- [month](dateutils._dayjs.dayjs.md#month)
- [second](dateutils._dayjs.dayjs.md#second)
- [set](dateutils._dayjs.dayjs.md#set)
- [startOf](dateutils._dayjs.dayjs.md#startof)
- [subtract](dateutils._dayjs.dayjs.md#subtract)
- [toDate](dateutils._dayjs.dayjs.md#todate)
- [toISOString](dateutils._dayjs.dayjs.md#toisostring)
- [toJSON](dateutils._dayjs.dayjs.md#tojson)
- [toString](dateutils._dayjs.dayjs.md#tostring)
- [tz](dateutils._dayjs.dayjs.md#tz)
- [unix](dateutils._dayjs.dayjs.md#unix)
- [utc](dateutils._dayjs.dayjs.md#utc)
- [utcOffset](dateutils._dayjs.dayjs.md#utcoffset)
- [valueOf](dateutils._dayjs.dayjs.md#valueof)
- [week](dateutils._dayjs.dayjs.md#week)
- [year](dateutils._dayjs.dayjs.md#year)

## Constructors

### constructor

\+ **new Dayjs**(`config?`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype)): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config?` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:22

## Methods

### add

▸ **add**(`value`: *number*, `unit?`: [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype)): [*Dayjs*](dateutils._dayjs.dayjs.md)

Returns a cloned Day.js object with a specified amount of time added.
```
dayjs().add(7, 'day')// => Dayjs
```
Units are case insensitive, and support plural and short forms.

Docs: https://day.js.org/docs/en/manipulate/add

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |
`unit?` | [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype) |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:229

▸ **add**(`value`: Duration): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | Duration |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/duration.d.ts:60

▸ **add**(`argument`: *object*): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`argument` | *object* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/objectSupport.d.ts:9

___

### clone

▸ **clone**(): [*Dayjs*](dateutils._dayjs.dayjs.md)

All Day.js objects are immutable. Still, `dayjs#clone` can create a clone of the current object if you need one.
```
dayjs().clone()// => Dayjs
dayjs(dayjs('2019-01-25')) // passing a Dayjs object to a constructor will also clone it
```
Docs: https://day.js.org/docs/en/parse/dayjs-clone

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:32

___

### date

▸ **date**(): *number*

Get the date of the month.
```
dayjs().date()// => 1-31
```
Docs: https://day.js.org/docs/en/get-set/date

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:86

▸ **date**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

Set the date of the month.

Accepts numbers from 1 to 31. If the range is exceeded, it will bubble up to the months.
```
dayjs().date(1)// => Dayjs
```
Docs: https://day.js.org/docs/en/get-set/date

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:96

___

### day

▸ **day**(): *number*

Get the day of the week.

Returns numbers from 0 (Sunday) to 6 (Saturday).
```
dayjs().day()// 0-6
```
Docs: https://day.js.org/docs/en/get-set/day

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:106

▸ **day**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

Set the day of the week.

Accepts numbers from 0 (Sunday) to 6 (Saturday). If the range is exceeded, it will bubble up to other weeks.
```
dayjs().day(0)// => Dayjs
```
Docs: https://day.js.org/docs/en/get-set/day

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:116

___

### daysInMonth

▸ **daysInMonth**(): *number*

Get the number of days in the current month.
```
dayjs('2019-01-25').daysInMonth() // 31
```
Docs: https://day.js.org/docs/en/display/days-in-month

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:319

___

### diff

▸ **diff**(`date`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `unit?`: *millisecond* \| *second* \| *minute* \| *hour* \| *day* \| *month* \| *year* \| *date* \| *d* \| *M* \| *y* \| *h* \| *m* \| *s* \| *ms* \| *week* \| *w* \| *quarter* \| *Q*, `float?`: *boolean*): *number*

This indicates the difference between two date-time in the specified unit.

To get the difference in milliseconds, use `dayjs#diff`
```
const date1 = dayjs('2019-01-25')
const date2 = dayjs('2018-06-05')
date1.diff(date2) // 20214000000 default milliseconds
```
To get the difference in another unit of measurement, pass that measurement as the second argument.
```
const date1 = dayjs('2019-01-25')
date1.diff('2018-06-05', 'month') // 7
```
Units are case insensitive, and support plural and short forms.

Docs: https://day.js.org/docs/en/display/difference

#### Parameters:

Name | Type |
:------ | :------ |
`date` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) |
`unit?` | *millisecond* \| *second* \| *minute* \| *hour* \| *day* \| *month* \| *year* \| *date* \| *d* \| *M* \| *y* \| *h* \| *m* \| *s* \| *ms* \| *week* \| *w* \| *quarter* \| *Q* |
`float?` | *boolean* |

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:290

___

### endOf

▸ **endOf**(`unit`: [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype)): [*Dayjs*](dateutils._dayjs.dayjs.md)

Returns a cloned Day.js object and set it to the end of a unit of time.
```
dayjs().endOf('month')// => Dayjs
```
Units are case insensitive, and support plural and short forms.

Docs: https://day.js.org/docs/en/manipulate/end-of

#### Parameters:

Name | Type |
:------ | :------ |
`unit` | [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype) |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:259

▸ **endOf**(`unit`: ISOUnitType): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`unit` | ISOUnitType |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:19

___

### format

▸ **format**(`template?`: *string*): *string*

Get the formatted date according to the string of tokens passed in.

To escape characters, wrap them in square brackets (e.g. [MM]).
```
dayjs().format()// => current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'
dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')// 'YYYYescape 2019-01-25T00:00:00-02:00Z'
dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
```
Docs: https://day.js.org/docs/en/display/format

#### Parameters:

Name | Type |
:------ | :------ |
`template?` | *string* |

**Returns:** *string*

Defined in: node_modules/dayjs/index.d.ts:271

___

### get

▸ **get**(`unit`: [*UnitType*](../modules/dateutils._dayjs.md#unittype)): *number*

String getter, returns the corresponding information getting from Day.js object.

In general:
```
dayjs().get(unit) === dayjs()[unit]()
```
Units are case insensitive, and support plural and short forms.
```
dayjs().get('year')
dayjs().get('month') // start 0
dayjs().get('date')
```
Docs: https://day.js.org/docs/en/get-set/get

#### Parameters:

Name | Type |
:------ | :------ |
`unit` | [*UnitType*](../modules/dateutils._dayjs.md#unittype) |

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:219

___

### hour

▸ **hour**(): *number*

Get the hour.
```
dayjs().hour()// => 0-23
```
Docs: https://day.js.org/docs/en/get-set/hour

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:124

▸ **hour**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

Set the hour.

Accepts numbers from 0 to 23. If the range is exceeded, it will bubble up to the day.
```
dayjs().hour(12)// => Dayjs
```
Docs: https://day.js.org/docs/en/get-set/hour

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:134

___

### isAfter

▸ **isAfter**(`date`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `unit?`: [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype)): *boolean*

This indicates whether the Day.js object is after the other supplied date-time.
```
dayjs().isAfter(dayjs('2011-01-01')) // default milliseconds
```
If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
```
dayjs().isAfter('2011-01-01', 'year')// => boolean
```
Units are case insensitive, and support plural and short forms.

Docs: https://day.js.org/docs/en/query/is-after

#### Parameters:

Name | Type |
:------ | :------ |
`date` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) |
`unit?` | [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype) |

**Returns:** *boolean*

Defined in: node_modules/dayjs/index.d.ts:398

▸ **isAfter**(`date`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `unit?`: ISOUnitType): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`date` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) |
`unit?` | ISOUnitType |

**Returns:** *boolean*

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:25

___

### isBefore

▸ **isBefore**(`date`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `unit?`: [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype)): *boolean*

This indicates whether the Day.js object is before the other supplied date-time.
```
dayjs().isBefore(dayjs('2011-01-01')) // default milliseconds
```
If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
```
dayjs().isBefore('2011-01-01', 'year')// => boolean
```
Units are case insensitive, and support plural and short forms.

Docs: https://day.js.org/docs/en/query/is-before

#### Parameters:

Name | Type |
:------ | :------ |
`date` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) |
`unit?` | [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype) |

**Returns:** *boolean*

Defined in: node_modules/dayjs/index.d.ts:372

▸ **isBefore**(`date`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `unit?`: ISOUnitType): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`date` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) |
`unit?` | ISOUnitType |

**Returns:** *boolean*

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:23

___

### isLeapYear

▸ **isLeapYear**(): *boolean*

**Returns:** *boolean*

Defined in: node_modules/dayjs/plugin/isLeapYear.d.ts:8

___

### isSame

▸ **isSame**(`date`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `unit?`: [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype)): *boolean*

This indicates whether the Day.js object is the same as the other supplied date-time.
```
dayjs().isSame(dayjs('2011-01-01')) // default milliseconds
```
If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
```
dayjs().isSame('2011-01-01', 'year')// => boolean
```
Docs: https://day.js.org/docs/en/query/is-same

#### Parameters:

Name | Type |
:------ | :------ |
`date` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) |
`unit?` | [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype) |

**Returns:** *boolean*

Defined in: node_modules/dayjs/index.d.ts:384

▸ **isSame**(`date`: [*ConfigType*](../modules/dateutils._dayjs.md#configtype), `unit?`: ISOUnitType): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`date` | [*ConfigType*](../modules/dateutils._dayjs.md#configtype) |
`unit?` | ISOUnitType |

**Returns:** *boolean*

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:21

___

### isUTC

▸ **isUTC**(): *boolean*

**Returns:** *boolean*

Defined in: node_modules/dayjs/plugin/utc.d.ts:13

___

### isValid

▸ **isValid**(): *boolean*

This returns a `boolean` indicating whether the Day.js object contains a valid date or not.
```
dayjs().isValid()// => boolean
```
Docs: https://day.js.org/docs/en/parse/is-valid

**Returns:** *boolean*

Defined in: node_modules/dayjs/index.d.ts:40

___

### isoWeek

▸ **isoWeek**(): *number*

**Returns:** *number*

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:11

▸ **isoWeek**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:12

___

### isoWeekYear

▸ **isoWeekYear**(): *number*

**Returns:** *number*

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:10

___

### isoWeekday

▸ **isoWeekday**(): *number*

**Returns:** *number*

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:14

▸ **isoWeekday**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:15

___

### isoWeeksInYear

▸ **isoWeeksInYear**(): *number*

**Returns:** *number*

Defined in: node_modules/dayjs/plugin/isoWeeksInYear.d.ts:8

___

### local

▸ **local**(): [*Dayjs*](dateutils._dayjs.dayjs.md)

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/utc.d.ts:11

___

### locale

▸ **locale**(): *string*

**Returns:** *string*

Defined in: node_modules/dayjs/index.d.ts:400

▸ **locale**(`preset`: *string* \| ILocale, `object?`: *Partial*<ILocale\>): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`preset` | *string* \| ILocale |
`object?` | *Partial*<ILocale\> |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:402

___

### localeData

▸ **localeData**(): [*InstanceLocaleDataReturn*](../interfaces/dateutils._dayjs.instancelocaledatareturn.md)

**Returns:** [*InstanceLocaleDataReturn*](../interfaces/dateutils._dayjs.instancelocaledatareturn.md)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:33

___

### millisecond

▸ **millisecond**(): *number*

Get the milliseconds.
```
dayjs().millisecond()// => 0-999
```
Docs: https://day.js.org/docs/en/get-set/millisecond

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:177

▸ **millisecond**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

Set the milliseconds.

Accepts numbers from 0 to 999. If the range is exceeded, it will bubble up to the seconds.
```
dayjs().millisecond(1)// => Dayjs
```
Docs: https://day.js.org/docs/en/get-set/millisecond

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:187

___

### minute

▸ **minute**(): *number*

Get the minutes.
```
dayjs().minute()// => 0-59
```
Docs: https://day.js.org/docs/en/get-set/minute

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:142

▸ **minute**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

Set the minutes.

Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the hour.
```
dayjs().minute(59)// => Dayjs
```
Docs: https://day.js.org/docs/en/get-set/minute

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:152

___

### month

▸ **month**(): *number*

Get the month.

Months are zero indexed, so January is month 0.
```
dayjs().month()// => 0-11
```
Docs: https://day.js.org/docs/en/get-set/month

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:66

▸ **month**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

Set the month.

Months are zero indexed, so January is month 0.

Accepts numbers from 0 to 11. If the range is exceeded, it will bubble up to the year.
```
dayjs().month(0)// => Dayjs
```
Docs: https://day.js.org/docs/en/get-set/month

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:78

___

### second

▸ **second**(): *number*

Get the seconds.
```
dayjs().second()// => 0-59
```
Docs: https://day.js.org/docs/en/get-set/second

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:160

▸ **second**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

Set the seconds.

Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the minutes.
```
dayjs().second(1)// Dayjs
```

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:169

___

### set

▸ **set**(`unit`: [*UnitType*](../modules/dateutils._dayjs.md#unittype), `value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

Generic setter, accepting unit as first argument, and value as second, returns a new instance with the applied changes.

In general:
```
dayjs().set(unit, value) === dayjs()[unit](value)
```
Units are case insensitive, and support plural and short forms.
```
dayjs().set('date', 1)
dayjs().set('month', 3) // April
dayjs().set('second', 30)
```
Docs: https://day.js.org/docs/en/get-set/set

#### Parameters:

Name | Type |
:------ | :------ |
`unit` | [*UnitType*](../modules/dateutils._dayjs.md#unittype) |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:203

▸ **set**(`argument`: *object*): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`argument` | *object* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/objectSupport.d.ts:8

___

### startOf

▸ **startOf**(`unit`: [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype)): [*Dayjs*](dateutils._dayjs.dayjs.md)

Returns a cloned Day.js object and set it to the start of a unit of time.
```
dayjs().startOf('year')// => Dayjs
```
Units are case insensitive, and support plural and short forms.

Docs: https://day.js.org/docs/en/manipulate/start-of

#### Parameters:

Name | Type |
:------ | :------ |
`unit` | [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype) |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:249

▸ **startOf**(`unit`: ISOUnitType): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`unit` | ISOUnitType |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/isoWeek.d.ts:17

___

### subtract

▸ **subtract**(`value`: *number*, `unit?`: [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype)): [*Dayjs*](dateutils._dayjs.dayjs.md)

Returns a cloned Day.js object with a specified amount of time subtracted.
```
dayjs().subtract(7, 'year')// => Dayjs
```
Units are case insensitive, and support plural and short forms.

Docs: https://day.js.org/docs/en/manipulate/subtract

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |
`unit?` | [*OpUnitType*](../modules/dateutils._dayjs.md#opunittype) |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:239

▸ **subtract**(`value`: Duration): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | Duration |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/duration.d.ts:61

▸ **subtract**(`argument`: *object*): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`argument` | *object* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/objectSupport.d.ts:10

___

### toDate

▸ **toDate**(): Date

To get a copy of the native `Date` object parsed from the Day.js object use `dayjs#toDate`.
```
dayjs('2019-01-25').toDate()// => Date
```

**Returns:** Date

Defined in: node_modules/dayjs/index.d.ts:326

___

### toISOString

▸ **toISOString**(): *string*

To format as an ISO 8601 string.
```
dayjs('2019-01-25').toISOString() // '2019-01-25T02:00:00.000Z'
```
Docs: https://day.js.org/docs/en/display/as-iso-string

**Returns:** *string*

Defined in: node_modules/dayjs/index.d.ts:342

___

### toJSON

▸ **toJSON**(): *string*

To serialize as an ISO 8601 string.
```
dayjs('2019-01-25').toJSON() // '2019-01-25T02:00:00.000Z'
```
Docs: https://day.js.org/docs/en/display/as-json

**Returns:** *string*

Defined in: node_modules/dayjs/index.d.ts:334

___

### toString

▸ **toString**(): *string*

Returns a string representation of the date.
```
dayjs('2019-01-25').toString() // 'Fri, 25 Jan 2019 02:00:00 GMT'
```
Docs: https://day.js.org/docs/en/display/as-string

**Returns:** *string*

Defined in: node_modules/dayjs/index.d.ts:350

___

### tz

▸ **tz**(`timezone?`: *string*, `keepLocalTime?`: *boolean*): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`timezone?` | *string* |
`keepLocalTime?` | *boolean* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/timezone.d.ts:8

___

### unix

▸ **unix**(): *number*

This returns the Unix timestamp (the number of **seconds** since the Unix Epoch) of the Day.js object.
```
dayjs('2019-01-25').unix() // 1548381600
```
This value is floored to the nearest second, and does not include a milliseconds component.

Docs: https://day.js.org/docs/en/display/unix-timestamp

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:311

___

### utc

▸ **utc**(`keepLocalTime?`: *boolean*): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`keepLocalTime?` | *boolean* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/utc.d.ts:9

___

### utcOffset

▸ **utcOffset**(): *number*

Get the UTC offset in minutes.
```
dayjs().utcOffset()
```
Docs: https://day.js.org/docs/en/manipulate/utc-offset

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:358

▸ **utcOffset**(`offset`: *number*, `keepLocalTime?`: *boolean*): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`offset` | *number* |
`keepLocalTime?` | *boolean* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/utc.d.ts:15

___

### valueOf

▸ **valueOf**(): *number*

This returns the number of **milliseconds** since the Unix Epoch of the Day.js object.
```
dayjs('2019-01-25').valueOf() // 1548381600000
+dayjs(1548381600000) // 1548381600000
```
To get a Unix timestamp (the number of seconds since the epoch) from a Day.js object, you should use Unix Timestamp `dayjs#unix()`.

Docs: https://day.js.org/docs/en/display/unix-timestamp-milliseconds

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:301

___

### week

▸ **week**(): *number*

**Returns:** *number*

Defined in: node_modules/dayjs/plugin/weekOfYear.d.ts:8

▸ **week**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/weekOfYear.d.ts:10

___

### year

▸ **year**(): *number*

Get the year.
```
dayjs().year()// => 2020
```
Docs: https://day.js.org/docs/en/get-set/year

**Returns:** *number*

Defined in: node_modules/dayjs/index.d.ts:48

▸ **year**(`value`: *number*): [*Dayjs*](dateutils._dayjs.dayjs.md)

Set the year.
```
dayjs().year(2000)// => Dayjs
```
Docs: https://day.js.org/docs/en/get-set/year

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |

**Returns:** [*Dayjs*](dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:56
