[did-client - v0.11.2](../README.md) / [Components](../modules/components.md) / BaseFilter

# Class: BaseFilter

[Components](../modules/components.md).BaseFilter

## Hierarchy

* **BaseFilter**

  ↳ [*CustomerFilter*](components.customerfilter.md)

  ↳ [*MonthFilter*](components.monthfilter.md)

  ↳ [*ProjectFilter*](components.projectfilter.md)

  ↳ [*ResourceFilter*](components.resourcefilter.md)

  ↳ [*WeekFilter*](components.weekfilter.md)

  ↳ [*YearFilter*](components.yearfilter.md)

## Table of contents

### Constructors

- [constructor](components.basefilter.md#constructor)

### Properties

- [keyFieldName](components.basefilter.md#keyfieldname)
- [name](components.basefilter.md#name)
- [selectedKeys](components.basefilter.md#selectedkeys)
- [valueFieldName](components.basefilter.md#valuefieldname)

### Methods

- [fromColumn](components.basefilter.md#fromcolumn)
- [initialize](components.basefilter.md#initialize)
- [setDefaults](components.basefilter.md#setdefaults)

## Constructors

### constructor

\+ **new BaseFilter**(`name?`: *string*, `keyFieldName?`: *string*, `valueFieldName?`: *string*): [*BaseFilter*](components.basefilter.md)

Constructor for `BaseFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name?` | *string* | Filter name   |
`keyFieldName?` | *string* | Field name for the item key   |
`valueFieldName?` | *string* | Field name for the item value    |

**Returns:** [*BaseFilter*](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L11)

## Properties

### keyFieldName

• `Optional` **keyFieldName**: *string*

___

### name

• `Optional` **name**: *string*

___

### selectedKeys

• **selectedKeys**: *string*[]

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L11)

___

### valueFieldName

• `Optional` **valueFieldName**: *string*

## Methods

### fromColumn

▸ **fromColumn**(`column`: IColumn): [*BaseFilter*](components.basefilter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`column` | IColumn |

**Returns:** [*BaseFilter*](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L28)

___

### initialize

▸ **initialize**(`filterItems`: [*IFilterItem*](../interfaces/components.ifilteritem.md)[]): [*IFilter*](../interfaces/components.ifilter.md)

Initializes the filter returning `IFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`filterItems` | [*IFilterItem*](../interfaces/components.ifilteritem.md)[] | Filter items   |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

`IFilter`

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L41)

___

### setDefaults

▸ **setDefaults**(`values`: *any*): [*BaseFilter*](components.basefilter.md)

Set defaults (`selectedKeys`) for the filter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | *any* | Values   |

**Returns:** [*BaseFilter*](components.basefilter.md)

this

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:58](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L58)
