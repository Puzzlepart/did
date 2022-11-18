[did-client - v0.11.1](../README.md) / [Components](../modules/components.md) / IFilterPanelProps

# Interface: IFilterPanelProps

[Components](../modules/components.md).IFilterPanelProps

## Hierarchy

* *IPanelProps*

  ↳ **IFilterPanelProps**

## Table of contents

### Properties

- [filters](components.ifilterpanelprops.md#filters)
- [items](components.ifilterpanelprops.md#items)
- [onClearFilters](components.ifilterpanelprops.md#onclearfilters)
- [onFiltersUpdated](components.ifilterpanelprops.md#onfiltersupdated)
- [shortListCount](components.ifilterpanelprops.md#shortlistcount)

## Properties

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

Defined in: [client/components/FilterPanel/types.tsx:33](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L33)

Defined in: [client/components/FilterPanel/types.tsx:33](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L33)

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

### shortListCount

• `Optional` **shortListCount**: *number*

Number of items to show by default (can show all with Show all link)

**`default`** 10

Defined in: [client/components/FilterPanel/types.tsx:28](https://github.com/Puzzlepart/did/blob/dev/client/components/FilterPanel/types.tsx#L28)
