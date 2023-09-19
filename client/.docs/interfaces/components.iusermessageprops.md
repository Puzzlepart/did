[did-client - v0.12.0](../README.md) / [Components](../modules/components.md) / IUserMessageProps

# Interface: IUserMessageProps

[Components](../modules/components.md).IUserMessageProps

## Hierarchy

* *AlertProps*

  ↳ **IUserMessageProps**

## Table of contents

### Properties

- [actions](components.iusermessageprops.md#actions)
- [fixedHeight](components.iusermessageprops.md#fixedheight)
- [headerText](components.iusermessageprops.md#headertext)
- [onClick](components.iusermessageprops.md#onclick)
- [openActionsOnHover](components.iusermessageprops.md#openactionsonhover)
- [text](components.iusermessageprops.md#text)

## Properties

### actions

• `Optional` **actions**: [*IUserMessageAction*](components.iusermessageaction.md)[]

Actions to show in a menu

Defined in: [client/components/UserMessage/types.tsx:50](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L50)

___

### fixedHeight

• `Optional` **fixedHeight**: *number*

To flex the message center with a fixed height

Defined in: [client/components/UserMessage/types.tsx:45](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L45)

___

### headerText

• `Optional` **headerText**: *string*

Header text to show in **bold** _slightly larger_ font

Defined in: [client/components/UserMessage/types.tsx:28](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L28)

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

Defined in: [client/components/UserMessage/types.tsx:40](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L40)

Overrides: void

Defined in: [client/components/UserMessage/types.tsx:40](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L40)

___

### openActionsOnHover

• `Optional` **openActionsOnHover**: *boolean*

Whether to open the actions menu on hover

Defined in: [client/components/UserMessage/types.tsx:55](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L55)

___

### text

• `Optional` **text**: *string*

Text to show in the message

**`remarks`** Supports markdown

Defined in: [client/components/UserMessage/types.tsx:35](https://github.com/Puzzlepart/did/blob/dev/client/components/UserMessage/types.tsx#L35)
