[did-server - v0.10.6](../README.md) / [GraphQL](../modules/graphql.md) / NotificationResolver

# Class: NotificationResolver

[GraphQL](../modules/graphql.md).NotificationResolver

Resolver for `Notification`.

`NotificationService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

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

Defined in: [graphql/resolvers/notification/index.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/notification/index.ts#L21)

## Methods

### notifications

▸ **notifications**(`templates`: [*NotificationTemplates*](graphql.notificationtemplates.md), `locale`: *string*): *Promise*<ForecastNotification[]\>

Get notifications

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`templates` | [*NotificationTemplates*](graphql.notificationtemplates.md) | Templates   |
`locale` | *string* | Locale    |

**Returns:** *Promise*<ForecastNotification[]\>

Defined in: [graphql/resolvers/notification/index.ts:37](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/notification/index.ts#L37)
