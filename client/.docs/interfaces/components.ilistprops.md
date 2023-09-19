[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IListProps

# Interface: IListProps<T\>

[Components](../modules/components.md).IListProps

## Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

## Hierarchy

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

Defined in: [client/components/List/types/IListProps.ts:75](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L75)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<any\>[]

Columns

Overrides: void

Defined in: [client/components/List/types/IListProps.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L30)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Defined in: [client/components/List/types/IListProps.ts:65](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L65)

___

### defaultSearchBoxWidth

• `Optional` **defaultSearchBoxWidth**: *number*

Default search box width

**`default`** 500

Defined in: [client/components/List/types/IListProps.ts:91](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L91)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Overrides: void

Defined in: [client/components/List/types/IListProps.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L35)

___

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name. Set this property to enable Excel export of the
list data.

Defined in: [client/components/List/types/IListProps.ts:84](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L84)

___

### filterPanelActions

• `Optional` **filterPanelActions**: *Element* \| *Element*[]

Filter panel actions

Defined in: [client/components/List/types/IListProps.ts:96](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L96)

___

### filterValues

• `Optional` **filterValues**: *Record*<string, any\>

Filter values

Defined in: [client/components/List/types/IListProps.ts:106](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L106)

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

Defined in: [client/components/List/types/IListProps.ts:121](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L121)

Defined in: [client/components/List/types/IListProps.ts:121](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L121)

___

### height

• `Optional` **height**: *number*

Fixed height

Defined in: [client/components/List/types/IListProps.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L40)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden state of the list

Defined in: [client/components/List/types/IListProps.ts:70](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L70)

___

### hideToolbar

• `Optional` **hideToolbar**: *boolean*

Hide the toolbar

Defined in: [client/components/List/types/IListProps.ts:116](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L116)

___

### items

• **items**: T[]

Items

Overrides: void

Defined in: [client/components/List/types/IListProps.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L25)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Defined in: [client/components/List/types/IListProps.ts:55](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L55)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Defined in: [client/components/List/types/IListProps.ts:60](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L60)

___

### menuItems

• `Optional` **menuItems**: *ListMenuItem*[]

Menu items to show in `<Toolbar />` if using the preview mode.

Defined in: [client/components/List/types/IListProps.ts:111](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L111)

___

### minmalHeaderColumns

• `Optional` **minmalHeaderColumns**: *boolean*

Use minimal header columns. Styled with small font size,
uppercase letters, some letter spacing and text shadows.

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

Defined in: [client/components/List/types/IListProps.ts:101](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L101)

___

### searchBox

• `Optional` **searchBox**: SearchBoxProps

Search box props

Defined in: [client/components/List/types/IListProps.ts:45](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L45)

___

### selectionProps

• `Optional` **selectionProps**: [SelectionMode, function?]

Selection props

Defined in: [client/components/List/types/IListProps.ts:50](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L50)
