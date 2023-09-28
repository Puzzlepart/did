[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IListColumn

# Interface: IListColumn<T, P\>

[Components](../modules/components.md).IListColumn

## Type parameters

Name | Type | Default |
:------ | :------ | :------ |
`T` | *object* | *any* |
`P` | *object* | *any* |

## Hierarchy

* *IColumn*

  ↳ **IListColumn**

## Table of contents

### Properties

- [createRenderProps](components.ilistcolumn.md#createrenderprops)
- [data](components.ilistcolumn.md#data)
- [hidden](components.ilistcolumn.md#hidden)
- [renderAs](components.ilistcolumn.md#renderas)

## Properties

### createRenderProps

• `Optional` **createRenderProps**: (`item`: T) => *Partial*<P\>

Create render props to send to the component rendering the column.
E.g. `ProjectLink` or `CustomerLink`.

#### Type declaration:

▸ (`item`: T): *Partial*<P\>

#### Parameters:

Name | Type |
:------ | :------ |
`item` | T |

**Returns:** *Partial*<P\>

Defined in: [client/components/List/types/IListColumn.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L30)

Defined in: [client/components/List/types/IListColumn.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L30)

___

### data

• `Optional` **data**: [*IListColumnData*](components.ilistcolumndata.md)

Data for the column - `IListColumnData`

Overrides: void

Defined in: [client/components/List/types/IListColumn.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L14)

___

### hidden

• `Optional` **hidden**: *boolean*

The column should be hidden

Defined in: [client/components/List/types/IListColumn.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L19)

___

### renderAs

• `Optional` **renderAs**: [*ItemColumnRenderType*](../modules/components.md#itemcolumnrendertype)

How to render the column.

Defined in: [client/components/List/types/IListColumn.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L24)
