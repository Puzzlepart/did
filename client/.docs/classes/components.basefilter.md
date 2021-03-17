[did-client - v0.9.9](../README.md) / [Components](../modules/components.md) / BaseFilter

# Class: BaseFilter<ItemType\>

[Components](../modules/components.md).BaseFilter

## Type parameters

Name | Default |
:------ | :------ |
`ItemType` | *any* |

## Hierarchy

* **BaseFilter**

  ↳ [*CustomerFilter*](components.customerfilter.md)

  ↳ [*MonthFilter*](components.monthfilter.md)

  ↳ [*ProjectFilter*](components.projectfilter.md)

  ↳ [*ResourceFilter*](components.resourcefilter.md)

  ↳ [*WeekFilter*](components.weekfilter.md)

  ↳ [*YearFilter*](components.yearfilter.md)

## Table of contents

### Constructors

- [constructor](components.basefilter.md#constructor)

### Properties

- [fieldName](components.basefilter.md#fieldname)
- [name](components.basefilter.md#name)

### Methods

- [initialize](components.basefilter.md#initialize)
- [setDefaults](components.basefilter.md#setdefaults)

## Constructors

### constructor

\+ **new BaseFilter**<ItemType\>(`fieldName`: *string*, `name`: *string*): [*BaseFilter*](components.basefilter.md)<ItemType\>

#### Type parameters:

Name | Default |
:------ | :------ |
`ItemType` | *any* |

#### Parameters:

Name | Type |
:------ | :------ |
`fieldName` | *string* |
`name` | *string* |

**Returns:** [*BaseFilter*](components.basefilter.md)<ItemType\>

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L24)

## Properties

### fieldName

• **fieldName**: *string*

___

### name

• **name**: *string*

## Methods

### initialize

▸ `Abstract`**initialize**(`items`: ItemType[]): [*IFilter*](../interfaces/components.ifilter.md)

#### Parameters:

Name | Type |
:------ | :------ |
`items` | ItemType[] |

**Returns:** [*IFilter*](../interfaces/components.ifilter.md)

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L26)

___

### setDefaults

▸ `Abstract`**setDefaults**(`values`: *any*): [*BaseFilter*](components.basefilter.md)<ItemType\>

#### Parameters:

Name | Type |
:------ | :------ |
`values` | *any* |

**Returns:** [*BaseFilter*](components.basefilter.md)<ItemType\>

Defined in: [client/components/FilterPanel/Filters/BaseFilter.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/Filters/BaseFilter.ts#L27)
