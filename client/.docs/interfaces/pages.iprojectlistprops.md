[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / IProjectListProps

# Interface: IProjectListProps

[Pages](../modules/pages.md).IProjectListProps

## Hierarchy

* [*IListProps*](components.ilistprops.md)<Project\>

* *Omit*<IPivotItemProps, *componentRef*\>

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

Inherited from: [IListProps](components.ilistprops.md).[columnHeaderProps](components.ilistprops.md#columnheaderprops)

Defined in: [components/List/types.tsx:119](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L119)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<[*IListColumnData*](components.ilistcolumndata.md)\>[]

Columns

Inherited from: [IListProps](components.ilistprops.md).[columns](components.ilistprops.md#columns)

Defined in: [components/List/types.tsx:69](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L69)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: [IListProps](components.ilistprops.md).[commandBar](components.ilistprops.md#commandbar)

Defined in: [components/List/types.tsx:104](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L104)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: [IListProps](components.ilistprops.md).[enableShimmer](components.ilistprops.md#enableshimmer)

Defined in: [components/List/types.tsx:74](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L74)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Inherited from: [IListProps](components.ilistprops.md).[filters](components.ilistprops.md#filters)

Defined in: [components/List/types.tsx:109](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L109)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: [IListProps](components.ilistprops.md).[height](components.ilistprops.md#height)

Defined in: [components/List/types.tsx:79](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L79)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Inherited from: [IListProps](components.ilistprops.md).[hidden](components.ilistprops.md#hidden)

Defined in: [components/List/types.tsx:114](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L114)

___

### hideColumns

• `Optional` **hideColumns**: *string*[]

Defined in: [pages/Projects/ProjectList/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L13)

___

### items

• **items**: *Project*[]

Items

Inherited from: [IListProps](components.ilistprops.md).[items](components.ilistprops.md#items)

Defined in: [components/List/types.tsx:64](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L64)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Inherited from: [IListProps](components.ilistprops.md).[listGroupProps](components.ilistprops.md#listgroupprops)

Defined in: [components/List/types.tsx:94](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L94)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: [IListProps](components.ilistprops.md).[listGroupRenderProps](components.ilistprops.md#listgrouprenderprops)

Defined in: [components/List/types.tsx:99](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L99)

___

### renderLink

• `Optional` **renderLink**: *boolean*

Defined in: [pages/Projects/ProjectList/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L12)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Inherited from: [IListProps](components.ilistprops.md).[searchBox](components.ilistprops.md#searchbox)

Defined in: [components/List/types.tsx:84](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L84)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Inherited from: [IListProps](components.ilistprops.md).[selectionProps](components.ilistprops.md#selectionprops)

Defined in: [components/List/types.tsx:89](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L89)
