[did-shared - v0.9.10](../README.md) / DateUtils

# Module: DateUtils

Shared date utilities used by both
the client and the server.

## Table of contents

### Namespaces

- [$dayjs](dateutils._dayjs.md)

### Classes

- [DateObject](../classes/dateutils.dateobject.md)
- [DateUtils](../classes/dateutils.dateutils-1.md)

### Interfaces

- [IDateUtils](../interfaces/dateutils.idateutils.md)

### Type aliases

- [DateInput](dateutils.md#dateinput)
- [DateWithTimezone](dateutils.md#datewithtimezone)
- [TimeSpanStringOptions](dateutils.md#timespanstringoptions)

### Properties

- [default](dateutils.md#default)

### Functions

- [$dayjs](dateutils.md#$dayjs)

## Type aliases

### DateInput

Ƭ **DateInput**: [*ConfigType*](dateutils._dayjs.md#configtype)

Defined in: [shared/utils/date.ts:27](https://github.com/Puzzlepart/did/blob/dev/shared/utils/date.ts#L27)

___

### DateWithTimezone

Ƭ **DateWithTimezone**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`dateTime`? | *string* |
`timeZone`? | *string* |

Defined in: [shared/utils/types.ts:27](https://github.com/Puzzlepart/did/blob/dev/shared/utils/types.ts#L27)

___

### TimeSpanStringOptions

Ƭ **TimeSpanStringOptions**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`dayFormat`? | *string* |
`endDate`? | [*DateObject*](../classes/dateutils.dateobject.md) |
`includeMonth`? | *object* |
`includeMonth.endDate`? | *boolean* |
`includeMonth.startDate`? | *boolean* |
`includeTime`? | *string* |
`monthFormat`? | *string* |
`startDate`? | [*DateObject*](../classes/dateutils.dateobject.md) |
`week`? | *number* |
`year`? | *number* |
`yearFormat`? | *string* |

Defined in: [shared/utils/types.ts:32](https://github.com/Puzzlepart/did/blob/dev/shared/utils/types.ts#L32)

## Properties

### default

• **default**: [*DateUtils*](../classes/dateutils.dateutils-1.md)

## Functions

### $dayjs

▸ **$dayjs**(`date?`: [*ConfigType*](dateutils._dayjs.md#configtype)): [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`date?` | [*ConfigType*](dateutils._dayjs.md#configtype) |

**Returns:** [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:5

▸ **$dayjs**(`date?`: [*ConfigType*](dateutils._dayjs.md#configtype), `format?`: [*OptionType*](dateutils._dayjs.md#optiontype), `strict?`: *boolean*): [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`date?` | [*ConfigType*](dateutils._dayjs.md#configtype) |
`format?` | [*OptionType*](dateutils._dayjs.md#optiontype) |
`strict?` | *boolean* |

**Returns:** [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:7

▸ **$dayjs**(`date?`: [*ConfigType*](dateutils._dayjs.md#configtype), `format?`: [*OptionType*](dateutils._dayjs.md#optiontype), `locale?`: *string*, `strict?`: *boolean*): [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`date?` | [*ConfigType*](dateutils._dayjs.md#configtype) |
`format?` | [*OptionType*](dateutils._dayjs.md#optiontype) |
`locale?` | *string* |
`strict?` | *boolean* |

**Returns:** [*Dayjs*](../classes/dateutils._dayjs.dayjs.md)

Defined in: node_modules/dayjs/index.d.ts:9
