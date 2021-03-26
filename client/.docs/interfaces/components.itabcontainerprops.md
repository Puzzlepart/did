[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / ITabContainerProps

# Interface: ITabContainerProps

[Components](../modules/components.md).ITabContainerProps

## Hierarchy

* *Omit*<IPivotProps, *onLinkClick* \| *selectedKey*\>

  ↳ **ITabContainerProps**

## Table of contents

### Properties

- [fixedLinkWidth](components.itabcontainerprops.md#fixedlinkwidth)
- [hideIconsMobile](components.itabcontainerprops.md#hideiconsmobile)
- [itemProps](components.itabcontainerprops.md#itemprops)
- [items](components.itabcontainerprops.md#items)
- [level](components.itabcontainerprops.md#level)
- [linkHeight](components.itabcontainerprops.md#linkheight)
- [onTabChanged](components.itabcontainerprops.md#ontabchanged)

## Properties

### fixedLinkWidth

• `Optional` **fixedLinkWidth**: PrimitiveType

Fixed tab link width

Either specify boolean `true` or `false` or
specify the actual width. If `true` is specified
**45%** is used as the fixed width.

**`default`** false

Defined in: [components/TabContainer/types.ts:17](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L17)

___

### hideIconsMobile

• `Optional` **hideIconsMobile**: *boolean*

Hide tab link icons on mobile devices

**`default`** true

Defined in: [components/TabContainer/types.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L24)

___

### itemProps

• `Optional` **itemProps**: *IPivotItemProps*

Item properties that will be shared between
all tabs in the container

Defined in: [components/TabContainer/types.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L37)

___

### items

• `Optional` **items**: *any*[] \| *IPivotItemProps*[]

Optionally provide the item that are rendered
inside the tab container. This can be used instead of
using `useRef` and `children` when that doesn't
work as expected.

Defined in: [components/TabContainer/types.ts:52](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L52)

___

### level

• `Optional` **level**: *number*

Level in the navigation hierarchy

**`default`** 2

Defined in: [components/TabContainer/types.ts:44](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L44)

___

### linkHeight

• `Optional` **linkHeight**: *string* \| *number*

Tab link height on mobile devices

**`default`** 30

Defined in: [components/TabContainer/types.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L31)

___

### onTabChanged

• `Optional` **onTabChanged**: (`itemKey`: *string*) => *void*

On tab changd

#### Type declaration:

▸ (`itemKey`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`itemKey` | *string* |

**Returns:** *void*

Defined in: [components/TabContainer/types.ts:57](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L57)

Defined in: [components/TabContainer/types.ts:57](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L57)
