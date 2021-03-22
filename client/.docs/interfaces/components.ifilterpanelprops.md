[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / IFilterPanelProps

# Interface: IFilterPanelProps

[Components](../modules/components.md).IFilterPanelProps

## Hierarchy

* *IPanelProps*

  ↳ **IFilterPanelProps**

## Table of contents

### Properties

- [filters](components.ifilterpanelprops.md#filters)
- [items](components.ifilterpanelprops.md#items)
- [onFiltersUpdated](components.ifilterpanelprops.md#onfiltersupdated)
- [shortListCount](components.ifilterpanelprops.md#shortlistcount)

## Properties

### filters

• **filters**: [*BaseFilter*](../classes/components.basefilter.md)[]

Filters to show

Defined in: [components/FilterPanel/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L12)

___

### items

• **items**: *any*[]

Items to filter

Defined in: [components/FilterPanel/types.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L17)

___

### onFiltersUpdated

• **onFiltersUpdated**: (`filters`: [*IFilter*](components.ifilter.md)[]) => *void*

On filters updated

#### Type declaration:

▸ (`filters`: [*IFilter*](components.ifilter.md)[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`filters` | [*IFilter*](components.ifilter.md)[] |

**Returns:** *void*

Defined in: [components/FilterPanel/types.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L22)

Defined in: [components/FilterPanel/types.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L22)

___

### shortListCount

• `Optional` **shortListCount**: *number*

Number of items to show by default (can show all with Show all link)

**`default`** 10

Defined in: [components/FilterPanel/types.tsx:29](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L29)
