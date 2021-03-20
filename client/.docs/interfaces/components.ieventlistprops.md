[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / IEventListProps

# Interface: IEventListProps

[Components](../modules/components.md).IEventListProps

## Hierarchy

* *IListProps*

  ↳ **IEventListProps**

## Table of contents

### Properties

- [additionalColumns](components.ieventlistprops.md#additionalcolumns)
- [checkboxVisibility](components.ieventlistprops.md#checkboxvisibility)
- [columnWidths](components.ieventlistprops.md#columnwidths)
- [columns](components.ieventlistprops.md#columns)
- [commandBar](components.ieventlistprops.md#commandbar)
- [dateFormat](components.ieventlistprops.md#dateformat)
- [enableShimmer](components.ieventlistprops.md#enableshimmer)
- [fadeIn](components.ieventlistprops.md#fadein)
- [filters](components.ieventlistprops.md#filters)
- [headerClassName](components.ieventlistprops.md#headerclassname)
- [height](components.ieventlistprops.md#height)
- [hidden](components.ieventlistprops.md#hidden)
- [items](components.ieventlistprops.md#items)
- [listGroupProps](components.ieventlistprops.md#listgroupprops)
- [listGroupRenderProps](components.ieventlistprops.md#listgrouprenderprops)
- [onRenderColumnHeader](components.ieventlistprops.md#onrendercolumnheader)
- [onRenderDetailsHeader](components.ieventlistprops.md#onrenderdetailsheader)
- [resizableColumns](components.ieventlistprops.md#resizablecolumns)
- [searchBox](components.ieventlistprops.md#searchbox)
- [selectionProps](components.ieventlistprops.md#selectionprops)
- [showEmptyDays](components.ieventlistprops.md#showemptydays)

## Properties

### additionalColumns

• `Optional` **additionalColumns**: IColumn[]

An array of additional columns to add

Defined in: [components/EventList/types.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L18)

___

### checkboxVisibility

• `Optional` **checkboxVisibility**: CheckboxVisibility

Check box visibility

Defined in: [components/List/types.tsx:105](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L105)

___

### columnWidths

• `Optional` **columnWidths**: *ITypedHash*<number\>

Column width overrides

Defined in: [components/EventList/types.tsx:38](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L38)

___

### columns

• `Optional` **columns**: *IListColumn*<IListColumnData\>[]

Columns

Defined in: [components/List/types.tsx:60](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L60)

___

### commandBar

• `Optional` **commandBar**: *ICommandBarProps*

Command bar props

Defined in: [components/List/types.tsx:100](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L100)

___

### dateFormat

• `Optional` **dateFormat**: *string*

Date format

Defined in: [components/EventList/types.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L23)

___

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer

Defined in: [components/EventList/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L13)

___

### fadeIn

• `Optional` **fadeIn**: [*number*, *number*]

Fade in properties used by the FadeIn component (react-fade-in)

[delay, transitionDuration]

Defined in: [components/List/types.tsx:117](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L117)

___

### filters

• `Optional` **filters**: *object*

Filters

#### Type declaration:

Defined in: [components/List/types.tsx:122](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L122)

___

### headerClassName

• `Optional` **headerClassName**: *string*

Overriding class name for header

Defined in: [components/List/types.tsx:132](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L132)

___

### height

• `Optional` **height**: *number*

Fixed height

Defined in: [components/List/types.tsx:70](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L70)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden

Defined in: [components/List/types.tsx:127](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L127)

___

### items

• **items**: *any*[]

Items

Defined in: [components/List/types.tsx:55](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L55)

___

### listGroupProps

• `Optional` **listGroupProps**: IListGroupProps

Groups to render

Defined in: [components/EventList/types.tsx:28](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L28)

___

### listGroupRenderProps

• `Optional` **listGroupRenderProps**: IDetailsGroupRenderProps

Group render props

Defined in: [components/List/types.tsx:90](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L90)

___

### onRenderColumnHeader

• `Optional` **onRenderColumnHeader**: *IRenderFunction*<IDetailsColumnRenderTooltipProps\>

Callback to render the column header

Defined in: [components/List/types.tsx:110](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L110)

___

### onRenderDetailsHeader

• `Optional` **onRenderDetailsHeader**: *IRenderFunction*<IDetailsHeaderProps\>

On render details header

Defined in: [components/List/types.tsx:95](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L95)

___

### resizableColumns

• `Optional` **resizableColumns**: *boolean*

Resizable columns

Defined in: [components/EventList/types.tsx:43](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L43)

___

### searchBox

• `Optional` **searchBox**: *ISearchBoxProps*

Search box props

Defined in: [components/List/types.tsx:75](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L75)

___

### selectionProps

• `Optional` **selectionProps**: *IListSelectionProps*<any\>

Selection

Defined in: [components/List/types.tsx:80](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L80)

___

### showEmptyDays

• `Optional` **showEmptyDays**: *boolean*

Show empty days

Defined in: [components/EventList/types.tsx:33](https://github.com/Puzzlepart/did/blob/dev/client/components/EventList/types.tsx#L33)
