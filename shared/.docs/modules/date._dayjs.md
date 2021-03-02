[did-shared - v0.9.8](../README.md) / [date](date.md) / %24dayjs

# Namespace: $dayjs

[date](date.md).$dayjs

## Table of contents

### Classes

- [Dayjs](../classes/date._dayjs.dayjs.md)

### Interfaces

- [DayjsTimezone](../interfaces/date._dayjs.dayjstimezone.md)
- [GlobalLocaleDataReturn](../interfaces/date._dayjs.globallocaledatareturn.md)
- [InstanceLocaleDataReturn](../interfaces/date._dayjs.instancelocaledatareturn.md)

### Type aliases

- [ConfigType](date._dayjs.md#configtype)
- [MonthNames](date._dayjs.md#monthnames)
- [OpUnitType](date._dayjs.md#opunittype)
- [OptionType](date._dayjs.md#optiontype)
- [PluginFunc](date._dayjs.md#pluginfunc)
- [QUnitType](date._dayjs.md#qunittype)
- [UnitType](date._dayjs.md#unittype)
- [UnitTypeShort](date._dayjs.md#unittypeshort)
- [WeekdayNames](date._dayjs.md#weekdaynames)

### Variables

- [Ls](date._dayjs.md#ls)
- [tz](date._dayjs.md#tz)

### Functions

- [duration](date._dayjs.md#duration)
- [extend](date._dayjs.md#extend)
- [isDayjs](date._dayjs.md#isdayjs)
- [isDuration](date._dayjs.md#isduration)
- [locale](date._dayjs.md#locale)
- [localeData](date._dayjs.md#localedata)
- [months](date._dayjs.md#months)
- [monthsShort](date._dayjs.md#monthsshort)
- [unix](date._dayjs.md#unix)
- [utc](date._dayjs.md#utc)
- [weekdays](date._dayjs.md#weekdays)
- [weekdaysMin](date._dayjs.md#weekdaysmin)
- [weekdaysShort](date._dayjs.md#weekdaysshort)

## Type aliases

### ConfigType

Ƭ **ConfigType**: *string* \| *number* \| Date \| [*Dayjs*](../classes/date._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:12

___

### MonthNames

Ƭ **MonthNames**: [*string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*]

Defined in: node_modules/dayjs/plugin/localeData.d.ts:8

___

### OpUnitType

Ƭ **OpUnitType**: [*UnitType*](date._dayjs.md#unittype) \| *week* \| *w*

Defined in: node_modules/dayjs/index.d.ts:19

___

### OptionType

Ƭ **OptionType**: { `format?`: *string* ; `locale?`: *string* ; `utc?`: *boolean*  } \| *string* \| *string*[]

Defined in: node_modules/dayjs/index.d.ts:14

___

### PluginFunc

Ƭ **PluginFunc**<T\>: (`option`: T, `c`: *typeof* [*Dayjs*](../classes/date._dayjs.dayjs.md), `d`: *typeof* [*$dayjs*](date.md#$dayjs)) => *void*

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *unknown* |

#### Type declaration:

▸ (`option`: T, `c`: *typeof* [*Dayjs*](../classes/date._dayjs.dayjs.md), `d`: *typeof* [*$dayjs*](date.md#$dayjs)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`option` | T |
`c` | *typeof* [*Dayjs*](../classes/date._dayjs.dayjs.md) |
`d` | *typeof* [*$dayjs*](date.md#$dayjs) |

**Returns:** *void*

Defined in: node_modules/dayjs/index.d.ts:405

___

### QUnitType

Ƭ **QUnitType**: [*UnitType*](date._dayjs.md#unittype) \| *quarter* \| *Q*

Defined in: node_modules/dayjs/index.d.ts:20

___

### UnitType

Ƭ **UnitType**: *millisecond* \| *second* \| *minute* \| *hour* \| *day* \| *month* \| *year* \| *date* \| [*UnitTypeShort*](date._dayjs.md#unittypeshort)

Defined in: node_modules/dayjs/index.d.ts:17

___

### UnitTypeShort

Ƭ **UnitTypeShort**: *d* \| *M* \| *y* \| *h* \| *m* \| *s* \| *ms*

Defined in: node_modules/dayjs/index.d.ts:16

___

### WeekdayNames

Ƭ **WeekdayNames**: [*string*, *string*, *string*, *string*, *string*, *string*, *string*]

Defined in: node_modules/dayjs/plugin/localeData.d.ts:7

## Variables

### Ls

• `Const` **Ls**: *object*

#### Type declaration:

Defined in: node_modules/dayjs/index.d.ts:415

___

### tz

• `Const` **tz**: [*DayjsTimezone*](../interfaces/date._dayjs.dayjstimezone.md)

Defined in: node_modules/dayjs/plugin/timezone.d.ts:18

## Functions

### duration

▸ **duration**(`input?`: plugin.DurationInputType, `unit?`: *string*): plugin.Duration

#### Parameters:

Name | Type |
:------ | :------ |
`input?` | plugin.DurationInputType |
`unit?` | *string* |

**Returns:** plugin.Duration

Defined in: node_modules/dayjs/plugin/duration.d.ts:64

___

### extend

▸ **extend**<T\>(`plugin`: [*PluginFunc*](date._dayjs.md#pluginfunc)<T\>, `option?`: T): [*Dayjs*](../classes/date._dayjs.dayjs.md)

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *unknown* |

#### Parameters:

Name | Type |
:------ | :------ |
`plugin` | [*PluginFunc*](date._dayjs.md#pluginfunc)<T\> |
`option?` | T |

**Returns:** [*Dayjs*](../classes/date._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:407

___

### isDayjs

▸ **isDayjs**(`d`: *any*): d is Dayjs

#### Parameters:

Name | Type |
:------ | :------ |
`d` | *any* |

**Returns:** d is Dayjs

Defined in: node_modules/dayjs/index.d.ts:411

___

### isDuration

▸ **isDuration**(`d`: *any*): d is Duration

#### Parameters:

Name | Type |
:------ | :------ |
`d` | *any* |

**Returns:** d is Duration

Defined in: node_modules/dayjs/plugin/duration.d.ts:65

___

### locale

▸ **locale**(`preset?`: *string* \| ILocale, `object?`: *Partial*<ILocale\>, `isLocal?`: *boolean*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`preset?` | *string* \| ILocale |
`object?` | *Partial*<ILocale\> |
`isLocal?` | *boolean* |

**Returns:** *string*

Defined in: node_modules/dayjs/index.d.ts:409

___

### localeData

▸ **localeData**(): [*GlobalLocaleDataReturn*](../interfaces/date._dayjs.globallocaledatareturn.md)

**Returns:** [*GlobalLocaleDataReturn*](../interfaces/date._dayjs.globallocaledatareturn.md)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:41

___

### months

▸ **months**(): [*MonthNames*](date._dayjs.md#monthnames)

**Returns:** [*MonthNames*](date._dayjs.md#monthnames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:40

___

### monthsShort

▸ **monthsShort**(): [*MonthNames*](date._dayjs.md#monthnames)

**Returns:** [*MonthNames*](date._dayjs.md#monthnames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:39

___

### unix

▸ **unix**(`t`: *number*): [*Dayjs*](../classes/date._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`t` | *number* |

**Returns:** [*Dayjs*](../classes/date._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:413

___

### utc

▸ **utc**(`config?`: [*ConfigType*](date._dayjs.md#configtype), `format?`: *string*): [*Dayjs*](../classes/date._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config?` | [*ConfigType*](date._dayjs.md#configtype) |
`format?` | *string* |

**Returns:** [*Dayjs*](../classes/date._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/utc.d.ts:18

___

### weekdays

▸ **weekdays**(`localOrder?`: *boolean*): [*WeekdayNames*](date._dayjs.md#weekdaynames)

#### Parameters:

Name | Type |
:------ | :------ |
`localOrder?` | *boolean* |

**Returns:** [*WeekdayNames*](date._dayjs.md#weekdaynames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:36

___

### weekdaysMin

▸ **weekdaysMin**(`localOrder?`: *boolean*): [*WeekdayNames*](date._dayjs.md#weekdaynames)

#### Parameters:

Name | Type |
:------ | :------ |
`localOrder?` | *boolean* |

**Returns:** [*WeekdayNames*](date._dayjs.md#weekdaynames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:38

___

### weekdaysShort

▸ **weekdaysShort**(`localOrder?`: *boolean*): [*WeekdayNames*](date._dayjs.md#weekdaynames)

#### Parameters:

Name | Type |
:------ | :------ |
`localOrder?` | *boolean* |

**Returns:** [*WeekdayNames*](date._dayjs.md#weekdaynames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:37
