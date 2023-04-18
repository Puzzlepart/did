[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / WeekFilter

# Class: WeekFilter

[Components](../modules/components.md).WeekFilter

## Hierarchy

* [*BaseFilter*](components.basefilter.md)

  ↳ **WeekFilter**

## Table of contents

### Constructors

- [constructor](components.weekfilter.md#constructor)

### Properties

- [keyFieldName](components.weekfilter.md#keyfieldname)
- [name](components.weekfilter.md#name)
- [selectedKeys](components.weekfilter.md#selectedkeys)
- [valueFieldName](components.weekfilter.md#valuefieldname)

### Methods

- [fromColumn](components.weekfilter.md#fromcolumn)
- [initialize](components.weekfilter.md#initialize)
- [setDefaults](components.weekfilter.md#setdefaults)

## Constructors

### constructor

\+ **new WeekFilter**(`name`: *string*, `keyFieldName`: *string*): [*WeekFilter*](components.weekfilter.md)

Constructor for `WeekFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name   |
`keyFieldName` | *string* | Field name for the item key    |

**Returns:** [*WeekFilter*](components.weekfilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/WeekFilter.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/WeekFilter.ts#L10)

## Properties

### keyFieldName

• `Optional` **keyFieldName**: *string*

Inherited from: [BaseFilter](components.basefilter.md).[keyFieldName](components.basefilter.md#keyfieldname)

___

### name

• `Optional` **name**: *string*

Inherited from: [BaseFilter](components.basefilter.md).[name](components.basefilter.md#name)

___

### selectedKeys

• **selectedKeys**: *string*[]

Inherited from: [BaseFilter](components.basefilter.md).[selectedKeys](components.basefilter.md#selectedkeys)

Defined in: [components/FilterPanel/Filters/BaseFilter.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L11)

___

### valueFieldName

• `Optional` **valueFieldName**: *string*

Inherited from: [BaseFilter](components.basefilter.md).[valueFieldName](components.basefilter.md#valuefieldname)

## Methods

### fromColumn

▸ **fromColumn**(`column`: IColumn): [*WeekFilter*](components.weekfilter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`column` | IColumn |

**Returns:** [*WeekFilter*](components.weekfilter.md)

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/BaseFilter.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L28)

___

### initialize

▸ **initialize**(`items`: *any*[]): [*IFilter*](../interfaces/components.ifilter.md)

Intialize the `WeekFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | *any*[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/WeekFilter.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/WeekFilter.ts#L26)

___

### setDefaults

▸ **setDefaults**(`values`: *any*): [*WeekFilter*](components.weekfilter.md)

Set defaults (`selectedKeys`) for the filter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | *any* | Values   |

**Returns:** [*WeekFilter*](components.weekfilter.md)

this

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/BaseFilter.ts:58](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L58)
