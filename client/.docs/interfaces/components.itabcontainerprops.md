[did-client - v0.10.7](../README.md) / [Components](../modules/components.md) / ITabContainerProps

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

• `Optional` **fixedLinkWidth**: *string* \| *number* \| *boolean*

Fixed tab link width

Either specify boolean `true` or `false` or
specify the actual width. If `true` is specified
**45%** is used as the fixed width.

**`default`** false

Defined in: [client/components/TabContainer/types.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L18)

___

### hideIconsMobile

• `Optional` **hideIconsMobile**: *boolean*

Hide tab link icons on mobile devices

**`default`** true

Defined in: [client/components/TabContainer/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L25)

___

### itemProps

• `Optional` **itemProps**: *IPivotItemProps*

Item properties that will be shared between
all tabs in the container

Defined in: [client/components/TabContainer/types.ts:38](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L38)

___

### items

• `Optional` **items**: *any*[] \| *IPivotItemProps*[]

Optionally provide the item that are rendered
inside the tab container. This can be used instead of
using `useRef` and `children` when that doesn't
work as expected.

Defined in: [client/components/TabContainer/types.ts:53](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L53)

___

### level

• `Optional` **level**: *number*

Level in the navigation hierarchy

**`default`** 2

Defined in: [client/components/TabContainer/types.ts:45](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L45)

___

### linkHeight

• `Optional` **linkHeight**: *string* \| *number*

Tab link height on mobile devices

**`default`** 30

Defined in: [client/components/TabContainer/types.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L32)

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

Defined in: [client/components/TabContainer/types.ts:58](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L58)

Defined in: [client/components/TabContainer/types.ts:58](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L58)
