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

Defined in: [components/UserMessage/types.tsx:45](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L45)

___

### fixedCenter

• `Optional` **fixedCenter**: *number*

To flex the message center, speficy a min height

Defined in: [components/UserMessage/types.tsx:50](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L50)

___

### headerText

• `Optional` **headerText**: *string*

Header text to show in **bold** _slightly larger_ font

Defined in: [components/UserMessage/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L13)

___

### iconName

• `Optional` **iconName**: *string*

Icon to use if not default for the type

Defined in: [components/UserMessage/types.tsx:40](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L40)

___

### innerStyle

• `Optional` **innerStyle**: *CSSProperties*

Styles for the inner part of the message

Defined in: [components/UserMessage/types.tsx:55](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L55)

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

Defined in: [components/UserMessage/types.tsx:25](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L25)

Overrides: void

Defined in: [components/UserMessage/types.tsx:25](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L25)

___

### onDismiss

• `Optional` **onDismiss**: () => *void*

On dismiss handler for the message

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [components/UserMessage/types.tsx:30](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L30)

Overrides: void

Defined in: [components/UserMessage/types.tsx:30](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L30)

___

### text

• `Optional` **text**: *string*

Text to show in the message

**`remarks`** Supports markdown

Defined in: [components/UserMessage/types.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L20)

___

### type

• `Optional` **type**: [*UserMessageType*](../modules/components.md#usermessagetype)

Type info, warning, error etc

Defined in: [components/UserMessage/types.tsx:35](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L35)
