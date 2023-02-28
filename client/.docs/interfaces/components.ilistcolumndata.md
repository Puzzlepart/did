[did-client - v0.11.5](../README.md) / [Components](../modules/components.md) / IListColumnData

# Interface: IListColumnData

[Components](../modules/components.md).IListColumnData

## Table of contents

### Properties

- [excelColFormat](components.ilistcolumndata.md#excelcolformat)
- [filterType](components.ilistcolumndata.md#filtertype)
- [hidden](components.ilistcolumndata.md#hidden)
- [hiddenFromExport](components.ilistcolumndata.md#hiddenfromexport)
- [isFilterable](components.ilistcolumndata.md#isfilterable)
- [isGroupable](components.ilistcolumndata.md#isgroupable)
- [isSortable](components.ilistcolumndata.md#issortable)
- [onRenderColumnHeader](components.ilistcolumndata.md#onrendercolumnheader)
- [subText](components.ilistcolumndata.md#subtext)

## Properties

### excelColFormat

• `Optional` **excelColFormat**: *date*

Excel column format

Defined in: [components/List/types.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L32)

___

### filterType

• `Optional` **filterType**: () => [*BaseFilter*](../classes/components.basefilter.md)

Filter type. Should be a class that extends `BaseFilter`

#### Type declaration:

\+ **new IListColumnData**(): [*BaseFilter*](../classes/components.basefilter.md)

**Returns:** [*BaseFilter*](../classes/components.basefilter.md)

Defined in: [components/List/types.ts:57](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L57)

Defined in: [components/List/types.ts:57](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L57)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden column

Defined in: [components/List/types.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L22)

___

### hiddenFromExport

• `Optional` **hiddenFromExport**: *boolean*

Hidden from Excel exports

Defined in: [components/List/types.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L37)

___

### isFilterable

• `Optional` **isFilterable**: *boolean*

Is the column filterable?

Defined in: [components/List/types.ts:47](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L47)

___

### isGroupable

• `Optional` **isGroupable**: *boolean*

Is the column groupable?

Defined in: [components/List/types.ts:52](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L52)

___

### isSortable

• `Optional` **isSortable**: *boolean*

Is the column sortable?

Defined in: [components/List/types.ts:42](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L42)

___

### onRenderColumnHeader

• `Optional` **onRenderColumnHeader**: (`props`: *IDetailsColumnRenderTooltipProps*) => *Element*

Callback to render a tooltip for the column header

#### Type declaration:

▸ (`props`: *IDetailsColumnRenderTooltipProps*): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | *IDetailsColumnRenderTooltipProps* |

**Returns:** *Element*

Defined in: [components/List/types.ts:62](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L62)

Defined in: [components/List/types.ts:62](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L62)

___

### subText

• `Optional` **subText**: *string*

Optional sub text

Defined in: [components/List/types.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L27)
