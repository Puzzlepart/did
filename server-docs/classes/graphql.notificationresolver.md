[did-server](../README.md) / [graphql](../modules/graphql.md) / NotificationResolver

# Class: NotificationResolver

[graphql](../modules/graphql.md).NotificationResolver

## Table of contents

### Constructors

- [constructor](graphql.notificationresolver.md#constructor)

### Methods

- [notifications](graphql.notificationresolver.md#notifications)

## Constructors

### constructor

\+ **new NotificationResolver**(`_notification`: *NotificationService*): [*NotificationResolver*](graphql.notificationresolver.md)

Constructor for NotificationResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_notification` | *NotificationService* | Notification service    |

**Returns:** [*NotificationResolver*](graphql.notificationresolver.md)

Defined in: [server/graphql/resolvers/notification/index.ts:10](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/graphql/resolvers/notification/index.ts#L10)

## Methods

### notifications

▸ **notifications**(`templates`: *NotificationTemplates*, `locale`: *string*): *Promise*<any\>

Get notifications

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`templates` | *NotificationTemplates* | Templates   |
`locale` | *string* | Locale    |

**Returns:** *Promise*<any\>

Defined in: [server/graphql/resolvers/notification/index.ts:26](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/graphql/resolvers/notification/index.ts#L26)
