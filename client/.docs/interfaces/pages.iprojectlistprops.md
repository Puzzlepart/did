[did-client - v0.11.1](../README.md) / [Pages](../modules/pages.md) / IProjectListProps

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

Defined in: [client/components/List/types.ts:124](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L124)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<[*IListColumnData*](components.ilistcolumndata.md)\>[]

Columns

Inherited from: void

Defined in: [client/components/List/types.ts:74](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L74)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: void

Defined in: [client/components/List/types.ts:109](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L109)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: void

Defined in: [client/components/List/types.ts:79](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L79)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Inherited from: void

Defined in: [client/components/List/types.ts:114](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L114)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: void

Defined in: [client/components/List/types.ts:84](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L84)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Inherited from: void

Defined in: [client/components/List/types.ts:119](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L119)

___

### hideColumns

• `Optional` **hideColumns**: *string*[]

Defined in: [client/pages/Projects/ProjectList/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L12)

___

### items

• **items**: *Project*[]

Items

Inherited from: void

Defined in: [client/components/List/types.ts:69](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L69)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Inherited from: void

Defined in: [client/components/List/types.ts:99](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L99)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: void

Defined in: [client/components/List/types.ts:104](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L104)

___

### renderLink

• `Optional` **renderLink**: *boolean*

Defined in: [client/pages/Projects/ProjectList/types.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L11)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Inherited from: void

Defined in: [client/components/List/types.ts:89](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L89)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Inherited from: void

Defined in: [client/components/List/types.ts:94](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L94)
