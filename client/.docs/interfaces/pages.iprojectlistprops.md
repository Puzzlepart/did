[did-client - v0.12.0](../README.md) / [Pages](../modules/pages.md) / IProjectListProps

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

Defined in: [client/components/List/types/IListProps.ts:75](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L75)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<any\>[]

Columns

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L30)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:65](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L65)

___

### defaultSearchBoxWidth

• `Optional` **defaultSearchBoxWidth**: *number*

Default search box width

**`default`** 500

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:91](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L91)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L35)

___

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name. Set this property to enable Excel export of the
list data.

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:84](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L84)

___

### filterPanelActions

• `Optional` **filterPanelActions**: *Element* \| *Element*[]

Filter panel actions

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:96](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L96)

___

### filterValues

• `Optional` **filterValues**: *Record*<string, any\>

Filter values

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:106](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L106)

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

Defined in: [client/components/List/types/IListProps.ts:121](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L121)

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:121](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L121)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L40)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden state of the list

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:70](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L70)

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

Defined in: [client/components/List/types/IListProps.ts:116](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L116)

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

Defined in: [client/components/List/types/IListProps.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L25)

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

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:55](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L55)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:60](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L60)

___

### menuItems

• `Optional` **menuItems**: *ListMenuItem*[]

Menu items to show in `<Toolbar />` if using the preview mode.

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:111](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L111)

___

### minmalHeaderColumns

• `Optional` **minmalHeaderColumns**: *boolean*

Use minimal header columns. Styled with small font size,
uppercase letters, some letter spacing and text shadows.

Inherited from: void

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

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:101](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L101)

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

Defined in: [client/components/List/types/IListProps.ts:45](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L45)

___

### selectionProps

• `Optional` **selectionProps**: [SelectionMode, function?]

Selection props

Inherited from: void

Defined in: [client/components/List/types/IListProps.ts:50](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListProps.ts#L50)
