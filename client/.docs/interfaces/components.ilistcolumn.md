[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IListColumn

# Interface: IListColumn<T\>

[Components](../modules/components.md).IListColumn

## Type parameters

Name | Type | Default |
:------ | :------ | :------ |
`T` | *object* | *any* |

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

• `Optional` **createRenderProps**: (`item`: T) => *any*

Create render props to send to the component rendering the column.
E.g. `ProjectLink` or `CustomerLink`.

#### Type declaration:

▸ (`item`: T): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`item` | T |

**Returns:** *any*

Defined in: [client/components/List/types/IListColumn.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L31)

Defined in: [client/components/List/types/IListColumn.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L31)

___

### data

• `Optional` **data**: [*IListColumnData*](components.ilistcolumndata.md)

Data for the column - `IListColumnData`

Overrides: void

Defined in: [client/components/List/types/IListColumn.ts:12](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L12)

___

### hidden

• `Optional` **hidden**: *boolean*

The column should be hidden

Defined in: [client/components/List/types/IListColumn.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L17)

___

### renderAs

• `Optional` **renderAs**: *timeFromNow* \| *customerLink* \| *projectLink*

How to render the column

- `timeFromNow` - render the column as a time from now
- `customerLink` - render the column as a customer link

Defined in: [client/components/List/types/IListColumn.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListColumn.ts#L25)
