[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / YearFilter

# Class: YearFilter<ItemType, KeyType\>

[Components](../modules/components.md).YearFilter

## Type parameters

Name | Default |
:------ | :------ |
`ItemType` | *any* |
`KeyType` | *any* |

## Hierarchy

* [*BaseFilter*](components.basefilter.md)<ItemType\>

  ↳ **YearFilter**

## Table of contents

### Constructors

- [constructor](components.yearfilter.md#constructor)

### Properties

- [\_selectedKeys](components.yearfilter.md#_selectedkeys)
- [fieldName](components.yearfilter.md#fieldname)
- [name](components.yearfilter.md#name)

### Methods

- [initialize](components.yearfilter.md#initialize)
- [setDefaults](components.yearfilter.md#setdefaults)

## Constructors

### constructor

\+ **new YearFilter**<ItemType, KeyType\>(`fieldName`: *string*, `name`: *string*): [*YearFilter*](components.yearfilter.md)<ItemType, KeyType\>

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

**Returns:** [*YearFilter*](components.yearfilter.md)<ItemType, KeyType\>

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/YearFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/YearFilter.ts#L13)

## Properties

### \_selectedKeys

• `Private` **\_selectedKeys**: KeyType[]

Defined in: [client/components/FilterPanel/Filters/YearFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/YearFilter.ts#L13)

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

Intialize the YearFilter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | ItemType[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/YearFilter.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/YearFilter.ts#L24)

___

### setDefaults

▸ **setDefaults**(`values`: { [key: string]: KeyType[];  }): [*YearFilter*](components.yearfilter.md)<ItemType, KeyType\>

#### Parameters:

Name | Type |
:------ | :------ |
`values` | *object* |

**Returns:** [*YearFilter*](components.yearfilter.md)<ItemType, KeyType\>

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/YearFilter.ts:42](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/YearFilter.ts#L42)
