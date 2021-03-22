[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / WeekFilter

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

Defined in: [components/FilterPanel/Filters/WeekFilter.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/WeekFilter.ts#L11)

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

Intialize the `WeekFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | *any*[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/WeekFilter.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/WeekFilter.ts#L27)

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

Defined in: [components/FilterPanel/Filters/BaseFilter.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L51)
