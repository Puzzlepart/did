[did-server - v0.9.11](../README.md) / [Services](../modules/services.md) / NotificationService

# Class: NotificationService

[Services](../modules/services.md).NotificationService

Notification service

## Table of contents

### Constructors

- [constructor](services.notificationservice.md#constructor)

### Methods

- [\_forecast](services.notificationservice.md#_forecast)
- [\_getPeriods](services.notificationservice.md#_getperiods)
- [\_unconfirmedPeriods](services.notificationservice.md#_unconfirmedperiods)
- [getNotifications](services.notificationservice.md#getnotifications)

## Constructors

### constructor

\+ **new NotificationService**(`context`: *Context*, `_timesheetSvc`: [*TimesheetService*](services.timesheetservice.md), `_cperiodSvc`: [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md), `_fperiodSvc`: [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)): [*NotificationService*](services.notificationservice.md)

Constructor for `NotificationService`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`   |
`_timesheetSvc` | [*TimesheetService*](services.timesheetservice.md) | Injected `TimesheetService` through `typedi`   |
`_cperiodSvc` | [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md) | Injected `ConfirmedPeriodsService` through `typedi`   |
`_fperiodSvc` | [*ForecastedPeriodsService*](services.forecastedperiodsservice.md) | Injected `ForecastedPeriodsService` through `typedi`    |

**Returns:** [*NotificationService*](services.notificationservice.md)

Defined in: [services/notification/index.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L21)

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

Defined in: [services/notification/index.ts:93](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L93)

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

Defined in: [services/notification/index.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L44)

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

Defined in: [services/notification/index.ts:69](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L69)

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

Defined in: [services/notification/index.ts:130](https://github.com/Puzzlepart/did/blob/dev/server/services/notification/index.ts#L130)
