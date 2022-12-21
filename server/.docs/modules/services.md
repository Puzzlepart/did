[did-server - v0.11.4](../README.md) / Services

# Module: Services

Services used by `GraphQL`

## Table of contents

### Enumerations

- [CacheScope](../enums/services.cachescope.md)

### Injectable Container Service Classes

- [ApiTokenService](../classes/services.apitokenservice.md)
- [CacheService](../classes/services.cacheservice.md)
- [ConfirmedPeriodsService](../classes/services.confirmedperiodsservice.md)
- [CustomerService](../classes/services.customerservice.md)
- [ForecastedPeriodsService](../classes/services.forecastedperiodsservice.md)
- [ForecastedTimeEntryService](../classes/services.forecastedtimeentryservice.md)
- [GoogleCalendarService](../classes/services.googlecalendarservice.md)
- [HolidaysService](../classes/services.holidaysservice.md)
- [LabelService](../classes/services.labelservice.md)
- [MSGraphService](../classes/services.msgraphservice.md)
- [MSOAuthService](../classes/services.msoauthservice.md)
- [NotificationService](../classes/services.notificationservice.md)
- [ProjectService](../classes/services.projectservice.md)
- [ReportService](../classes/services.reportservice.md)
- [RoleService](../classes/services.roleservice.md)
- [SubscriptionService](../classes/services.subscriptionservice.md)
- [TimeEntryService](../classes/services.timeentryservice.md)
- [TimesheetService](../classes/services.timesheetservice.md)
- [UserService](../classes/services.userservice.md)

### Other Classes

- [UserNotification](../classes/services.usernotification.md)

### Type aliases

- [CacheKey](services.md#cachekey)
- [CacheOptions](services.md#cacheoptions)

## Type aliases

### CacheKey

Ƭ **CacheKey**: *string* \| *string*[]

Defined in: [services/cache.ts:15](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L15)

___

### CacheOptions

Ƭ **CacheOptions**: *object*

Cache options

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`expiry`? | *number* | Cache expiry in seconds   |
`key` | [*CacheKey*](services.md#cachekey) | Cache key   |
`scope`? | [*CacheScope*](../enums/services.cachescope.md) | Cache scope   |

Defined in: [services/cache.ts:20](https://github.com/Puzzlepart/did/blob/dev/server/services/cache.ts#L20)
