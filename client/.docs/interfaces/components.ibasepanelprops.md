[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IBasePanelProps

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
- [scroll](components.ibasepanelprops.md#scroll)

## Properties

### footerActions

• `Optional` **footerActions**: [*IDynamicButtonProps*](components.idynamicbuttonprops.md)[]

Actions to display in the footer of the panel.

Defined in: [client/components/BasePanel/types.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/components/BasePanel/types.ts#L23)

___

### headerActions

• `Optional` **headerActions**: [*IDynamicButtonProps*](components.idynamicbuttonprops.md)[]

Actions to display in the header of the panel.

Defined in: [client/components/BasePanel/types.ts:18](https://github.com/Puzzlepart/did/blob/dev/client/components/BasePanel/types.ts#L18)

___

### headerSubText

• `Optional` **headerSubText**: *string*

Header sub text to display in the panel. This text will be
displayed in a `<Caption1 />` component from `@fluentui/react-components`.
Use this if you want to show more information about the panel.

Defined in: [client/components/BasePanel/types.ts:13](https://github.com/Puzzlepart/did/blob/dev/client/components/BasePanel/types.ts#L13)

___

### scroll

• `Optional` **scroll**: *boolean*

Whether or not the panel should have a scroll bar. If set to
`true`, the scrollable content container will have `overflow`
set to `auto`, otherwise it will be set to `visible`.

Defined in: [client/components/BasePanel/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/components/BasePanel/types.ts#L30)
