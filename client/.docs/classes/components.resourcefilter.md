[did-client - v0.11.3](../README.md) / [Components](../modules/components.md) / ResourceFilter

# Class: ResourceFilter

[Components](../modules/components.md).ResourceFilter

## Hierarchy

* [*BaseFilter*](components.basefilter.md)

  ↳ **ResourceFilter**

## Table of contents

### Constructors

- [constructor](components.resourcefilter.md#constructor)

### Properties

- [keyFieldName](components.resourcefilter.md#keyfieldname)
- [name](components.resourcefilter.md#name)
- [selectedKeys](components.resourcefilter.md#selectedkeys)
- [valueFieldName](components.resourcefilter.md#valuefieldname)

### Methods

- [fromColumn](components.resourcefilter.md#fromcolumn)
- [initialize](components.resourcefilter.md#initialize)
- [setDefaults](components.resourcefilter.md#setdefaults)

## Constructors

### constructor

\+ **new ResourceFilter**(`name`: *string*, `keyFieldName`: *string*, `valueFieldName`: *string*): [*ResourceFilter*](components.resourcefilter.md)

Constructor for `ResourceFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Filter name   |
`keyFieldName` | *string* | Field name for the item key   |
`valueFieldName` | *string* | Field name for the item value    |

**Returns:** [*ResourceFilter*](components.resourcefilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ResourceFilter.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ResourceFilter.ts#L10)

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

▸ **fromColumn**(`column`: IColumn): [*ResourceFilter*](components.resourcefilter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`column` | IColumn |

**Returns:** [*ResourceFilter*](components.resourcefilter.md)

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L28)

___

### initialize

▸ **initialize**(`items`: *any*[]): [*IFilter*](../interfaces/components.ifilter.md)

Intialize the `ResourceFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | *any*[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ResourceFilter.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ResourceFilter.ts#L27)

___

### setDefaults

▸ **setDefaults**(`values`: *any*): [*ResourceFilter*](components.resourcefilter.md)

Set defaults (`selectedKeys`) for the filter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | *any* | Values   |

**Returns:** [*ResourceFilter*](components.resourcefilter.md)

this

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:58](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L58)
