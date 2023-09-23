[did-client - v0.13.0](../README.md) / [Components](../modules/components.md) / IBasePanelProps

# Interface: IBasePanelProps

[Components](../modules/components.md).IBasePanelProps

Props for the `BasePanel` component.

## Hierarchy

* *IPanelProps*

  ↳ **IBasePanelProps**

## Table of contents

### Properties

- [footerActions](components.ibasepanelprops.md#footeractions)
- [headerActions](components.ibasepanelprops.md#headeractions)
- [headerSubText](components.ibasepanelprops.md#headersubtext)
- [headerSubTextProps](components.ibasepanelprops.md#headersubtextprops)
- [scroll](components.ibasepanelprops.md#scroll)

## Properties

### footerActions

• `Optional` **footerActions**: [*IDynamicButtonProps*](components.idynamicbuttonprops.md)[]

Actions to display in the footer of the panel.

Defined in: [client/components/BasePanel/types.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/components/BasePanel/types.ts#L31)

___

### headerActions

• `Optional` **headerActions**: [*IDynamicButtonProps*](components.idynamicbuttonprops.md)[]

Actions to display in the header of the panel.

Defined in: [client/components/BasePanel/types.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/components/BasePanel/types.ts#L26)

___

### headerSubText

• `Optional` **headerSubText**: *string*

Header sub text to display in the panel. Use this
if you want to show more information about the panel.
Use `headerSubTextProps` to style the header sub text.

Defined in: [client/components/BasePanel/types.ts:14](https://github.com/Puzzlepart/did/blob/dev/client/components/BasePanel/types.ts#L14)

___

### headerSubTextProps

• `Optional` **headerSubTextProps**: TextProps

Props for the header sub text.

**`default`** ```{ size: 400 }```

Defined in: [client/components/BasePanel/types.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/components/BasePanel/types.ts#L21)

___

### scroll

• `Optional` **scroll**: *boolean*

Whether or not the panel should have a scroll bar. If set to
`true`, the scrollable content container will have `overflow`
set to `auto`, otherwise it will be set to `visible`.

Defined in: [client/components/BasePanel/types.ts:38](https://github.com/Puzzlepart/did/blob/dev/client/components/BasePanel/types.ts#L38)
