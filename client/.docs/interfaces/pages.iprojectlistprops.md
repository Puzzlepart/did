[did-client - v0.11.2](../README.md) / [Pages](../modules/pages.md) / IProjectListProps

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
- [defaultSearchBoxWidth](pages.iprojectlistprops.md#defaultsearchboxwidth)
- [enableShimmer](pages.iprojectlistprops.md#enableshimmer)
- [exportFileName](pages.iprojectlistprops.md#exportfilename)
- [filterPanelActions](pages.iprojectlistprops.md#filterpanelactions)
- [filterValues](pages.iprojectlistprops.md#filtervalues)
- [filters](pages.iprojectlistprops.md#filters)
- [height](pages.iprojectlistprops.md#height)
- [hidden](pages.iprojectlistprops.md#hidden)
- [hideColumns](pages.iprojectlistprops.md#hidecolumns)
- [items](pages.iprojectlistprops.md#items)
- [linkOnClick](pages.iprojectlistprops.md#linkonclick)
- [listGroupProps](pages.iprojectlistprops.md#listgroupprops)
- [listGroupRenderProps](pages.iprojectlistprops.md#listgrouprenderprops)
- [onFilter](pages.iprojectlistprops.md#onfilter)
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

Defined in: [client/components/List/types.ts:146](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L146)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)[]

Columns

Inherited from: void

Defined in: [client/components/List/types.ts:96](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L96)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Inherited from: void

Defined in: [client/components/List/types.ts:131](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L131)

___

### defaultSearchBoxWidth

• `Optional` **defaultSearchBoxWidth**: *number*

Default search box width

**`default`** 500

Inherited from: void

Defined in: [client/components/List/types.ts:162](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L162)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Inherited from: void

Defined in: [client/components/List/types.ts:101](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L101)

___

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name. Set this property to enable Excel export of the
list data.

Inherited from: void

Defined in: [client/components/List/types.ts:155](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L155)

___

### filterPanelActions

• `Optional` **filterPanelActions**: *Element* \| *Element*[]

Filter panel actions

Inherited from: void

Defined in: [client/components/List/types.ts:167](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L167)

___

### filterValues

• `Optional` **filterValues**: *Record*<string, any\>

Filter values

Inherited from: void

Defined in: [client/components/List/types.ts:177](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L177)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Inherited from: void

Defined in: [client/components/List/types.ts:136](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L136)

___

### height

• `Optional` **height**: *number*

Fixed height

Inherited from: void

Defined in: [client/components/List/types.ts:106](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L106)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Inherited from: void

Defined in: [client/components/List/types.ts:141](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L141)

___

### hideColumns

• `Optional` **hideColumns**: *string*[]

Defined in: [client/pages/Projects/ProjectList/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L13)

___

### items

• **items**: *Project*[]

Items

Inherited from: void

Defined in: [client/components/List/types.ts:91](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L91)

___

### linkOnClick

• `Optional` **linkOnClick**: (`project`: *Project*) => *void*

#### Type declaration:

▸ (`project`: *Project*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`project` | *Project* |

**Returns:** *void*

Defined in: [client/pages/Projects/ProjectList/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L12)

Defined in: [client/pages/Projects/ProjectList/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L12)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Inherited from: void

Defined in: [client/components/List/types.ts:121](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L121)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Inherited from: void

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

Defined in: [client/components/List/types.ts:172](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L172)

Inherited from: void

Defined in: [client/components/List/types.ts:172](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L172)

___

### renderLink

• `Optional` **renderLink**: *boolean*

Defined in: [client/pages/Projects/ProjectList/types.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L11)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Inherited from: void

Defined in: [client/components/List/types.ts:111](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L111)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Inherited from: void

Defined in: [client/components/List/types.ts:116](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L116)
