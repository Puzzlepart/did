[did-client - v0.11.1](../README.md) / [Components](../modules/components.md) / IEventListProps

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

Defined in: [client/components/EventList/types.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L11)

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

Defined in: [client/components/List/types.ts:124](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L124)

___

### columnWidths

• `Optional` **columnWidths**: *Record*<string, number\>

Column width overrides

Defined in: [client/components/EventList/types.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L21)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<[*IListColumnData*](components.ilistcolumndata.md)\>[]

Columns

Inherited from: [IListProps](components.ilistprops.md).[columns](components.ilistprops.md#columns)

Defined in: [client/components/List/types.ts:74](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L74)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: [IListProps](components.ilistprops.md).[commandBar](components.ilistprops.md#commandbar)

Defined in: [client/components/List/types.ts:109](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L109)

___

### dateFormat

• `Optional` **dateFormat**: *string*

Date format

Defined in: [client/components/EventList/types.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L16)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: [IListProps](components.ilistprops.md).[enableShimmer](components.ilistprops.md#enableshimmer)

Defined in: [client/components/List/types.ts:79](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L79)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Inherited from: [IListProps](components.ilistprops.md).[filters](components.ilistprops.md#filters)

Defined in: [client/components/List/types.ts:114](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L114)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: [IListProps](components.ilistprops.md).[height](components.ilistprops.md#height)

Defined in: [client/components/List/types.ts:84](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L84)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Inherited from: [IListProps](components.ilistprops.md).[hidden](components.ilistprops.md#hidden)

Defined in: [client/components/List/types.ts:119](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L119)

___

### items

• **items**: *any*[]

Items

Inherited from: [IListProps](components.ilistprops.md).[items](components.ilistprops.md#items)

Defined in: [client/components/List/types.ts:69](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L69)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Inherited from: [IListProps](components.ilistprops.md).[listGroupProps](components.ilistprops.md#listgroupprops)

Defined in: [client/components/List/types.ts:99](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L99)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: [IListProps](components.ilistprops.md).[listGroupRenderProps](components.ilistprops.md#listgrouprenderprops)

Defined in: [client/components/List/types.ts:104](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L104)

___

### resizableColumns

• `Optional` **resizableColumns**: *boolean*

Resizable columns

Defined in: [client/components/EventList/types.tsx:26](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L26)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Inherited from: [IListProps](components.ilistprops.md).[searchBox](components.ilistprops.md#searchbox)

Defined in: [client/components/List/types.ts:89](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L89)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Inherited from: [IListProps](components.ilistprops.md).[selectionProps](components.ilistprops.md#selectionprops)

Defined in: [client/components/List/types.ts:94](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L94)
