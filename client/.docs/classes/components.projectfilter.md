[did-client - v0.9.8](../README.md) / [Components](../modules/components.md) / ProjectFilter

# Class: ProjectFilter<ItemType, KeyType\>

[Components](../modules/components.md).ProjectFilter

## Type parameters

Name | Default |
:------ | :------ |
`ItemType` | *any* |
`KeyType` | *any* |

## Hierarchy

* [*BaseFilter*](components.basefilter.md)<ItemType\>

  ↳ **ProjectFilter**

## Table of contents

### Constructors

- [constructor](components.projectfilter.md#constructor)

### Properties

- [\_selectedKeys](components.projectfilter.md#_selectedkeys)
- [fieldName](components.projectfilter.md#fieldname)
- [name](components.projectfilter.md#name)

### Methods

- [initialize](components.projectfilter.md#initialize)
- [setDefaults](components.projectfilter.md#setdefaults)

## Constructors

### constructor

\+ **new ProjectFilter**<ItemType, KeyType\>(`fieldName`: *string*, `name`: *string*): [*ProjectFilter*](components.projectfilter.md)<ItemType, KeyType\>

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

**Returns:** [*ProjectFilter*](components.projectfilter.md)<ItemType, KeyType\>

Inherited from: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ProjectFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ProjectFilter.ts#L13)

## Properties

### \_selectedKeys

• `Private` **\_selectedKeys**: KeyType[]

Defined in: [client/components/FilterPanel/Filters/ProjectFilter.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ProjectFilter.ts#L13)

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

Intialize the ProjectFilter

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`items` | ItemType[] | Items    |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ProjectFilter.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ProjectFilter.ts#L24)

___

### setDefaults

▸ **setDefaults**(`values`: { [key: string]: KeyType[];  }): [*ProjectFilter*](components.projectfilter.md)<ItemType, KeyType\>

#### Parameters:

Name | Type |
:------ | :------ |
`values` | *object* |

**Returns:** [*ProjectFilter*](components.projectfilter.md)<ItemType, KeyType\>

Overrides: [BaseFilter](components.basefilter.md)

Defined in: [client/components/FilterPanel/Filters/ProjectFilter.ts:42](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/ProjectFilter.ts#L42)
