[did-client - v0.11.3](../README.md) / [Components](../modules/components.md) / IEventListProps

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
- [defaultSearchBoxWidth](components.ieventlistprops.md#defaultsearchboxwidth)
- [enableShimmer](components.ieventlistprops.md#enableshimmer)
- [exportFileName](components.ieventlistprops.md#exportfilename)
- [filterPanelActions](components.ieventlistprops.md#filterpanelactions)
- [filterValues](components.ieventlistprops.md#filtervalues)
- [height](components.ieventlistprops.md#height)
- [hidden](components.ieventlistprops.md#hidden)
- [items](components.ieventlistprops.md#items)
- [listGroupProps](components.ieventlistprops.md#listgroupprops)
- [listGroupRenderProps](components.ieventlistprops.md#listgrouprenderprops)
- [onFilter](components.ieventlistprops.md#onfilter)
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

Defined in: [client/components/List/types.ts:141](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L141)

___

### columnWidths

• `Optional` **columnWidths**: *Record*<string, number\>

Column width overrides

Defined in: [client/components/EventList/types.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L21)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)[]

Columns

Inherited from: [IListProps](components.ilistprops.md).[columns](components.ilistprops.md#columns)

Defined in: [client/components/List/types.ts:96](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L96)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: [IListProps](components.ilistprops.md).[commandBar](components.ilistprops.md#commandbar)

Defined in: [client/components/List/types.ts:131](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L131)

___

### dateFormat

• `Optional` **dateFormat**: *string*

Date format

Defined in: [client/components/EventList/types.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L16)

___

### defaultSearchBoxWidth

• `Optional` **defaultSearchBoxWidth**: *number*

Default search box width

**`default`** 500

Inherited from: [IListProps](components.ilistprops.md).[defaultSearchBoxWidth](components.ilistprops.md#defaultsearchboxwidth)

Defined in: [client/components/List/types.ts:157](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L157)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: [IListProps](components.ilistprops.md).[enableShimmer](components.ilistprops.md#enableshimmer)

Defined in: [client/components/List/types.ts:101](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L101)

___

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name. Set this property to enable Excel export of the
list data.

Inherited from: [IListProps](components.ilistprops.md).[exportFileName](components.ilistprops.md#exportfilename)

Defined in: [client/components/List/types.ts:150](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L150)

___

### filterPanelActions

• `Optional` **filterPanelActions**: *Element* \| *Element*[]

Filter panel actions

Inherited from: [IListProps](components.ilistprops.md).[filterPanelActions](components.ilistprops.md#filterpanelactions)

Defined in: [client/components/List/types.ts:162](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L162)

___

### filterValues

• `Optional` **filterValues**: *Record*<string, any\>

Filter values

Inherited from: [IListProps](components.ilistprops.md).[filterValues](components.ilistprops.md#filtervalues)

Defined in: [client/components/List/types.ts:172](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L172)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: [IListProps](components.ilistprops.md).[height](components.ilistprops.md#height)

Defined in: [client/components/List/types.ts:106](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L106)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Inherited from: [IListProps](components.ilistprops.md).[hidden](components.ilistprops.md#hidden)

Defined in: [client/components/List/types.ts:136](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L136)

___

### items

• **items**: *any*[]

Items

Inherited from: [IListProps](components.ilistprops.md).[items](components.ilistprops.md#items)

Defined in: [client/components/List/types.ts:91](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L91)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Inherited from: [IListProps](components.ilistprops.md).[listGroupProps](components.ilistprops.md#listgroupprops)

Defined in: [client/components/List/types.ts:121](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L121)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: [IListProps](components.ilistprops.md).[listGroupRenderProps](components.ilistprops.md#listgrouprenderprops)

Defined in: [client/components/List/types.ts:126](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L126)

___

### onFilter

• `Optional` **onFilter**: (`filterState`: [*ListFilterState*](../modules/components.md#listfilterstate)) => *void*

On filter callback returning `filters` and `isFiltered`.

#### Type declaration:

▸ (`filterState`: [*ListFilterState*](../modules/components.md#listfilterstate)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`filterState` | [*ListFilterState*](../modules/components.md#listfilterstate) |

**Returns:** *void*

Defined in: [client/components/List/types.ts:167](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L167)

Inherited from: [IListProps](components.ilistprops.md).[onFilter](components.ilistprops.md#onfilter)

Defined in: [client/components/List/types.ts:167](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L167)

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

Defined in: [client/components/List/types.ts:111](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L111)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Inherited from: [IListProps](components.ilistprops.md).[selectionProps](components.ilistprops.md#selectionprops)

Defined in: [client/components/List/types.ts:116](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L116)
