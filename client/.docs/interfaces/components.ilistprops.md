[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IListProps

# Interface: IListProps<T\>

[Components](../modules/components.md).IListProps

## Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

## Hierarchy

* *Pick*<HTMLProps<HTMLDivElement\>, *className*\>

* *Omit*<IShimmeredDetailsListProps, *selectionMode*\>

  ↳ **IListProps**

  ↳↳ [*IEventListProps*](components.ieventlistprops.md)

## Table of contents

### Properties

- [columnHeaderProps](components.ilistprops.md#columnheaderprops)
- [columns](components.ilistprops.md#columns)
- [commandBar](components.ilistprops.md#commandbar)
- [defaultSearchBoxWidth](components.ilistprops.md#defaultsearchboxwidth)
- [enableShimmer](components.ilistprops.md#enableshimmer)
- [exportFileName](components.ilistprops.md#exportfilename)
- [filterPanelActions](components.ilistprops.md#filterpanelactions)
- [filterValues](components.ilistprops.md#filtervalues)
- [getColumnStyle](components.ilistprops.md#getcolumnstyle)
- [height](components.ilistprops.md#height)
- [hidden](components.ilistprops.md#hidden)
- [hideToolbar](components.ilistprops.md#hidetoolbar)
- [items](components.ilistprops.md#items)
- [listGroupProps](components.ilistprops.md#listgroupprops)
- [listGroupRenderProps](components.ilistprops.md#listgrouprenderprops)
- [menuItems](components.ilistprops.md#menuitems)
- [minmalHeaderColumns](components.ilistprops.md#minmalheadercolumns)
- [onFilter](components.ilistprops.md#onfilter)
- [searchBox](components.ilistprops.md#searchbox)
- [selectionProps](components.ilistprops.md#selectionprops)

## Properties

### columnHeaderProps

• `Optional` **columnHeaderProps**: *object*

Column header props

#### Type declaration:

Name | Type |
:------ | :------ |
`className`? | *string* |
`onRender`? | *IRenderFunction*<IDetailsHeaderProps\> |

Defined in: [client/components/List/types/IListProps.ts:76](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L76)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<any, any\>[]

Columns

Overrides: void

Defined in: [client/components/List/types/IListProps.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L31)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Defined in: [client/components/List/types/IListProps.ts:66](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L66)

___

### defaultSearchBoxWidth

• `Optional` **defaultSearchBoxWidth**: *number*

Default search box width

**`default`** 500

Defined in: [client/components/List/types/IListProps.ts:92](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L92)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Overrides: void

Defined in: [client/components/List/types/IListProps.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L36)

___

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name. Set this property to enable Excel export of the
list data.

Defined in: [client/components/List/types/IListProps.ts:85](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L85)

___

### filterPanelActions

• `Optional` **filterPanelActions**: *Element* \| *Element*[]

Filter panel actions

Defined in: [client/components/List/types/IListProps.ts:97](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L97)

___

### filterValues

• `Optional` **filterValues**: *Record*<string, any\>

Filter values

Defined in: [client/components/List/types/IListProps.ts:107](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L107)

___

### getColumnStyle

• `Optional` **getColumnStyle**: (`item`: T) => *CSSProperties*

Get column style for the specified item

#### Type declaration:

▸ (`item`: T): *CSSProperties*

#### Parameters:

Name | Type |
:------ | :------ |
`item` | T |

**Returns:** *CSSProperties*

Defined in: [client/components/List/types/IListProps.ts:122](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L122)

Defined in: [client/components/List/types/IListProps.ts:122](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L122)

___

### height

• `Optional` **height**: *number*

Fixed height

Defined in: [client/components/List/types/IListProps.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L41)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden state of the list

Defined in: [client/components/List/types/IListProps.ts:71](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L71)

___

### hideToolbar

• `Optional` **hideToolbar**: *boolean*

Hide the toolbar

Defined in: [client/components/List/types/IListProps.ts:117](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L117)

___

### items

• **items**: T[]

Items

Overrides: void

Defined in: [client/components/List/types/IListProps.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L26)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)<any\>

Group props

Defined in: [client/components/List/types/IListProps.ts:56](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L56)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Defined in: [client/components/List/types/IListProps.ts:61](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L61)

___

### menuItems

• `Optional` **menuItems**: *ListMenuItem*[]

Menu items to show in `<Toolbar />` if using the preview mode.

Defined in: [client/components/List/types/IListProps.ts:112](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L112)

___

### minmalHeaderColumns

• `Optional` **minmalHeaderColumns**: *boolean*

Use minimal header columns. Styled with small font size,
uppercase letters, some letter spacing and text shadows.

Defined in: [client/components/List/types/IListProps.ts:128](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L128)

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

Defined in: [client/components/List/types/IListProps.ts:102](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L102)

Defined in: [client/components/List/types/IListProps.ts:102](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L102)

___

### searchBox

• `Optional` **searchBox**: SearchBoxProps

Search box props

Defined in: [client/components/List/types/IListProps.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L46)

___

### selectionProps

• `Optional` **selectionProps**: [SelectionMode, function?]

Selection props

Defined in: [client/components/List/types/IListProps.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L51)
