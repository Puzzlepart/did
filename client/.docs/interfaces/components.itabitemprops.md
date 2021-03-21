[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / ITabItemProps

# Interface: ITabItemProps

[Components](../modules/components.md).ITabItemProps

## Hierarchy

* *Omit*<IPivotItemProps, *hidden*\>

  ↳ **ITabItemProps**

## Table of contents

### Properties

- [headerText](components.itabitemprops.md#headertext)
- [iconName](components.itabitemprops.md#iconname)
- [itemKey](components.itabitemprops.md#itemkey)
- [permission](components.itabitemprops.md#permission)

## Properties

### headerText

• `Optional` **headerText**: *string*

The text for the tab link

Defined in: [components/TabContainer/types.ts:58](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L58)

___

### iconName

• `Optional` **iconName**: *string*

An optional icon to show next to the tab link.

Defined in: [components/TabContainer/types.ts:63](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L63)

___

### itemKey

• `Optional` **itemKey**: *string*

The item key can be provided if you want to
override the key retrieved from the component
name.

Defined in: [components/TabContainer/types.ts:53](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L53)

___

### permission

• `Optional` **permission**: PermissionScope

Permission required to show the tab link and the tab
content

If not provided it will be accessible to all users

Defined in: [components/TabContainer/types.ts:71](https://github.com/Puzzlepart/did/blob/dev/client/components/TabContainer/types.ts#L71)