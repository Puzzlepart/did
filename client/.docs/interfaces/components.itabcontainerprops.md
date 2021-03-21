[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / ITabContainerProps

# Interface: ITabContainerProps

[Components](../modules/components.md).ITabContainerProps

## Hierarchy

* *IPivotProps*

  ↳ **ITabContainerProps**

## Table of contents

### Properties

- [fixedLinkWidth](components.itabcontainerprops.md#fixedlinkwidth)
- [hideIconsMobile](components.itabcontainerprops.md#hideiconsmobile)
- [itemProps](components.itabcontainerprops.md#itemprops)
- [items](components.itabcontainerprops.md#items)
- [linkHeight](components.itabcontainerprops.md#linkheight)

## Properties

### fixedLinkWidth

• `Optional` **fixedLinkWidth**: *string* \| *number* \| *boolean*

Fixed link width

Either specify boolean `true` or `false` or
specify the actual width. If `true` is specified
**45%** is used as the fixed width.

**`default`** false

Defined in: [components/TabContainer/types.ts:16](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L16)

___

### hideIconsMobile

• `Optional` **hideIconsMobile**: *boolean*

Hide icons on mobile devices

**`default`** true

Defined in: [components/TabContainer/types.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L23)

___

### itemProps

• `Optional` **itemProps**: *IPivotItemProps*

Item properties that will be shared between
all items in the pivot

Defined in: [components/TabContainer/types.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L36)

___

### items

• `Optional` **items**: *IPivotItemProps*[]

Optionally provide the item that are rendered
inside the Pivot. This can be used instead of
using `useRef` and `children` when that doesn't
work as expected.

Defined in: [components/TabContainer/types.ts:44](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L44)

___

### linkHeight

• `Optional` **linkHeight**: *string* \| *number*

Link height on mobile devices

**`default`** 30

Defined in: [components/TabContainer/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L30)