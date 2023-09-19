[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IListColumnData

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

Defined in: [client/components/List/types/IListColumnData.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L23)

___

### filterType

• `Optional` **filterType**: () => [*BaseFilter*](../classes/components.basefilter.md)

Filter type. Should be a class that extends `BaseFilter`

#### Type declaration:

\+ **new IListColumnData**(): [*BaseFilter*](../classes/components.basefilter.md)

**Returns:** [*BaseFilter*](../classes/components.basefilter.md)

Defined in: [client/components/List/types/IListColumnData.ts:48](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L48)

Defined in: [client/components/List/types/IListColumnData.ts:48](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L48)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden column

Defined in: [client/components/List/types/IListColumnData.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L13)

___

### hiddenFromExport

• `Optional` **hiddenFromExport**: *boolean*

Hidden from Excel exports

Defined in: [client/components/List/types/IListColumnData.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L28)

___

### isFilterable

• `Optional` **isFilterable**: *boolean*

Is the column filterable?

Defined in: [client/components/List/types/IListColumnData.ts:38](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L38)

___

### isGroupable

• `Optional` **isGroupable**: *boolean*

Is the column groupable?

Defined in: [client/components/List/types/IListColumnData.ts:43](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L43)

___

### isSortable

• `Optional` **isSortable**: *boolean*

Is the column sortable?

Defined in: [client/components/List/types/IListColumnData.ts:33](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L33)

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

Defined in: [client/components/List/types/IListColumnData.ts:53](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L53)

Defined in: [client/components/List/types/IListColumnData.ts:53](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L53)

___

### subText

• `Optional` **subText**: *string*

Optional sub text

Defined in: [client/components/List/types/IListColumnData.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumnData.ts#L18)
