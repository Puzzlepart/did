[did-client - v0.9.9](../README.md) / [Components](../modules/components.md) / MonthFilter

# Class: MonthFilter<ItemType, KeyType\>

[Components](../modules/components.md).MonthFilter

## Type parameters

Name | Default |
:------ | :------ |
`ItemType` | *any* |
`KeyType` | *any* |

## Hierarchy

* [*BaseFilter*](components.basefilter.md)<ItemType\>

  ↳ **MonthFilter**

## Table of contents

### Constructors

- [constructor](components.monthfilter.md#constructor)

### Properties

- [\_selectedKeys](components.monthfilter.md#_selectedkeys)
- [fieldName](components.monthfilter.md#fieldname)
- [name](components.monthfilter.md#name)

### Methods

- [initialize](components.monthfilter.md#initialize)
- [setDefaults](components.monthfilter.md#setdefaults)

## Constructors

### constructor

\+ **new MonthFilter**<ItemType, KeyType\>(`fieldName`: *string*, `name`: *string*): [*MonthFilter*](components.monthfilter.md)<ItemType, KeyType\>

#### Type parameters:

Name | Default |
:------ | :------ |
`ItemType` | *any* |
`KeyType` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`fieldName` | *string* |
`name` | *string* |

**Returns:** [*MonthFilter*](components.monthfilter.md)<ItemType, KeyType\>

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/MonthFilter.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/MonthFilter.ts#L14)

## Properties

### \_selectedKeys

• `Private` **\_selectedKeys**: KeyType[]

Defined in: [client/components/FilterPanel/Filters/MonthFilter.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/MonthFilter.ts#L14)

___

### fieldName

• **fieldName**: *string*

Inherited from: [BaseFilter](components.basefilter.md).[fieldName](components.basefilter.md#fieldname)

___

### name

• **name**: *string*

Inherited from: [BaseFilter](components.basefilter.md).[name](components.basefilter.md#name)

## Methods

### initialize

▸ **initialize**(`items`: ItemType[]): [*IFilter*](../interfaces/components.ifilter.md)

Intialize the MonthFilter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | ItemType[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/MonthFilter.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/MonthFilter.ts#L25)

___

### setDefaults

▸ **setDefaults**(`values`: { [key: string]: KeyType[];  }): [*MonthFilter*](components.monthfilter.md)<ItemType, KeyType\>

#### Parameters:

Name | Type |
:------ | :------ |
`values` | *object* |

**Returns:** [*MonthFilter*](components.monthfilter.md)<ItemType, KeyType\>

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/MonthFilter.ts:43](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/MonthFilter.ts#L43)
