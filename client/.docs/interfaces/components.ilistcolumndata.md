[did-client - v0.11.0](../README.md) / [Components](../modules/components.md) / IListColumnData

# Interface: IListColumnData

[Components](../modules/components.md).IListColumnData

## Table of contents

### Properties

- [excelColFormat](components.ilistcolumndata.md#excelcolformat)
- [hidden](components.ilistcolumndata.md#hidden)
- [hiddenFromExport](components.ilistcolumndata.md#hiddenfromexport)
- [onRenderColumnHeader](components.ilistcolumndata.md#onrendercolumnheader)
- [subText](components.ilistcolumndata.md#subtext)

## Properties

### excelColFormat

• `Optional` **excelColFormat**: *date*

Excel column format

Defined in: [client/components/List/types.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L31)

___

### hidden

• `Optional` **hidden**: *boolean*

Hidden column

Defined in: [client/components/List/types.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L21)

___

### hiddenFromExport

• `Optional` **hiddenFromExport**: *boolean*

Hidden from Excel exports

Defined in: [client/components/List/types.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L36)

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

Defined in: [client/components/List/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L41)

Defined in: [client/components/List/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L41)

___

### subText

• `Optional` **subText**: *string*

Optional sub text

Defined in: [client/components/List/types.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types.ts#L26)
