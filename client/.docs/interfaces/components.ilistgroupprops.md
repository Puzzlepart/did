[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IListGroupProps

# Interface: IListGroupProps<T\>

[Components](../modules/components.md).IListGroupProps

## Type parameters

Name | Default |
:------ | :------ |
`T` | *any* |

## Table of contents

### Properties

- [emptyGroupName](components.ilistgroupprops.md#emptygroupname)
- [fieldName](components.ilistgroupprops.md#fieldname)
- [groupData](components.ilistgroupprops.md#groupdata)
- [groupNames](components.ilistgroupprops.md#groupnames)
- [totalFunc](components.ilistgroupprops.md#totalfunc)

## Properties

### emptyGroupName

• `Optional` **emptyGroupName**: *string*

The name of the empty group.

Defined in: [client/components/List/types/IListGroupProps.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListGroupProps.ts#L24)

___

### fieldName

• **fieldName**: *string*

The name of the field to group by.

Defined in: [client/components/List/types/IListGroupProps.ts:9](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListGroupProps.ts#L9)

___

### groupData

• `Optional` **groupData**: *any*[]

The data of the groups.

Defined in: [client/components/List/types/IListGroupProps.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListGroupProps.ts#L19)

___

### groupNames

• `Optional` **groupNames**: *string*[]

The names of the groups.

Defined in: [client/components/List/types/IListGroupProps.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListGroupProps.ts#L14)

___

### totalFunc

• `Optional` **totalFunc**: (`items`: T[]) => *string*

Function to get the total for the group.

**`param`** The items of the group.

#### Type declaration:

▸ (`items`: T[]): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`items` | T[] |

**Returns:** *string*

Defined in: [client/components/List/types/IListGroupProps.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListGroupProps.ts#L31)

Defined in: [client/components/List/types/IListGroupProps.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/List/types/IListGroupProps.ts#L31)
