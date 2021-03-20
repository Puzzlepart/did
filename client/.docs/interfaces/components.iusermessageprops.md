[did-client - v0.9.11](../README.md) / [Components](../modules/components.md) / IUserMessageProps

# Interface: IUserMessageProps

[Components](../modules/components.md).IUserMessageProps

## Hierarchy

* *IMessageBarProps*

  ↳ **IUserMessageProps**

## Table of contents

### Properties

- [containerStyle](components.iusermessageprops.md#containerstyle)
- [fixedCenter](components.iusermessageprops.md#fixedcenter)
- [iconName](components.iusermessageprops.md#iconname)
- [onClick](components.iusermessageprops.md#onclick)
- [onDismiss](components.iusermessageprops.md#ondismiss)
- [text](components.iusermessageprops.md#text)
- [type](components.iusermessageprops.md#type)

## Properties

### containerStyle

• `Optional` **containerStyle**: *CSSProperties*

Container style

Defined in: [components/UserMessage/types.tsx:38](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L38)

___

### fixedCenter

• `Optional` **fixedCenter**: *number*

To flex the message center, speficy a min height

Defined in: [components/UserMessage/types.tsx:43](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L43)

___

### iconName

• `Optional` **iconName**: *string*

Icon to use if not default for the type

Defined in: [components/UserMessage/types.tsx:33](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L33)

___

### onClick

• `Optional` **onClick**: (`event`: *MouseEvent*<any, MouseEvent\>) => *void*

On click handler for the message

#### Type declaration:

▸ (`event`: *MouseEvent*<any, MouseEvent\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`event` | *MouseEvent*<any, MouseEvent\> |

**Returns:** *void*

Defined in: [components/UserMessage/types.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L18)

Defined in: [components/UserMessage/types.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L18)

___

### onDismiss

• `Optional` **onDismiss**: () => *void*

On dismiss handler for the message

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [components/UserMessage/types.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L23)

Defined in: [components/UserMessage/types.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L23)

___

### text

• `Optional` **text**: *string*

Text to show in the message

NOTE: Supports markdown

Defined in: [components/UserMessage/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L13)

___

### type

• `Optional` **type**: MessageBarType

Type (info, warning, erro etc)

Defined in: [components/UserMessage/types.tsx:28](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L28)
