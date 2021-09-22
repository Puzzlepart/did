[did-server - v0.10.5](../README.md) / [Services](../modules/services.md) / TimesheetService

# Class: TimesheetService

[Services](../modules/services.md).TimesheetService

Timesheet service

## Table of contents

### Constructors

- [constructor](services.timesheetservice.md#constructor)

### Methods

- [\_connectEvents](services.timesheetservice.md#_connectevents)
- [\_getEventsFromProvider](services.timesheetservice.md#_geteventsfromprovider)
- [\_getPeriodData](services.timesheetservice.md#_getperioddata)
- [getPeriods](services.timesheetservice.md#getperiods)
- [getTimesheet](services.timesheetservice.md#gettimesheet)
- [getVacation](services.timesheetservice.md#getvacation)
- [submitPeriod](services.timesheetservice.md#submitperiod)
- [unsubmitPeriod](services.timesheetservice.md#unsubmitperiod)

## Constructors

### constructor

\+ **new TimesheetService**(`context`: *Context*, `_msgraphSvc`: [*MSGraphService*](services.msgraphservice.md), `_googleCalSvc`: [*GoogleCalendarService*](services.googlecalendarservice.md), `_projectSvc`: [*ProjectService*](services.projectservice.md), `_teSvc`: [*TimeEntryService*](services.timeentryservice.md), `_fteSvc`: [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md), `_cperiodSvc`: [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md), `_fperiodSvc`: [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)): [*TimesheetService*](services.timesheetservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`   |
`_msgraphSvc` | [*MSGraphService*](services.msgraphservice.md) | Injected `MSGraphService` through `typedi`   |
`_googleCalSvc` | [*GoogleCalendarService*](services.googlecalendarservice.md) | Injected `GoogleCalendarService` through `typedi`   |
`_projectSvc` | [*ProjectService*](services.projectservice.md) | Injected `ProjectService` through `typedi`   |
`_teSvc` | [*TimeEntryService*](services.timeentryservice.md) | Injected `TimeEntryService` through `typedi`   |
`_fteSvc` | [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md) | Injected `ForecastedTimeEntryService` through `typedi`   |
`_cperiodSvc` | [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md) | Injected `ConfirmedPeriodsService` through `typedi`   |
`_fperiodSvc` | [*ForecastedPeriodsService*](services.forecastedperiodsservice.md) | Injected `ForecastedPeriodsService` through `typedi`    |

**Returns:** [*TimesheetService*](services.timesheetservice.md)

Defined in: [services/timesheet/index.ts:38](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L38)

## Methods

### \_connectEvents

▸ `Private`**_connectEvents**(`__namedParameters`: IConnectEventsParameters): *any*[]

Connect events to projects and customers

**`see`** https://docs.mongodb.com/manual/reference/database-references/

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IConnectEventsParameters |

**Returns:** *any*[]

Defined in: [services/timesheet/index.ts:320](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L320)

___

### \_getEventsFromProvider

▸ `Private`**_getEventsFromProvider**(`__namedParameters`: IProviderEventsParameters): *Promise*<any[]\>

Get events from provider

- Provider `google` uses `_googleCalSvc` (`GoogleCalendarService`)
- Default provider uses `_msgraphSvc` (`MSGraphService`)

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IProviderEventsParameters |

**Returns:** *Promise*<any[]\>

Events

Defined in: [services/timesheet/index.ts:211](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L211)

___

### \_getPeriodData

▸ `Private`**_getPeriodData**(`id`: *string*, `userId`: *string*): ITimesheetPeriodData

Get period data from id

* Generates an _id for Mongo DB
* Returns week, month, year and userId

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | Id   |
`userId` | *string* | User ID    |

**Returns:** ITimesheetPeriodData

Defined in: [services/timesheet/index.ts:263](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L263)

___

### getPeriods

▸ **getPeriods**(`startDate`: *string*, `endDate`: *string*, `locale`: *string*, `userId`: *string*): [*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)[]

Get periods between startDate and endDate

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDate` | *string* | Start date   |
`endDate` | *string* | End date   |
`locale` | *string* | Locale   |
`userId` | *string* | User ID    |

**Returns:** [*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)[]

Defined in: [services/timesheet/index.ts:282](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L282)

___

### getTimesheet

▸ **getTimesheet**(`parameters`: IGetTimesheetParameters): *Promise*<any[]\>

Get timesheet

Retrieves periods between `parameters.startDate`
and `parameters.endDate` using `getPeriods`. Then
retrieves project data using `getProjectsData` from
`ProjectService`.

For each period we're checking both the confirmed periods
and forecasted periods section for a entry. If a match is
found for a confirmed period, this period with the events
are returned.

If no confirmed period is found, events are fetched from
Microsoft Graph using `MSGraphService`

#### Parameters:

Name | Type |
:------ | :------ |
`parameters` | IGetTimesheetParameters |

**Returns:** *Promise*<any[]\>

Defined in: [services/timesheet/index.ts:80](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L80)

___

### getVacation

▸ **getVacation**(`settings`: [*SubscriptionVacationSettings*](graphql.subscriptionvacationsettings.md)): *Promise*<[*VacationSummary*](graphql.vacationsummary.md)\>

Get vacation

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`settings` | [*SubscriptionVacationSettings*](graphql.subscriptionvacationsettings.md) | Subscription vacation settings    |

**Returns:** *Promise*<[*VacationSummary*](graphql.vacationsummary.md)\>

Defined in: [services/timesheet/index.ts:344](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L344)

___

### submitPeriod

▸ **submitPeriod**(`parameters`: ISubmitPeriodParameters): *Promise*<void\>

Submit period

Events for the period are fetched from
Microsoft Graph using `MSGraphService`. We
then generate the period data (`ITimesheetPeriodData`),
map the events to their corresponding projects based
on `projectId` from the client.

We add the period to the correct collection based on
if it's a forecast or an actual confirm. We embed the
events in the period document, as well as adding them
separetely to their corresponding time entry collection.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parameters` | ISubmitPeriodParameters | Submit period params    |

**Returns:** *Promise*<void\>

Defined in: [services/timesheet/index.ts:141](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L141)

___

### unsubmitPeriod

▸ **unsubmitPeriod**(`parameters`: IUnsubmitPeriodParameters): *Promise*<void\>

Unsubmit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parameters` | IUnsubmitPeriodParameters | Unsubmit period params    |

**Returns:** *Promise*<void\>

Defined in: [services/timesheet/index.ts:180](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L180)
