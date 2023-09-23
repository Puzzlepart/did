[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / YearFilter

# Class: YearFilter

[Components](../modules/components.md).YearFilter

## Hierarchy

* [*BaseFilter*](components.basefilter.md)

  ↳ **YearFilter**

## Table of contents

### Constructors

- [constructor](components.yearfilter.md#constructor)

### Properties

- [keyFieldName](components.yearfilter.md#keyfieldname)
- [name](components.yearfilter.md#name)
- [selectedKeys](components.yearfilter.md#selectedkeys)
- [valueFieldName](components.yearfilter.md#valuefieldname)

### Methods

- [fromColumn](components.yearfilter.md#fromcolumn)
- [initialize](components.yearfilter.md#initialize)
- [setDefaults](components.yearfilter.md#setdefaults)

## Constructors

### constructor

\+ **new YearFilter**(`name`: *string*, `keyFieldName`: *string*): [*YearFilter*](components.yearfilter.md)

Constructor for `YearFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Filter name   |
`keyFieldName` | *string* | Field name for the item key    |

**Returns:** [*YearFilter*](components.yearfilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/YearFilter.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/YearFilter.ts#L9)

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

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L11)

___

### valueFieldName

• `Optional` **valueFieldName**: *string*

Inherited from: [BaseFilter](components.basefilter.md).[valueFieldName](components.basefilter.md#valuefieldname)

## Methods

### fromColumn

▸ **fromColumn**(`column`: IColumn): [*YearFilter*](components.yearfilter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`column` | IColumn |

**Returns:** [*YearFilter*](components.yearfilter.md)

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L28)

___

### initialize

▸ **initialize**(`items`: *any*[]): [*IFilter*](../interfaces/components.ifilter.md)

Intialize the `YearFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | *any*[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/YearFilter.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/YearFilter.ts#L25)

___

### setDefaults

▸ **setDefaults**(`values`: *any*): [*YearFilter*](components.yearfilter.md)

Set defaults (`selectedKeys`) for the filter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | *any* | Values   |

**Returns:** [*YearFilter*](components.yearfilter.md)

this

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:58](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L58)
