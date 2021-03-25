[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / IProjectListProps

# Interface: IProjectListProps

[Pages](../modules/pages.md).IProjectListProps

## Hierarchy

* [*IListProps*](components.ilistprops.md)<Project\>

* *Omit*<IPivotItemProps, *componentRef*\>

  ↳ **IProjectListProps**

## Table of contents

### Properties

- [checkboxVisibility](pages.iprojectlistprops.md#checkboxvisibility)
- [columns](pages.iprojectlistprops.md#columns)
- [commandBar](pages.iprojectlistprops.md#commandbar)
- [enableShimmer](pages.iprojectlistprops.md#enableshimmer)
- [filters](pages.iprojectlistprops.md#filters)
- [headerClassName](pages.iprojectlistprops.md#headerclassname)
- [height](pages.iprojectlistprops.md#height)
- [hidden](pages.iprojectlistprops.md#hidden)
- [hideColumns](pages.iprojectlistprops.md#hidecolumns)
- [items](pages.iprojectlistprops.md#items)
- [listGroupProps](pages.iprojectlistprops.md#listgroupprops)
- [listGroupRenderProps](pages.iprojectlistprops.md#listgrouprenderprops)
- [onRenderColumnHeader](pages.iprojectlistprops.md#onrendercolumnheader)
- [onRenderDetailsHeader](pages.iprojectlistprops.md#onrenderdetailsheader)
- [renderLink](pages.iprojectlistprops.md#renderlink)
- [searchBox](pages.iprojectlistprops.md#searchbox)
- [selectionProps](pages.iprojectlistprops.md#selectionprops)

## Properties

### checkboxVisibility

• `Optional` **checkboxVisibility**: CheckboxVisibility

Check box visibility

Inherited from: [IListProps](components.ilistprops.md).[checkboxVisibility](components.ilistprops.md#checkboxvisibility)

Defined in: [components/List/types.tsx:115](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L115)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<[*IListColumnData*](components.ilistcolumndata.md)\>[]

Columns

Inherited from: [IListProps](components.ilistprops.md).[columns](components.ilistprops.md#columns)

Defined in: [components/List/types.tsx:70](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L70)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: [IListProps](components.ilistprops.md).[commandBar](components.ilistprops.md#commandbar)

Defined in: [components/List/types.tsx:110](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L110)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: [IListProps](components.ilistprops.md).[enableShimmer](components.ilistprops.md#enableshimmer)

Defined in: [components/List/types.tsx:75](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L75)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Inherited from: [IListProps](components.ilistprops.md).[filters](components.ilistprops.md#filters)

Defined in: [components/List/types.tsx:125](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L125)

___

### headerClassName

• `Optional` **headerClassName**: *string*

Overriding class name for header

Inherited from: [IListProps](components.ilistprops.md).[headerClassName](components.ilistprops.md#headerclassname)

Defined in: [components/List/types.tsx:135](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L135)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: [IListProps](components.ilistprops.md).[height](components.ilistprops.md#height)

Defined in: [components/List/types.tsx:80](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L80)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Inherited from: [IListProps](components.ilistprops.md).[hidden](components.ilistprops.md#hidden)

Defined in: [components/List/types.tsx:130](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L130)

___

### hideColumns

• `Optional` **hideColumns**: *string*[]

Defined in: [pages/Projects/ProjectList/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L13)

___

### items

• **items**: *Project*[]

Items

Inherited from: [IListProps](components.ilistprops.md).[items](components.ilistprops.md#items)

Defined in: [components/List/types.tsx:65](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L65)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Inherited from: [IListProps](components.ilistprops.md).[listGroupProps](components.ilistprops.md#listgroupprops)

Defined in: [components/List/types.tsx:95](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L95)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: [IListProps](components.ilistprops.md).[listGroupRenderProps](components.ilistprops.md#listgrouprenderprops)

Defined in: [components/List/types.tsx:100](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L100)

___

### onRenderColumnHeader

• `Optional` **onRenderColumnHeader**: *IRenderFunction*<IDetailsColumnRenderTooltipProps\>

Callback to render the column header

Inherited from: [IListProps](components.ilistprops.md).[onRenderColumnHeader](components.ilistprops.md#onrendercolumnheader)

Defined in: [components/List/types.tsx:120](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L120)

___

### onRenderDetailsHeader

• `Optional` **onRenderDetailsHeader**: *IRenderFunction*<IDetailsHeaderProps\>

On render details header

Inherited from: [IListProps](components.ilistprops.md).[onRenderDetailsHeader](components.ilistprops.md#onrenderdetailsheader)

Defined in: [components/List/types.tsx:105](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L105)

___

### renderLink

• `Optional` **renderLink**: *boolean*

Defined in: [pages/Projects/ProjectList/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L12)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Inherited from: [IListProps](components.ilistprops.md).[searchBox](components.ilistprops.md#searchbox)

Defined in: [components/List/types.tsx:85](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L85)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Inherited from: [IListProps](components.ilistprops.md).[selectionProps](components.ilistprops.md#selectionprops)

Defined in: [components/List/types.tsx:90](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L90)
