[did-client - v0.13.0](../README.md) / [Pages](../modules/pages.md) / IProjectListProps

# Interface: IProjectListProps

[Pages](../modules/pages.md).IProjectListProps

Props for the ProjectList component.

## Hierarchy

* *Omit*<[*IListProps*](components.ilistprops.md)<Project\>, *role*\>

  ↳ **IProjectListProps**

## Table of contents

### Properties

- [columnHeaderProps](pages.iprojectlistprops.md#columnheaderprops)
- [columns](pages.iprojectlistprops.md#columns)
- [commandBar](pages.iprojectlistprops.md#commandbar)
- [defaultSearchBoxWidth](pages.iprojectlistprops.md#defaultsearchboxwidth)
- [enableShimmer](pages.iprojectlistprops.md#enableshimmer)
- [exportFileName](pages.iprojectlistprops.md#exportfilename)
- [filterPanelActions](pages.iprojectlistprops.md#filterpanelactions)
- [filterValues](pages.iprojectlistprops.md#filtervalues)
- [getColumnStyle](pages.iprojectlistprops.md#getcolumnstyle)
- [height](pages.iprojectlistprops.md#height)
- [hidden](pages.iprojectlistprops.md#hidden)
- [hideColumns](pages.iprojectlistprops.md#hidecolumns)
- [hideToolbar](pages.iprojectlistprops.md#hidetoolbar)
- [id](pages.iprojectlistprops.md#id)
- [items](pages.iprojectlistprops.md#items)
- [linkOnClick](pages.iprojectlistprops.md#linkonclick)
- [listGroupProps](pages.iprojectlistprops.md#listgroupprops)
- [listGroupRenderProps](pages.iprojectlistprops.md#listgrouprenderprops)
- [menuItems](pages.iprojectlistprops.md#menuitems)
- [minmalHeaderColumns](pages.iprojectlistprops.md#minmalheadercolumns)
- [onFilter](pages.iprojectlistprops.md#onfilter)
- [renderLink](pages.iprojectlistprops.md#renderlink)
- [searchBox](pages.iprojectlistprops.md#searchbox)
- [selectionProps](pages.iprojectlistprops.md#selectionprops)

## Properties

### columnHeaderProps

• `Optional` **columnHeaderProps**: *object*

Column header props

#### Type declaration:

Name | Type |
:------ | :------ |
`className`? | *string* |
`onRender`? | *IRenderFunction*<IDetailsHeaderProps\> |

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:76](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L76)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<any\>[]

Columns

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L31)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:66](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L66)

___

### defaultSearchBoxWidth

• `Optional` **defaultSearchBoxWidth**: *number*

Default search box width

**`default`** 500

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:92](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L92)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L36)

___

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name. Set this property to enable Excel export of the
list data.

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:85](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L85)

___

### filterPanelActions

• `Optional` **filterPanelActions**: *Element* \| *Element*[]

Filter panel actions

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:97](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L97)

___

### filterValues

• `Optional` **filterValues**: *Record*<string, any\>

Filter values

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:107](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L107)

___

### getColumnStyle

• `Optional` **getColumnStyle**: (`item`: *Project*) => *CSSProperties*

Get column style for the specified item

#### Type declaration:

▸ (`item`: *Project*): *CSSProperties*

#### Parameters:

Name | Type |
:------ | :------ |
`item` | *Project* |

**Returns:** *CSSProperties*

Defined in: [client/components/List/types/IListProps.ts:122](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L122)

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:122](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L122)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L41)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden state of the list

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:71](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L71)

___

### hideColumns

• `Optional` **hideColumns**: *string*[]

An array of column names to hide.

Defined in: [client/pages/Projects/ProjectList/types.tsx:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L27)

___

### hideToolbar

• `Optional` **hideToolbar**: *boolean*

Hide the toolbar

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:117](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L117)

___

### id

• `Optional` **id**: *s* \| *m*

Id of the tab.

Overrides: void

Defined in: [client/pages/Projects/ProjectList/types.tsx:32](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L32)

___

### items

• **items**: *Project*[]

Items

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L26)

___

### linkOnClick

• `Optional` **linkOnClick**: (`project`: *Project*) => *void*

Function to be called when a project link is clicked.

**`param`** The project that was clicked.

#### Type declaration:

▸ (`project`: *Project*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`project` | *Project* |

**Returns:** *void*

Defined in: [client/pages/Projects/ProjectList/types.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L22)

Defined in: [client/pages/Projects/ProjectList/types.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L22)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)<any\>

Group props

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:56](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L56)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:61](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L61)

___

### menuItems

• `Optional` **menuItems**: *ListMenuItem*[]

Menu items to show in `<Toolbar />` if using the preview mode.

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:112](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L112)

___

### minmalHeaderColumns

• `Optional` **minmalHeaderColumns**: *boolean*

Use minimal header columns. Styled with small font size,
uppercase letters, some letter spacing and text shadows.

Inherited from: void

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

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:102](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L102)

___

### renderLink

• `Optional` **renderLink**: *boolean*

Determines whether to render a link for each project.

Defined in: [client/pages/Projects/ProjectList/types.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L16)

___

### searchBox

• `Optional` **searchBox**: SearchBoxProps

Search box props

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L46)

___

### selectionProps

• `Optional` **selectionProps**: [SelectionMode, function?]

Selection props

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:51](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L51)
