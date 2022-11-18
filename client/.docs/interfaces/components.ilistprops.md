[did-client - v0.11.1](../README.md) / [Components](../modules/components.md) / IListProps

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

Defined in: [client/components/List/types.ts:124](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L124)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<[*IListColumnData*](components.ilistcolumndata.md)\>[]

Columns

Overrides: void

Defined in: [client/components/List/types.ts:74](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L74)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Defined in: [client/components/List/types.ts:109](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L109)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Overrides: void

Defined in: [client/components/List/types.ts:79](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L79)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Defined in: [client/components/List/types.ts:114](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L114)

___

### height

• `Optional` **height**: *number*

Fixed height

Defined in: [client/components/List/types.ts:84](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L84)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Defined in: [client/components/List/types.ts:119](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L119)

___

### items

• **items**: T[]

Items

Overrides: void

Defined in: [client/components/List/types.ts:69](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L69)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Defined in: [client/components/List/types.ts:99](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L99)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Defined in: [client/components/List/types.ts:104](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L104)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Defined in: [client/components/List/types.ts:89](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L89)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Defined in: [client/components/List/types.ts:94](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L94)
