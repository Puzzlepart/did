[did-client - v0.11.3](../README.md) / [Components](../modules/components.md) / IUserMessageProps

# Interface: IUserMessageProps

[Components](../modules/components.md).IUserMessageProps

## Hierarchy

* *IMessageBarProps*

  ↳ **IUserMessageProps**

## Table of contents

### Properties

- [containerStyle](components.iusermessageprops.md#containerstyle)
- [fixedHeight](components.iusermessageprops.md#fixedheight)
- [headerText](components.iusermessageprops.md#headertext)
- [iconName](components.iusermessageprops.md#iconname)
- [innerStyle](components.iusermessageprops.md#innerstyle)
- [onClick](components.iusermessageprops.md#onclick)
- [onDismiss](components.iusermessageprops.md#ondismiss)
- [text](components.iusermessageprops.md#text)
- [type](components.iusermessageprops.md#type)

## Properties

### containerStyle

• `Optional` **containerStyle**: *CSSProperties*

Container style

Defined in: [client/components/UserMessage/types.tsx:49](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L49)

___

### fixedHeight

• `Optional` **fixedHeight**: *number*

To flex the message center with a fixed height

Defined in: [client/components/UserMessage/types.tsx:54](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L54)

___

### headerText

• `Optional` **headerText**: *string*

Header text to show in **bold** _slightly larger_ font

Defined in: [client/components/UserMessage/types.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L17)

___

### iconName

• `Optional` **iconName**: *string*

Icon to use if not default for the type

Defined in: [client/components/UserMessage/types.tsx:44](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L44)

___

### innerStyle

• `Optional` **innerStyle**: *CSSProperties*

Styles for the inner part of the message

Defined in: [client/components/UserMessage/types.tsx:59](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L59)

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

Defined in: [client/components/UserMessage/types.tsx:29](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L29)

Overrides: void

Defined in: [client/components/UserMessage/types.tsx:29](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L29)

___

### onDismiss

• `Optional` **onDismiss**: () => *void*

On dismiss handler for the message

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/UserMessage/types.tsx:34](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L34)

Overrides: void

Defined in: [client/components/UserMessage/types.tsx:34](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L34)

___

### text

• `Optional` **text**: *string*

Text to show in the message

**`remarks`** Supports markdown

Defined in: [client/components/UserMessage/types.tsx:24](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L24)

___

### type

• `Optional` **type**: [*UserMessageType*](../modules/components.md#usermessagetype)

Type info, warning, error etc

Defined in: [client/components/UserMessage/types.tsx:39](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L39)
