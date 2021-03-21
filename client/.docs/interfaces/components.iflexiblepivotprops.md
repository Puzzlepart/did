[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / IFlexiblePivotProps

# Interface: IFlexiblePivotProps

[Components](../modules/components.md).IFlexiblePivotProps

## Hierarchy

* *IPivotProps*

  ↳ **IFlexiblePivotProps**

## Table of contents

### Properties

- [fixedLinkWidth](components.iflexiblepivotprops.md#fixedlinkwidth)
- [hideIconsMobile](components.iflexiblepivotprops.md#hideiconsmobile)
- [itemProps](components.iflexiblepivotprops.md#itemprops)
- [items](components.iflexiblepivotprops.md#items)
- [linkHeight](components.iflexiblepivotprops.md#linkheight)

## Properties

### fixedLinkWidth

• `Optional` **fixedLinkWidth**: *string* \| *number* \| *boolean*

Fixed link width

Either specify boolean `true` or `false` or
specify the actual width. If `true` is specified
**45%** is used as the fixed width.

**`default`** false

Defined in: [components/FlexiblePivot/types.ts:15](https://github.com/Puzzlepart/did/blob/dev/client/components/FlexiblePivot/types.ts#L15)

___

### hideIconsMobile

• `Optional` **hideIconsMobile**: *boolean*

Hide icons on mobile devices

**`default`** true

Defined in: [components/FlexiblePivot/types.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/components/FlexiblePivot/types.ts#L22)

___

### itemProps

• `Optional` **itemProps**: *IPivotItemProps*

Item properties that will be shared between
all items in the pivot

Defined in: [components/FlexiblePivot/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/components/FlexiblePivot/types.ts#L35)

___

### items

• `Optional` **items**: *IPivotItemProps*[]

Optionally provide the item that are rendered
inside the Pivot. This can be used instead of
using `useRef` and `children` when that doesn't
work as expected.

Defined in: [components/FlexiblePivot/types.ts:43](https://github.com/Puzzlepart/did/blob/dev/client/components/FlexiblePivot/types.ts#L43)

___

### linkHeight

• `Optional` **linkHeight**: *string* \| *number*

Link height on mobile devices

**`default`** 30

Defined in: [components/FlexiblePivot/types.ts:29](https://github.com/Puzzlepart/did/blob/dev/client/components/FlexiblePivot/types.ts#L29)
