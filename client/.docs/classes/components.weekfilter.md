[did-client - v0.9.9](../README.md) / [Components](../modules/components.md) / WeekFilter

# Class: WeekFilter<ItemType, KeyType\>

[Components](../modules/components.md).WeekFilter

## Type parameters

Name | Default |
:------ | :------ |
`ItemType` | *any* |
`KeyType` | *any* |

## Hierarchy

* [*BaseFilter*](components.basefilter.md)<ItemType\>

  ↳ **WeekFilter**

## Table of contents

### Constructors

- [constructor](components.weekfilter.md#constructor)

### Properties

- [\_selectedKeys](components.weekfilter.md#_selectedkeys)
- [fieldName](components.weekfilter.md#fieldname)
- [name](components.weekfilter.md#name)

### Methods

- [initialize](components.weekfilter.md#initialize)
- [setDefaults](components.weekfilter.md#setdefaults)

## Constructors

### constructor

\+ **new WeekFilter**<ItemType, KeyType\>(`fieldName`: *string*, `name`: *string*): [*WeekFilter*](components.weekfilter.md)<ItemType, KeyType\>

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

**Returns:** [*WeekFilter*](components.weekfilter.md)<ItemType, KeyType\>

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/WeekFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/WeekFilter.ts#L13)

## Properties

### \_selectedKeys

• `Private` **\_selectedKeys**: KeyType[]

Defined in: [client/components/FilterPanel/Filters/WeekFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/WeekFilter.ts#L13)

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

Intialize the WeekFilter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | ItemType[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/WeekFilter.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/WeekFilter.ts#L24)

___

### setDefaults

▸ **setDefaults**(`values`: { [key: string]: KeyType[];  }): [*WeekFilter*](components.weekfilter.md)<ItemType, KeyType\>

#### Parameters:

Name | Type |
:------ | :------ |
`values` | *object* |

**Returns:** [*WeekFilter*](components.weekfilter.md)<ItemType, KeyType\>

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/WeekFilter.ts:42](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/WeekFilter.ts#L42)
