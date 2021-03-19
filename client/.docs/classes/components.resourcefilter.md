[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / ResourceFilter

# Class: ResourceFilter<ItemType, KeyType\>

[Components](../modules/components.md).ResourceFilter

## Type parameters

Name | Default |
:------ | :------ |
`ItemType` | *any* |
`KeyType` | *any* |

## Hierarchy

* [*BaseFilter*](components.basefilter.md)<ItemType\>

  ↳ **ResourceFilter**

## Table of contents

### Constructors

- [constructor](components.resourcefilter.md#constructor)

### Properties

- [\_selectedKeys](components.resourcefilter.md#_selectedkeys)
- [fieldName](components.resourcefilter.md#fieldname)
- [keyFieldName](components.resourcefilter.md#keyfieldname)
- [name](components.resourcefilter.md#name)
- [valueFieldName](components.resourcefilter.md#valuefieldname)

### Methods

- [initialize](components.resourcefilter.md#initialize)
- [setDefaults](components.resourcefilter.md#setdefaults)

## Constructors

### constructor

\+ **new ResourceFilter**<ItemType, KeyType\>(`keyFieldName`: *string*, `valueFieldName`: *string*, `name`: *string*): [*ResourceFilter*](components.resourcefilter.md)<ItemType, KeyType\>

Constructor

#### Type parameters:

Name | Default |
:------ | :------ |
`ItemType` | *any* |
`KeyType` | *any* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`keyFieldName` | *string* | Field name for the item key   |
`valueFieldName` | *string* | Field name for the item value   |
`name` | *string* | Filter name    |

**Returns:** [*ResourceFilter*](components.resourcefilter.md)<ItemType, KeyType\>

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ResourceFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ResourceFilter.ts#L13)

## Properties

### \_selectedKeys

• `Private` **\_selectedKeys**: KeyType[]

Defined in: [client/components/FilterPanel/Filters/ResourceFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ResourceFilter.ts#L13)

___

### fieldName

• **fieldName**: *string*

Inherited from: [BaseFilter](components.basefilter.md).[fieldName](components.basefilter.md#fieldname)

___

### keyFieldName

• **keyFieldName**: *string*

___

### name

• **name**: *string*

Inherited from: [BaseFilter](components.basefilter.md).[name](components.basefilter.md#name)

___

### valueFieldName

• **valueFieldName**: *string*

## Methods

### initialize

▸ **initialize**(`items_`: ItemType[]): [*IFilter*](../interfaces/components.ifilter.md)

Intialize the `ResourceFilter`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items_` | ItemType[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ResourceFilter.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ResourceFilter.ts#L35)

___

### setDefaults

▸ **setDefaults**(`values`: { [key: string]: KeyType[];  }): [*ResourceFilter*](components.resourcefilter.md)<ItemType, KeyType\>

#### Parameters:

Name | Type |
:------ | :------ |
`values` | *object* |

**Returns:** [*ResourceFilter*](components.resourcefilter.md)<ItemType, KeyType\>

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ResourceFilter.ts:55](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ResourceFilter.ts#L55)
