[did-shared - v0.9.11](../README.md) / [DateUtils](dateutils.md) / %24dayjs

# Namespace: $dayjs

[DateUtils](dateutils.md).$dayjs

## Table of contents

### Classes

- [Dayjs](../classes/dateutils._dayjs.dayjs.md)

### Interfaces

- [DayjsTimezone](../interfaces/dateutils._dayjs.dayjstimezone.md)
- [GlobalLocaleDataReturn](../interfaces/dateutils._dayjs.globallocaledatareturn.md)
- [InstanceLocaleDataReturn](../interfaces/dateutils._dayjs.instancelocaledatareturn.md)

### Type aliases

- [ConfigType](dateutils._dayjs.md#configtype)
- [MonthNames](dateutils._dayjs.md#monthnames)
- [OpUnitType](dateutils._dayjs.md#opunittype)
- [OptionType](dateutils._dayjs.md#optiontype)
- [PluginFunc](dateutils._dayjs.md#pluginfunc)
- [QUnitType](dateutils._dayjs.md#qunittype)
- [UnitType](dateutils._dayjs.md#unittype)
- [UnitTypeShort](dateutils._dayjs.md#unittypeshort)
- [WeekdayNames](dateutils._dayjs.md#weekdaynames)

### Variables

- [Ls](dateutils._dayjs.md#ls)
- [tz](dateutils._dayjs.md#tz)

### Functions

- [duration](dateutils._dayjs.md#duration)
- [extend](dateutils._dayjs.md#extend)
- [isDayjs](dateutils._dayjs.md#isdayjs)
- [isDuration](dateutils._dayjs.md#isduration)
- [locale](dateutils._dayjs.md#locale)
- [localeData](dateutils._dayjs.md#localedata)
- [months](dateutils._dayjs.md#months)
- [monthsShort](dateutils._dayjs.md#monthsshort)
- [unix](dateutils._dayjs.md#unix)
- [utc](dateutils._dayjs.md#utc)
- [weekdays](dateutils._dayjs.md#weekdays)
- [weekdaysMin](dateutils._dayjs.md#weekdaysmin)
- [weekdaysShort](dateutils._dayjs.md#weekdaysshort)

## Type aliases

### ConfigType

Ƭ **ConfigType**: *string* \| *number* \| Date \| [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:12

___

### MonthNames

Ƭ **MonthNames**: [*string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*]

Defined in: node_modules/dayjs/plugin/localeData.d.ts:8

___

### OpUnitType

Ƭ **OpUnitType**: [*UnitType*](dateutils._dayjs.md#unittype) \| *week* \| *w*

Defined in: node_modules/dayjs/index.d.ts:19

___

### OptionType

Ƭ **OptionType**: { `format?`: *string* ; `locale?`: *string* ; `utc?`: *boolean*  } \| *string* \| *string*[]

Defined in: node_modules/dayjs/index.d.ts:14

___

### PluginFunc

Ƭ **PluginFunc**<T\>: (`option`: T, `c`: *typeof* [*Dayjs*](../classes/dateutils._dayjs.dayjs.md), `d`: *typeof* [*$dayjs*](dateutils.md#$dayjs)) => *void*

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *unknown* |

#### Type declaration:

▸ (`option`: T, `c`: *typeof* [*Dayjs*](../classes/dateutils._dayjs.dayjs.md), `d`: *typeof* [*$dayjs*](dateutils.md#$dayjs)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`option` | T |
`c` | *typeof* [*Dayjs*](../classes/dateutils._dayjs.dayjs.md) |
`d` | *typeof* [*$dayjs*](dateutils.md#$dayjs) |

**Returns:** *void*

Defined in: node_modules/dayjs/index.d.ts:405

___

### QUnitType

Ƭ **QUnitType**: [*UnitType*](dateutils._dayjs.md#unittype) \| *quarter* \| *Q*

Defined in: node_modules/dayjs/index.d.ts:20

___

### UnitType

Ƭ **UnitType**: *millisecond* \| *second* \| *minute* \| *hour* \| *day* \| *month* \| *year* \| *date* \| [*UnitTypeShort*](dateutils._dayjs.md#unittypeshort)

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

• `Const` **tz**: [*DayjsTimezone*](../interfaces/dateutils._dayjs.dayjstimezone.md)

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

▸ **extend**<T\>(`plugin`: [*PluginFunc*](dateutils._dayjs.md#pluginfunc)<T\>, `option?`: T): [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *unknown* |

#### Parameters:

Name | Type |
:------ | :------ |
`plugin` | [*PluginFunc*](dateutils._dayjs.md#pluginfunc)<T\> |
`option?` | T |

**Returns:** [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

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

▸ **localeData**(): [*GlobalLocaleDataReturn*](../interfaces/dateutils._dayjs.globallocaledatareturn.md)

**Returns:** [*GlobalLocaleDataReturn*](../interfaces/dateutils._dayjs.globallocaledatareturn.md)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:41

___

### months

▸ **months**(): [*MonthNames*](dateutils._dayjs.md#monthnames)

**Returns:** [*MonthNames*](dateutils._dayjs.md#monthnames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:40

___

### monthsShort

▸ **monthsShort**(): [*MonthNames*](dateutils._dayjs.md#monthnames)

**Returns:** [*MonthNames*](dateutils._dayjs.md#monthnames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:39

___

### unix

▸ **unix**(`t`: *number*): [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`t` | *number* |

**Returns:** [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:413

___

### utc

▸ **utc**(`config?`: [*ConfigType*](dateutils._dayjs.md#configtype), `format?`: *string*): [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config?` | [*ConfigType*](dateutils._dayjs.md#configtype) |
`format?` | *string* |

**Returns:** [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/plugin/utc.d.ts:18

___

### weekdays

▸ **weekdays**(`localOrder?`: *boolean*): [*WeekdayNames*](dateutils._dayjs.md#weekdaynames)

#### Parameters:

Name | Type |
:------ | :------ |
`localOrder?` | *boolean* |

**Returns:** [*WeekdayNames*](dateutils._dayjs.md#weekdaynames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:36

___

### weekdaysMin

▸ **weekdaysMin**(`localOrder?`: *boolean*): [*WeekdayNames*](dateutils._dayjs.md#weekdaynames)

#### Parameters:

Name | Type |
:------ | :------ |
`localOrder?` | *boolean* |

**Returns:** [*WeekdayNames*](dateutils._dayjs.md#weekdaynames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:38

___

### weekdaysShort

▸ **weekdaysShort**(`localOrder?`: *boolean*): [*WeekdayNames*](dateutils._dayjs.md#weekdaynames)

#### Parameters:

Name | Type |
:------ | :------ |
`localOrder?` | *boolean* |

**Returns:** [*WeekdayNames*](dateutils._dayjs.md#weekdaynames)

Defined in: node_modules/dayjs/plugin/localeData.d.ts:37
