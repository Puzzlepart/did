[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / IListProps

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

  ↳↳ [*IProjectListProps*](pages.iprojectlistprops.md)

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

Defined in: [components/List/types.tsx:119](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L119)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<[*IListColumnData*](components.ilistcolumndata.md)\>[]

Columns

Overrides: void

Defined in: [components/List/types.tsx:69](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L69)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Defined in: [components/List/types.tsx:104](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L104)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Overrides: void

Defined in: [components/List/types.tsx:74](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L74)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Defined in: [components/List/types.tsx:109](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L109)

___

### height

• `Optional` **height**: *number*

Fixed height

Defined in: [components/List/types.tsx:79](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L79)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Defined in: [components/List/types.tsx:114](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L114)

___

### items

• **items**: T[]

Items

Overrides: void

Defined in: [components/List/types.tsx:64](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L64)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Defined in: [components/List/types.tsx:94](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L94)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Defined in: [components/List/types.tsx:99](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L99)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Defined in: [components/List/types.tsx:84](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L84)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Defined in: [components/List/types.tsx:89](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L89)
