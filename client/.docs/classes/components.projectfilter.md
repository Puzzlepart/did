[did-client - v0.11.1](../README.md) / [Components](../modules/components.md) / ProjectFilter

# Class: ProjectFilter

[Components](../modules/components.md).ProjectFilter

## Hierarchy

* [*BaseFilter*](components.basefilter.md)

  ↳ **ProjectFilter**

## Table of contents

### Constructors

- [constructor](components.projectfilter.md#constructor)

### Properties

- [keyFieldName](components.projectfilter.md#keyfieldname)
- [name](components.projectfilter.md#name)
- [selectedKeys](components.projectfilter.md#selectedkeys)
- [valueFieldName](components.projectfilter.md#valuefieldname)

### Methods

- [initialize](components.projectfilter.md#initialize)
- [setDefaults](components.projectfilter.md#setdefaults)

## Constructors

### constructor

\+ **new ProjectFilter**(`name`: *string*, `keyFieldName`: *string*, `valueFieldName`: *string*): [*ProjectFilter*](components.projectfilter.md)

Constructor for `ProjectFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name   |
`keyFieldName` | *string* | Field name for the item key   |
`valueFieldName` | *string* | Field name for the item value    |

**Returns:** [*ProjectFilter*](components.projectfilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ProjectFilter.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ProjectFilter.ts#L10)

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

Intialize the `ProjectFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | *any*[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ProjectFilter.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ProjectFilter.ts#L27)

___

### setDefaults

▸ **setDefaults**(`values`: *any*): [*ProjectFilter*](components.projectfilter.md)

Set defaults (`selectedKeys`) for the filter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | *any* | Values   |

**Returns:** [*ProjectFilter*](components.projectfilter.md)

this

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:50](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L50)
