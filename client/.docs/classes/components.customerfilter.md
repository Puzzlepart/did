[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / CustomerFilter

# Class: CustomerFilter

[Components](../modules/components.md).CustomerFilter

## Hierarchy

* [*BaseFilter*](components.basefilter.md)

  ↳ **CustomerFilter**

## Table of contents

### Constructors

- [constructor](components.customerfilter.md#constructor)

### Properties

- [keyFieldName](components.customerfilter.md#keyfieldname)
- [name](components.customerfilter.md#name)
- [selectedKeys](components.customerfilter.md#selectedkeys)
- [valueFieldName](components.customerfilter.md#valuefieldname)

### Methods

- [initialize](components.customerfilter.md#initialize)
- [setDefaults](components.customerfilter.md#setdefaults)

## Constructors

### constructor

\+ **new CustomerFilter**(`name`: *string*, `keyFieldName`: *string*, `valueFieldName`: *string*): [*CustomerFilter*](components.customerfilter.md)

Constructor for `CustomerFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name   |
`keyFieldName` | *string* | Field name for the item key   |
`valueFieldName` | *string* | Field name for the item value    |

**Returns:** [*CustomerFilter*](components.customerfilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/CustomerFilter.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/CustomerFilter.ts#L11)

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

Intialize the `CustomerFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | *any*[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/CustomerFilter.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/CustomerFilter.ts#L28)

___

### setDefaults

▸ **setDefaults**(`values`: *any*): [*CustomerFilter*](components.customerfilter.md)

Set defaults (`selectedKeys`) for the filter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | *any* | Values   |

**Returns:** [*CustomerFilter*](components.customerfilter.md)

this

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [components/FilterPanel/Filters/BaseFilter.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L51)
