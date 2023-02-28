[did-client - v0.11.5](../README.md) / [Components](../modules/components.md) / IListState

# Interface: IListState<T\>

[Components](../modules/components.md).IListState

## Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

## Table of contents

### Properties

- [columnHeaderContextMenu](components.iliststate.md#columnheadercontextmenu)
- [filterBy](components.iliststate.md#filterby)
- [filters](components.iliststate.md#filters)
- [groupBy](components.iliststate.md#groupby)
- [isFilterPanelOpen](components.iliststate.md#isfilterpanelopen)
- [items](components.iliststate.md#items)
- [origItems](components.iliststate.md#origitems)
- [searchTerm](components.iliststate.md#searchterm)

## Properties

### columnHeaderContextMenu

• `Optional` **columnHeaderContextMenu**: [*ColumnHeaderContextMenu*](../modules/components.md#columnheadercontextmenu)

Column header context menu `column` and `targetElement`

Defined in: [components/List/types.ts:207](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L207)

___

### filterBy

• `Optional` **filterBy**: [*IListColumn*](components.ilistcolumn.md)

Filter by column

Defined in: [components/List/types.ts:217](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L217)

___

### filters

• `Optional` **filters**: [*IFilter*](components.ifilter.md)[]

Current filters

Defined in: [components/List/types.ts:202](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L202)

___

### groupBy

• `Optional` **groupBy**: [*IListColumn*](components.ilistcolumn.md)

Group by column

Defined in: [components/List/types.ts:212](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L212)

___

### isFilterPanelOpen

• `Optional` **isFilterPanelOpen**: *boolean*

Is filter panel open

Defined in: [components/List/types.ts:222](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L222)

___

### items

• `Optional` **items**: T[]

Current items

Defined in: [components/List/types.ts:197](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L197)

___

### origItems

• `Optional` **origItems**: T[]

Original items

Defined in: [components/List/types.ts:192](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L192)

___

### searchTerm

• `Optional` **searchTerm**: *string*

Search term

Defined in: [components/List/types.ts:187](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L187)
