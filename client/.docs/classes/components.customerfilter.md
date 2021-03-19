[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / CustomerFilter

# Class: CustomerFilter<ItemType, KeyType\>

[Components](../modules/components.md).CustomerFilter

## Type parameters

Name | Default |
:------ | :------ |
`ItemType` | *any* |
`KeyType` | *any* |

## Hierarchy

* [*BaseFilter*](components.basefilter.md)<ItemType\>

  ↳ **CustomerFilter**

## Table of contents

### Constructors

- [constructor](components.customerfilter.md#constructor)

### Properties

- [\_selectedKeys](components.customerfilter.md#_selectedkeys)
- [fieldName](components.customerfilter.md#fieldname)
- [name](components.customerfilter.md#name)

### Methods

- [initialize](components.customerfilter.md#initialize)
- [setDefaults](components.customerfilter.md#setdefaults)

## Constructors

### constructor

\+ **new CustomerFilter**<ItemType, KeyType\>(`fieldName`: *string*, `name`: *string*): [*CustomerFilter*](components.customerfilter.md)<ItemType, KeyType\>

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

**Returns:** [*CustomerFilter*](components.customerfilter.md)<ItemType, KeyType\>

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/CustomerFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/CustomerFilter.ts#L13)

## Properties

### \_selectedKeys

• `Private` **\_selectedKeys**: KeyType[]

Defined in: [client/components/FilterPanel/Filters/CustomerFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/CustomerFilter.ts#L13)

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

Intialize the CustomerFilter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | ItemType[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/CustomerFilter.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/CustomerFilter.ts#L24)

___

### setDefaults

▸ **setDefaults**(`values`: { [key: string]: KeyType[];  }): [*CustomerFilter*](components.customerfilter.md)<ItemType, KeyType\>

#### Parameters:

Name | Type |
:------ | :------ |
`values` | *object* |

**Returns:** [*CustomerFilter*](components.customerfilter.md)<ItemType, KeyType\>

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/CustomerFilter.ts:42](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/CustomerFilter.ts#L42)
