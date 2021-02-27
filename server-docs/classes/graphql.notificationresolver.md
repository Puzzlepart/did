[did-server - v0.10.0](../README.md) / [graphql](../modules/graphql.md) / NotificationResolver

# Class: NotificationResolver

[graphql](../modules/graphql.md).NotificationResolver

## Table of contents

### Constructors

- [constructor](graphql.notificationresolver.md#constructor)

### Methods

- [notifications](graphql.notificationresolver.md#notifications)

## Constructors

### constructor

\+ **new NotificationResolver**(`_notification`: [*NotificationService*](services.notificationservice.md)): [*NotificationResolver*](graphql.notificationresolver.md)

Constructor for NotificationResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_notification` | [*NotificationService*](services.notificationservice.md) | Notification service    |

**Returns:** [*NotificationResolver*](graphql.notificationresolver.md)

Defined in: [server/graphql/resolvers/notification/index.ts:14](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/notification/index.ts#L14)

## Methods

### notifications

▸ **notifications**(`templates`: [*NotificationTemplates*](graphql.notificationtemplates.md), `locale`: *string*): *Promise*<any\>

Get notifications

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`templates` | [*NotificationTemplates*](graphql.notificationtemplates.md) | Templates   |
`locale` | *string* | Locale    |

**Returns:** *Promise*<any\>

Defined in: [server/graphql/resolvers/notification/index.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/notification/index.ts#L30)
