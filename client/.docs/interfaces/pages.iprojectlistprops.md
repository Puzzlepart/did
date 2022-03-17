[did-client - v0.10.9](../README.md) / [Pages](../modules/pages.md) / IProjectListProps

# Interface: IProjectListProps

[Pages](../modules/pages.md).IProjectListProps

## Hierarchy

* *Omit*<[*IListProps*](components.ilistprops.md)<Project\>, *role*\>

  ↳ **IProjectListProps**

## Table of contents

### Properties

- [columnHeaderProps](pages.iprojectlistprops.md#columnheaderprops)
- [columns](pages.iprojectlistprops.md#columns)
- [commandBar](pages.iprojectlistprops.md#commandbar)
- [enableShimmer](pages.iprojectlistprops.md#enableshimmer)
- [filters](pages.iprojectlistprops.md#filters)
- [height](pages.iprojectlistprops.md#height)
- [hidden](pages.iprojectlistprops.md#hidden)
- [hideColumns](pages.iprojectlistprops.md#hidecolumns)
- [items](pages.iprojectlistprops.md#items)
- [listGroupProps](pages.iprojectlistprops.md#listgroupprops)
- [listGroupRenderProps](pages.iprojectlistprops.md#listgrouprenderprops)
- [renderLink](pages.iprojectlistprops.md#renderlink)
- [searchBox](pages.iprojectlistprops.md#searchbox)
- [selectionProps](pages.iprojectlistprops.md#selectionprops)

## Properties

### columnHeaderProps

• `Optional` **columnHeaderProps**: *object*

Column header

#### Type declaration:

Name | Type |
:------ | :------ |
`className`? | *string* |
`onRender`? | *IRenderFunction*<IDetailsHeaderProps\> |

Inherited from: void

Defined in: [client/components/List/types.tsx:125](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L125)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<[*IListColumnData*](components.ilistcolumndata.md)\>[]

Columns

Inherited from: void

Defined in: [client/components/List/types.tsx:75](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L75)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: void

Defined in: [client/components/List/types.tsx:110](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L110)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: void

Defined in: [client/components/List/types.tsx:80](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L80)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Inherited from: void

Defined in: [client/components/List/types.tsx:115](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L115)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: void

Defined in: [client/components/List/types.tsx:85](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L85)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Inherited from: void

Defined in: [client/components/List/types.tsx:120](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L120)

___

### hideColumns

• `Optional` **hideColumns**: *string*[]

Defined in: [client/pages/Projects/ProjectList/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L13)

___

### items

• **items**: *Project*[]

Items

Inherited from: void

Defined in: [client/components/List/types.tsx:70](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L70)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Inherited from: void

Defined in: [client/components/List/types.tsx:100](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L100)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: void

Defined in: [client/components/List/types.tsx:105](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L105)

___

### renderLink

• `Optional` **renderLink**: *boolean*

Defined in: [client/pages/Projects/ProjectList/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L12)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Inherited from: void

Defined in: [client/components/List/types.tsx:90](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L90)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Inherited from: void

Defined in: [client/components/List/types.tsx:95](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L95)
