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

Defined in: [client/components/List/types/IListColumn.ts:34](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L34)

Defined in: [client/components/List/types/IListColumn.ts:34](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L34)

___

### data

• `Optional` **data**: [*IListColumnData*](components.ilistcolumndata.md)

Data for the column - `IListColumnData`

Overrides: void

Defined in: [client/components/List/types/IListColumn.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L13)

___

### hidden

• `Optional` **hidden**: *boolean*

The column should be hidden

Defined in: [client/components/List/types/IListColumn.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L18)

___

### renderAs

• `Optional` **renderAs**: *timeFromNow* \| *customerLink* \| *projectLink* \| *projectTag*

How to render the column

- `timeFromNow` - render the column as a time from now
- `customerLink` - render the column as a customer link
- `projectLink` - render the column as a project link
- `projectTag` - render the column as a project tag

Defined in: [client/components/List/types/IListColumn.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L28)
