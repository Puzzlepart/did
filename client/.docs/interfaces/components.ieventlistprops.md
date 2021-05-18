[did-client - v0.9.12](../README.md) / [Components](../modules/components.md) / IEventListProps

# Interface: IEventListProps

[Components](../modules/components.md).IEventListProps

## Hierarchy

* [*IListProps*](components.ilistprops.md)

  ↳ **IEventListProps**

## Table of contents

### Properties

- [additionalColumns](components.ieventlistprops.md#additionalcolumns)
- [columnHeaderProps](components.ieventlistprops.md#columnheaderprops)
- [columnWidths](components.ieventlistprops.md#columnwidths)
- [columns](components.ieventlistprops.md#columns)
- [commandBar](components.ieventlistprops.md#commandbar)
- [dateFormat](components.ieventlistprops.md#dateformat)
- [enableShimmer](components.ieventlistprops.md#enableshimmer)
- [filters](components.ieventlistprops.md#filters)
- [height](components.ieventlistprops.md#height)
- [hidden](components.ieventlistprops.md#hidden)
- [items](components.ieventlistprops.md#items)
- [listGroupProps](components.ieventlistprops.md#listgroupprops)
- [listGroupRenderProps](components.ieventlistprops.md#listgrouprenderprops)
- [resizableColumns](components.ieventlistprops.md#resizablecolumns)
- [searchBox](components.ieventlistprops.md#searchbox)
- [selectionProps](components.ieventlistprops.md#selectionprops)

## Properties

### additionalColumns

• `Optional` **additionalColumns**: IColumn[]

An array of additional columns to add

Defined in: [components/EventList/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L13)

___

### columnHeaderProps

• `Optional` **columnHeaderProps**: *object*

Column header

#### Type declaration:

Name | Type |
:------ | :------ |
`className`? | *string* |
`onRender`? | *IRenderFunction*<IDetailsHeaderProps\> |

Inherited from: [IListProps](components.ilistprops.md).[columnHeaderProps](components.ilistprops.md#columnheaderprops)

Defined in: [components/List/types.tsx:120](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L120)

___

### columnWidths

• `Optional` **columnWidths**: *Record*<string, number\>

Column width overrides

Defined in: [components/EventList/types.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L23)

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

Defined in: [components/List/types.tsx:105](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L105)

___

### dateFormat

• `Optional` **dateFormat**: *string*

Date format

Defined in: [components/EventList/types.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L18)

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

Defined in: [components/List/types.tsx:110](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L110)

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

Defined in: [components/List/types.tsx:115](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L115)

___

### items

• **items**: *any*[]

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

### resizableColumns

• `Optional` **resizableColumns**: *boolean*

Resizable columns

Defined in: [components/EventList/types.tsx:28](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L28)

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
