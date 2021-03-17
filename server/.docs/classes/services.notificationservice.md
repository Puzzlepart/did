[did-server - v0.9.9](../README.md) / [services](../modules/services.md) / NotificationService

# Class: NotificationService

[services](../modules/services.md).NotificationService

## Table of contents

### Constructors

- [constructor](services.notificationservice.md#constructor)

### Properties

- [\_confirmed\_periods](services.notificationservice.md#_confirmed_periods)
- [\_forecasted\_periods](services.notificationservice.md#_forecasted_periods)

### Methods

- [\_forecast](services.notificationservice.md#_forecast)
- [\_getPeriods](services.notificationservice.md#_getperiods)
- [\_unconfirmedPeriods](services.notificationservice.md#_unconfirmedperiods)
- [getNotifications](services.notificationservice.md#getnotifications)

## Constructors

### constructor

\+ **new NotificationService**(`context`: [*Context*](graphql_context.context.md), `_timesheetSvc`: [*TimesheetService*](services.timesheetservice.md)): [*NotificationService*](services.notificationservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi   |
`_timesheetSvc` | [*TimesheetService*](services.timesheetservice.md) | Timesheet service    |

**Returns:** [*NotificationService*](services.notificationservice.md)

Defined in: [server/services/notification/index.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L17)

## Properties

### \_confirmed\_periods

• `Private` **\_confirmed\_periods**: *Collection*<any\>

Defined in: [server/services/notification/index.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L16)

___

### \_forecasted\_periods

• `Private` **\_forecasted\_periods**: *Collection*<any\>

Defined in: [server/services/notification/index.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L17)

## Methods

### \_forecast

▸ `Private`**_forecast**(`template`: *string*, `locale`: *string*): *Promise*<ForecastNotification[]\>

Get forecast notifications

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`template` | *string* | Notification template   |
`locale` | *string* | Locale    |

**Returns:** *Promise*<ForecastNotification[]\>

Defined in: [server/services/notification/index.ts:91](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L91)

___

### \_getPeriods

▸ `Private`**_getPeriods**(`add`: *string*, `count`: *number*, `locale`: *string*): *any*[]

Get periods

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`add` | *string* | Add   |
`count` | *number* | Count   |
`locale` | *string* | User locale    |

**Returns:** *any*[]

Defined in: [server/services/notification/index.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L40)

___

### \_unconfirmedPeriods

▸ `Private`**_unconfirmedPeriods**(`template`: *string*, `locale`: *string*): *Promise*<UnconfirmedPeriodNotification[]\>

Get unconfirmed periods notifications

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`template` | *string* | Notification template   |
`locale` | *string* | Locale    |

**Returns:** *Promise*<UnconfirmedPeriodNotification[]\>

Defined in: [server/services/notification/index.ts:65](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L65)

___

### getNotifications

▸ **getNotifications**(`templates`: [*NotificationTemplates*](graphql.notificationtemplates.md), `locale`: *string*): *Promise*<any\>

Get notifications

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`templates` | [*NotificationTemplates*](graphql.notificationtemplates.md) | Templats   |
`locale` | *string* | User locale    |

**Returns:** *Promise*<any\>

Defined in: [server/services/notification/index.ts:130](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L130)
