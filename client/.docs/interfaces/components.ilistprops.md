[did-client - v0.10.9](../README.md) / [Components](../modules/components.md) / IListProps

# Interface: IListProps<T\>

[Components](../modules/components.md).IListProps

## Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

## Hierarchy

* *Omit*<IShimmeredDetailsListProps, *onRenderDetailsHeader*\>

  ↳ **IListProps**

  ↳↳ [*IEventListProps*](components.ieventlistprops.md)

## Table of contents

### Properties

- [columnHeaderProps](components.ilistprops.md#columnheaderprops)
- [columns](components.ilistprops.md#columns)
- [commandBar](components.ilistprops.md#commandbar)
- [enableShimmer](components.ilistprops.md#enableshimmer)
- [filters](components.ilistprops.md#filters)
- [height](components.ilistprops.md#height)
- [hidden](components.ilistprops.md#hidden)
- [items](components.ilistprops.md#items)
- [listGroupProps](components.ilistprops.md#listgroupprops)
- [listGroupRenderProps](components.ilistprops.md#listgrouprenderprops)
- [searchBox](components.ilistprops.md#searchbox)
- [selectionProps](components.ilistprops.md#selectionprops)

## Properties

### columnHeaderProps

• `Optional` **columnHeaderProps**: *object*

Column header

#### Type declaration:

Name | Type |
:------ | :------ |
`className`? | *string* |
`onRender`? | *IRenderFunction*<IDetailsHeaderProps\> |

Defined in: [client/components/List/types.tsx:125](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L125)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<[*IListColumnData*](components.ilistcolumndata.md)\>[]

Columns

Overrides: void

Defined in: [client/components/List/types.tsx:75](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L75)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Defined in: [client/components/List/types.tsx:110](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L110)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Overrides: void

Defined in: [client/components/List/types.tsx:80](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L80)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Defined in: [client/components/List/types.tsx:115](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L115)

___

### height

• `Optional` **height**: *number*

Fixed height

Defined in: [client/components/List/types.tsx:85](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L85)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Defined in: [client/components/List/types.tsx:120](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L120)

___

### items

• **items**: T[]

Items

Overrides: void

Defined in: [client/components/List/types.tsx:70](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L70)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Defined in: [client/components/List/types.tsx:100](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L100)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Defined in: [client/components/List/types.tsx:105](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L105)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Defined in: [client/components/List/types.tsx:90](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L90)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Defined in: [client/components/List/types.tsx:95](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L95)
