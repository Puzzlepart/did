[did-server - v0.13.0](../README.md) / [Services](../modules/services.md) / UserNotification

# Class: UserNotification

[Services](../modules/services.md).UserNotification

Used as a base to create notifications to the user

## Table of contents

### Constructors

- [constructor](services.usernotification.md#constructor)

### Properties

- [id](services.usernotification.md#id)
- [severity](services.usernotification.md#severity)
- [text](services.usernotification.md#text)
- [type](services.usernotification.md#type)

### Accessors

- [moreLink](services.usernotification.md#morelink)

### Methods

- [\_generateId](services.usernotification.md#_generateid)

## Constructors

### constructor

\+ **new UserNotification**(`id`: *string*, `type`: *number*, `severity`: *number*, `_period`: *any*, `template`: *string*): [*UserNotification*](services.usernotification.md)

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`type` | *number* |
`severity` | *number* |
`_period` | *any* |
`template` | *string* |

**Returns:** [*UserNotification*](services.usernotification.md)

Defined in: [services/notification/types.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L16)

## Properties

### id

• **id**: *string*

Notification ID

Defined in: [services/notification/types.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L11)

___

### severity

• **severity**: *number*

___

### text

• **text**: *string*

Notification text

Defined in: [services/notification/types.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L16)

___

### type

• **type**: *number*

## Accessors

### moreLink

• get **moreLink**(): *string*

More link for the notification in the format `/timesheet/week/overview/{startDate}`.

**Returns:** *string*

Defined in: [services/notification/types.ts:41](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L41)

## Methods

### \_generateId

▸ `Private`**_generateId**(`id`: *string*): *string*

Generates a unique notification ID

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | Id    |

**Returns:** *string*

Defined in: [services/notification/types.ts:34](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L34)
