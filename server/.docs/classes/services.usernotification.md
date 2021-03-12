[did-server - v0.9.9](../README.md) / [services](../modules/services.md) / UserNotification

# Class: UserNotification

[services](../modules/services.md).UserNotification

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

Defined in: [server/services/notification/types.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L17)

## Properties

### id

• **id**: *string*

Notification ID

Defined in: [server/services/notification/types.ts:12](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L12)

___

### severity

• **severity**: *number*

___

### text

• **text**: *string*

Notification text

Defined in: [server/services/notification/types.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L17)

___

### type

• **type**: *number*

## Accessors

### moreLink

• get **moreLink**(): *string*

More link

**`remarks`** This could be handled on the client in the future

**Returns:** *string*

Defined in: [server/services/notification/types.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L44)

## Methods

### \_generateId

▸ `Private`**_generateId**(`id`: *string*): *string*

Generate notification id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | Id    |

**Returns:** *string*

Defined in: [server/services/notification/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/types.ts#L35)
