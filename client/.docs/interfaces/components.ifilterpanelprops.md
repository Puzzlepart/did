[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IFilterPanelProps

# Interface: IFilterPanelProps

[Components](../modules/components.md).IFilterPanelProps

## Hierarchy

* *IPanelProps*

  ↳ **IFilterPanelProps**

## Table of contents

### Properties

- [actions](components.ifilterpanelprops.md#actions)
- [filters](components.ifilterpanelprops.md#filters)
- [items](components.ifilterpanelprops.md#items)
- [onClearFilters](components.ifilterpanelprops.md#onclearfilters)
- [onFiltersUpdated](components.ifilterpanelprops.md#onfiltersupdated)
- [selectedFilter](components.ifilterpanelprops.md#selectedfilter)
- [shortListCount](components.ifilterpanelprops.md#shortlistcount)

## Properties

### actions

• `Optional` **actions**: *Element* \| *Element*[]

Actions

Defined in: [client/components/FilterPanel/types.tsx:43](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L43)

___

### filters

• **filters**: [*BaseFilter*](../classes/components.basefilter.md)[]

Filters to show

Defined in: [client/components/FilterPanel/types.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L11)

___

### items

• **items**: *any*[]

Items to filter

Defined in: [client/components/FilterPanel/types.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L16)

___

### onClearFilters

• `Optional` **onClearFilters**: () => *void*

On reset filters

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/FilterPanel/types.tsx:26](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L26)

Defined in: [client/components/FilterPanel/types.tsx:26](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L26)

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

Defined in: [client/components/FilterPanel/types.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L21)

Defined in: [client/components/FilterPanel/types.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L21)

___

### selectedFilter

• `Optional` **selectedFilter**: IColumn

Selected filter

Defined in: [client/components/FilterPanel/types.tsx:38](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L38)

___

### shortListCount

• `Optional` **shortListCount**: *number*

Number of items to show by default (can show all with Show all link)

**`default`** 10

Defined in: [client/components/FilterPanel/types.tsx:33](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L33)
