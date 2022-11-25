[did-client - v0.11.2](../README.md) / [Components](../modules/components.md) / IListProps

# Interface: IListProps<T\>

[Components](../modules/components.md).IListProps

## Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

## Hierarchy

* *IShimmeredDetailsListProps*

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
- [filters](components.ilistprops.md#filters)
- [height](components.ilistprops.md#height)
- [hidden](components.ilistprops.md#hidden)
- [items](components.ilistprops.md#items)
- [listGroupProps](components.ilistprops.md#listgroupprops)
- [listGroupRenderProps](components.ilistprops.md#listgrouprenderprops)
- [onFilter](components.ilistprops.md#onfilter)
- [searchBox](components.ilistprops.md#searchbox)
- [selectionProps](components.ilistprops.md#selectionprops)

## Properties

### columnHeaderProps

• `Optional` **columnHeaderProps**: *object*

Column header

#### Type declaration:

Name | Type |
:------ | :------ |
`className`? | *string* |
`onRender`? | *IRenderFunction*<IDetailsHeaderProps\> |

Defined in: [client/components/List/types.ts:146](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L146)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)[]

Columns

Overrides: void

Defined in: [client/components/List/types.ts:96](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L96)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Defined in: [client/components/List/types.ts:131](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L131)

___

### defaultSearchBoxWidth

• `Optional` **defaultSearchBoxWidth**: *number*

Default search box width

**`default`** 500

Defined in: [client/components/List/types.ts:162](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L162)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Overrides: void

Defined in: [client/components/List/types.ts:101](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L101)

___

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name. Set this property to enable Excel export of the
list data.

Defined in: [client/components/List/types.ts:155](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L155)

___

### filterPanelActions

• `Optional` **filterPanelActions**: *Element* \| *Element*[]

Filter panel actions

Defined in: [client/components/List/types.ts:167](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L167)

___

### filterValues

• `Optional` **filterValues**: *Record*<string, any\>

Filter values

Defined in: [client/components/List/types.ts:177](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L177)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Defined in: [client/components/List/types.ts:136](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L136)

___

### height

• `Optional` **height**: *number*

Fixed height

Defined in: [client/components/List/types.ts:106](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L106)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Defined in: [client/components/List/types.ts:141](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L141)

___

### items

• **items**: T[]

Items

Overrides: void

Defined in: [client/components/List/types.ts:91](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L91)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Defined in: [client/components/List/types.ts:121](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L121)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

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

Defined in: [client/components/List/types.ts:172](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L172)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Defined in: [client/components/List/types.ts:111](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L111)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Defined in: [client/components/List/types.ts:116](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L116)
