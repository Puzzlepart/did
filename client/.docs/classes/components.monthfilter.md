[did-client - v0.11.2](../README.md) / [Components](../modules/components.md) / MonthFilter

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

Defined in: [client/components/FilterPanel/Filters/MonthFilter.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/MonthFilter.ts#L11)

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

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L10)

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

Defined in: [client/components/FilterPanel/Filters/MonthFilter.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/MonthFilter.ts#L27)

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

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:50](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L50)
