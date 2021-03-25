[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / IListProps

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

  ↳↳ [*IProjectListProps*](pages.iprojectlistprops.md)

## Table of contents

### Properties

- [checkboxVisibility](components.ilistprops.md#checkboxvisibility)
- [columns](components.ilistprops.md#columns)
- [commandBar](components.ilistprops.md#commandbar)
- [enableShimmer](components.ilistprops.md#enableshimmer)
- [filters](components.ilistprops.md#filters)
- [headerClassName](components.ilistprops.md#headerclassname)
- [height](components.ilistprops.md#height)
- [hidden](components.ilistprops.md#hidden)
- [items](components.ilistprops.md#items)
- [listGroupProps](components.ilistprops.md#listgroupprops)
- [listGroupRenderProps](components.ilistprops.md#listgrouprenderprops)
- [onRenderColumnHeader](components.ilistprops.md#onrendercolumnheader)
- [onRenderDetailsHeader](components.ilistprops.md#onrenderdetailsheader)
- [searchBox](components.ilistprops.md#searchbox)
- [selectionProps](components.ilistprops.md#selectionprops)

## Properties

### checkboxVisibility

• `Optional` **checkboxVisibility**: CheckboxVisibility

Check box visibility

Overrides: void

Defined in: [components/List/types.tsx:115](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L115)

___

### columns

• `Optional` **columns**: [*IListColumn*](components.ilistcolumn.md)<[*IListColumnData*](components.ilistcolumndata.md)\>[]

Columns

Overrides: void

Defined in: [components/List/types.tsx:70](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L70)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Defined in: [components/List/types.tsx:110](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L110)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Overrides: void

Defined in: [components/List/types.tsx:75](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L75)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Defined in: [components/List/types.tsx:125](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L125)

___

### headerClassName

• `Optional` **headerClassName**: *string*

Overriding class name for header

Defined in: [components/List/types.tsx:135](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L135)

___

### height

• `Optional` **height**: *number*

Fixed height

Defined in: [components/List/types.tsx:80](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L80)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Defined in: [components/List/types.tsx:130](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L130)

___

### items

• **items**: T[]

Items

Overrides: void

Defined in: [components/List/types.tsx:65](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L65)

___

### listGroupProps

• `Optional` **listGroupProps**: [*IListGroupProps*](components.ilistgroupprops.md)

Group props

Defined in: [components/List/types.tsx:95](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L95)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Defined in: [components/List/types.tsx:100](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L100)

___

### onRenderColumnHeader

• `Optional` **onRenderColumnHeader**: *IRenderFunction*<IDetailsColumnRenderTooltipProps\>

Callback to render the column header

Defined in: [components/List/types.tsx:120](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L120)

___

### onRenderDetailsHeader

• `Optional` **onRenderDetailsHeader**: *IRenderFunction*<IDetailsHeaderProps\>

On render details header

Overrides: void

Defined in: [components/List/types.tsx:105](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L105)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Defined in: [components/List/types.tsx:85](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L85)

___

### selectionProps

• `Optional` **selectionProps**: [*IListSelectionProps*](components.ilistselectionprops.md)<any\>

Selection

Defined in: [components/List/types.tsx:90](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L90)
