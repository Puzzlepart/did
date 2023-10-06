[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IListState

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

Defined in: [client/components/List/types/IListState.ts:33](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListState.ts#L33)

___

### filterBy

• `Optional` **filterBy**: [*IListColumn*](components.ilistcolumn.md)<any, any\>

Filter by column

Defined in: [client/components/List/types/IListState.ts:43](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListState.ts#L43)

___

### filters

• `Optional` **filters**: [*IFilter*](components.ifilter.md)[]

Current filters

Defined in: [client/components/List/types/IListState.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListState.ts#L28)

___

### groupBy

• `Optional` **groupBy**: [*IListColumn*](components.ilistcolumn.md)<any, any\>

Group by column

Defined in: [client/components/List/types/IListState.ts:38](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListState.ts#L38)

___

### isFilterPanelOpen

• `Optional` **isFilterPanelOpen**: *boolean*

Is filter panel open

Defined in: [client/components/List/types/IListState.ts:48](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListState.ts#L48)

___

### items

• `Optional` **items**: T[]

Current items

Defined in: [client/components/List/types/IListState.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListState.ts#L23)

___

### origItems

• `Optional` **origItems**: T[]

Original items

Defined in: [client/components/List/types/IListState.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListState.ts#L18)

___

### searchTerm

• `Optional` **searchTerm**: *string*

Search term

Defined in: [client/components/List/types/IListState.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListState.ts#L13)
