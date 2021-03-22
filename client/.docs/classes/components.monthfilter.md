[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / MonthFilter

# Class: MonthFilter

[Components](../modules/components.md).MonthFilter

## Hierarchy

* [*BaseFilter*](components.basefilter.md)

  ↳ **MonthFilter**

## Table of contents

### Constructors

- [constructor](components.monthfilter.md#constructor)

### Properties

- [keyFieldName](components.monthfilter.md#keyfieldname)
- [name](components.monthfilter.md#name)
- [selectedKeys](components.monthfilter.md#selectedkeys)
- [valueFieldName](components.monthfilter.md#valuefieldname)

### Methods

- [initialize](components.monthfilter.md#initialize)
- [setDefaults](components.monthfilter.md#setdefaults)

## Constructors

### constructor

\+ **new MonthFilter**(`name`: *string*, `keyFieldName`: *string*): [*MonthFilter*](components.monthfilter.md)

Constructor for `MonthFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name   |
`keyFieldName` | *string* | Field name for the item key    |

**Returns:** [*MonthFilter*](components.monthfilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/MonthFilter.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/MonthFilter.ts#L12)

## Properties

### keyFieldName

• **keyFieldName**: *string*

Inherited from: [BaseFilter](components.basefilter.md).[keyFieldName](components.basefilter.md#keyfieldname)

___

### name

• **name**: *string*

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

### initialize

▸ **initialize**(`items`: *any*[]): [*IFilter*](../interfaces/components.ifilter.md)

Intialize the `MonthFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | *any*[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/MonthFilter.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/MonthFilter.ts#L28)

___

### setDefaults

▸ **setDefaults**(`values`: *any*): [*MonthFilter*](components.monthfilter.md)

Set defaults (`selectedKeys`) for the filter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | *any* | Values   |

**Returns:** [*MonthFilter*](components.monthfilter.md)

this

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/BaseFilter.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L51)
