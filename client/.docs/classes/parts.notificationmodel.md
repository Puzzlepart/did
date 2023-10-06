[did-client - v0.13.0](../README.md) / [Parts](../modules/parts.md) / NotificationModel

# Class: NotificationModel

[Parts](../modules/parts.md).NotificationModel

## Table of contents

### Constructors

- [constructor](parts.notificationmodel.md#constructor)

### Properties

- [iconName](parts.notificationmodel.md#iconname)
- [id](parts.notificationmodel.md#id)
- [moreLink](parts.notificationmodel.md#morelink)
- [severity](parts.notificationmodel.md#severity)
- [text](parts.notificationmodel.md#text)
- [type](parts.notificationmodel.md#type)

### Accessors

- [\_icon](parts.notificationmodel.md#_icon)
- [\_notificationIntent](parts.notificationmodel.md#_notificationintent)
- [alertProps](parts.notificationmodel.md#alertprops)

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

Defined in: [client/parts/UserNotifications/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L12)

## Properties

### iconName

• `Optional` **iconName**: *string*

Defined in: [client/parts/UserNotifications/types.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L12)

___

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

### \_icon

• `Private`get **_icon**(): *Element*

**Returns:** *Element*

Defined in: [client/parts/UserNotifications/types.tsx:44](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L44)

___

### \_notificationIntent

• `Private`get **_notificationIntent**(): *error* \| *warning* \| *success* \| *info*

Returns the intent of the notification based on its type.

**Returns:** *error* \| *warning* \| *success* \| *info*

The intent of the notification.

Defined in: [client/parts/UserNotifications/types.tsx:33](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L33)

___

### alertProps

• get **alertProps**(): AlertProps

**Returns:** AlertProps

Defined in: [client/parts/UserNotifications/types.tsx:58](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L58)

## Methods

### getMoreLinkText

▸ **getMoreLinkText**(`t`: TFunction): *string*

Get text for more link

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function    |

**Returns:** *string*

Defined in: [client/parts/UserNotifications/types.tsx:71](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/types.tsx#L71)
