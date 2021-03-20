[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / IProjectListProps

# Interface: IProjectListProps

[Pages](../modules/pages.md).IProjectListProps

## Hierarchy

* *IListProps*<Project\>

  ↳ **IProjectListProps**

## Table of contents

### Properties

- [checkboxVisibility](pages.iprojectlistprops.md#checkboxvisibility)
- [columns](pages.iprojectlistprops.md#columns)
- [commandBar](pages.iprojectlistprops.md#commandbar)
- [enableShimmer](pages.iprojectlistprops.md#enableshimmer)
- [fadeIn](pages.iprojectlistprops.md#fadein)
- [filters](pages.iprojectlistprops.md#filters)
- [headerClassName](pages.iprojectlistprops.md#headerclassname)
- [height](pages.iprojectlistprops.md#height)
- [hidden](pages.iprojectlistprops.md#hidden)
- [hideColumns](pages.iprojectlistprops.md#hidecolumns)
- [items](pages.iprojectlistprops.md#items)
- [listGroupProps](pages.iprojectlistprops.md#listgroupprops)
- [listGroupRenderProps](pages.iprojectlistprops.md#listgrouprenderprops)
- [onRenderColumnHeader](pages.iprojectlistprops.md#onrendercolumnheader)
- [onRenderDetailsHeader](pages.iprojectlistprops.md#onrenderdetailsheader)
- [renderLink](pages.iprojectlistprops.md#renderlink)
- [searchBox](pages.iprojectlistprops.md#searchbox)
- [selectionProps](pages.iprojectlistprops.md#selectionprops)

## Properties

### checkboxVisibility

• `Optional` **checkboxVisibility**: CheckboxVisibility

Check box visibility

Defined in: [components/List/types.tsx:105](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L105)

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

### enableShimmer

• `Optional` **enableShimmer**: *boolean*

Enable shimmer (normally while loading)

Defined in: [components/List/types.tsx:65](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L65)

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

### hideColumns

• `Optional` **hideColumns**: *string*[]

Defined in: [pages/Projects/ProjectList/types.tsx:10](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L10)

___

### items

• **items**: *Project*[]

Items

Defined in: [components/List/types.tsx:55](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L55)

___

### listGroupProps

• `Optional` **listGroupProps**: IListGroupProps

Group props

Defined in: [components/List/types.tsx:85](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.tsx#L85)

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

### renderLink

• `Optional` **renderLink**: *boolean*

Defined in: [pages/Projects/ProjectList/types.tsx:9](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/ProjectList/types.tsx#L9)

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
