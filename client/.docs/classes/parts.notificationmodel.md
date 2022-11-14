[did-client - v0.11.0](../README.md) / [Parts](../modules/parts.md) / NotificationModel

# Class: NotificationModel

[Parts](../modules/parts.md).NotificationModel

## Table of contents

### Constructors

- [constructor](parts.notificationmodel.md#constructor)

### Properties

- [id](parts.notificationmodel.md#id)
- [moreLink](parts.notificationmodel.md#morelink)
- [severity](parts.notificationmodel.md#severity)
- [text](parts.notificationmodel.md#text)
- [type](parts.notificationmodel.md#type)

### Accessors

- [\_iconProps](parts.notificationmodel.md#_iconprops)
- [\_messageType](parts.notificationmodel.md#_messagetype)
- [messageProps](parts.notificationmodel.md#messageprops)

### Methods

- [getMoreLinkText](parts.notificationmodel.md#getmorelinktext)

## Constructors

### constructor

\+ **new NotificationModel**(`notification`: *Notification*): [*NotificationModel*](parts.notificationmodel.md)

Constructs a new instance of UserNotificationMessageModel

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`notification` | *Notification* | The notification    |

**Returns:** [*NotificationModel*](parts.notificationmodel.md)

Defined in: [client/parts/UserNotifications/types.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L11)

## Properties

### id

• **id**: *string*

Defined in: [client/parts/UserNotifications/types.tsx:7](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L7)

___

### moreLink

• **moreLink**: *string*

Defined in: [client/parts/UserNotifications/types.tsx:11](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L11)

___

### severity

• **severity**: *string*

Defined in: [client/parts/UserNotifications/types.tsx:9](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L9)

___

### text

• **text**: *string*

Defined in: [client/parts/UserNotifications/types.tsx:10](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L10)

___

### type

• **type**: *string*

Defined in: [client/parts/UserNotifications/types.tsx:8](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L8)

## Accessors

### \_iconProps

• `Private`get **_iconProps**(): *IIconProps*

**Returns:** *IIconProps*

Defined in: [client/parts/UserNotifications/types.tsx:35](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L35)

___

### \_messageType

• `Private`get **_messageType**(): [*UserMessageType*](../modules/components.md#usermessagetype)

**Returns:** [*UserMessageType*](../modules/components.md#usermessagetype)

Defined in: [client/parts/UserNotifications/types.tsx:26](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L26)

___

### messageProps

• get **messageProps**(): [*IUserMessageProps*](../interfaces/components.iusermessageprops.md)

**Returns:** [*IUserMessageProps*](../interfaces/components.iusermessageprops.md)

Defined in: [client/parts/UserNotifications/types.tsx:46](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L46)

## Methods

### getMoreLinkText

▸ **getMoreLinkText**(`t`: TFunction): *string*

Get text for more link

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function    |

**Returns:** *string*

Defined in: [client/parts/UserNotifications/types.tsx:60](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L60)
