[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IEventListProps

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
- [getColumnStyle](components.ieventlistprops.md#getcolumnstyle)
- [height](components.ieventlistprops.md#height)
- [hidden](components.ieventlistprops.md#hidden)
- [hideToolbar](components.ieventlistprops.md#hidetoolbar)
- [items](components.ieventlistprops.md#items)
- [listGroupProps](components.ieventlistprops.md#listgroupprops)
- [listGroupRenderProps](components.ieventlistprops.md#listgrouprenderprops)
- [menuItems](components.ieventlistprops.md#menuitems)
- [minmalHeaderColumns](components.ieventlistprops.md#minmalheadercolumns)
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

Column header props

#### Type declaration:

Name | Type |
:------ | :------ |
`className`? | *string* |
`onRender`? | *IRenderFunction*<IDetailsHeaderProps\> |

Inherited from: [IListProps](components.ilistprops.md).[columnHeaderProps](components.ilistprops.md#columnheaderprops)

Defined in: [client/components/List/types/IListProps.ts:75](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L75)

___

### columnWidths

• `Optional` **columnWidths**: *Record*<string, number\>

Column width overrides

Defined in: [client/components/EventList/types.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L21)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<any\>[]

Columns

Inherited from: [IListProps](components.ilistprops.md).[columns](components.ilistprops.md#columns)

Defined in: [client/components/List/types/IListProps.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L30)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: [IListProps](components.ilistprops.md).[commandBar](components.ilistprops.md#commandbar)

Defined in: [client/components/List/types/IListProps.ts:65](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L65)

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

Defined in: [client/components/List/types/IListProps.ts:91](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L91)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: [IListProps](components.ilistprops.md).[enableShimmer](components.ilistprops.md#enableshimmer)

Defined in: [client/components/List/types/IListProps.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L35)

___

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name. Set this property to enable Excel export of the
list data.

Inherited from: [IListProps](components.ilistprops.md).[exportFileName](components.ilistprops.md#exportfilename)

Defined in: [client/components/List/types/IListProps.ts:84](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L84)

___

### filterPanelActions

• `Optional` **filterPanelActions**: *Element* \| *Element*[]

Filter panel actions

Inherited from: [IListProps](components.ilistprops.md).[filterPanelActions](components.ilistprops.md#filterpanelactions)

Defined in: [client/components/List/types/IListProps.ts:96](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L96)

___

### filterValues

• `Optional` **filterValues**: *Record*<string, any\>

Filter values

Inherited from: [IListProps](components.ilistprops.md).[filterValues](components.ilistprops.md#filtervalues)

Defined in: [client/components/List/types/IListProps.ts:106](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L106)

___

### getColumnStyle

• `Optional` **getColumnStyle**: (`item`: *any*) => *CSSProperties*

Get column style for the specified item

#### Type declaration:

▸ (`item`: *any*): *CSSProperties*

#### Parameters:

Name | Type |
:------ | :------ |
`item` | *any* |

**Returns:** *CSSProperties*

Defined in: [client/components/List/types/IListProps.ts:121](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L121)

Inherited from: [IListProps](components.ilistprops.md).[getColumnStyle](components.ilistprops.md#getcolumnstyle)

Defined in: [client/components/List/types/IListProps.ts:121](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L121)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: [IListProps](components.ilistprops.md).[height](components.ilistprops.md#height)

Defined in: [client/components/List/types/IListProps.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L40)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden state of the list

Inherited from: [IListProps](components.ilistprops.md).[hidden](components.ilistprops.md#hidden)

Defined in: [client/components/List/types/IListProps.ts:70](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L70)

___

### hideToolbar

• `Optional` **hideToolbar**: *boolean*

Hide the toolbar

Inherited from: [IListProps](components.ilistprops.md).[hideToolbar](components.ilistprops.md#hidetoolbar)

Defined in: [client/components/List/types/IListProps.ts:116](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L116)

___

### items

• **items**: *any*[]

Items

Inherited from: [IListProps](components.ilistprops.md).[items](components.ilistprops.md#items)

Defined in: [client/components/List/types/IListProps.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L25)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Inherited from: [IListProps](components.ilistprops.md).[listGroupProps](components.ilistprops.md#listgroupprops)

Defined in: [client/components/List/types/IListProps.ts:55](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L55)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: [IListProps](components.ilistprops.md).[listGroupRenderProps](components.ilistprops.md#listgrouprenderprops)

Defined in: [client/components/List/types/IListProps.ts:60](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L60)

___

### menuItems

• `Optional` **menuItems**: *ListMenuItem*[]

Menu items to show in `<Toolbar />` if using the preview mode.

Inherited from: [IListProps](components.ilistprops.md).[menuItems](components.ilistprops.md#menuitems)

Defined in: [client/components/List/types/IListProps.ts:111](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L111)

___

### minmalHeaderColumns

• `Optional` **minmalHeaderColumns**: *boolean*

Use minimal header columns. Styled with small font size,
uppercase letters, some letter spacing and text shadows.

Inherited from: [IListProps](components.ilistprops.md).[minmalHeaderColumns](components.ilistprops.md#minmalheadercolumns)

Defined in: [client/components/List/types/IListProps.ts:127](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L127)

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

Defined in: [client/components/List/types/IListProps.ts:101](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L101)

Inherited from: [IListProps](components.ilistprops.md).[onFilter](components.ilistprops.md#onfilter)

Defined in: [client/components/List/types/IListProps.ts:101](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L101)

___

### resizableColumns

• `Optional` **resizableColumns**: *boolean*

Resizable columns

Defined in: [client/components/EventList/types.tsx:26](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L26)

___

### searchBox

• `Optional` **searchBox**: SearchBoxProps

Search box props

Inherited from: [IListProps](components.ilistprops.md).[searchBox](components.ilistprops.md#searchbox)

Defined in: [client/components/List/types/IListProps.ts:45](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L45)

___

### selectionProps

• `Optional` **selectionProps**: [SelectionMode, function?]

Selection props

Inherited from: [IListProps](components.ilistprops.md).[selectionProps](components.ilistprops.md#selectionprops)

Defined in: [client/components/List/types/IListProps.ts:50](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L50)
