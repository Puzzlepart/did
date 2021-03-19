[did-server - v0.9.11](../README.md) / [services](../modules/services.md) / TimesheetService

# Class: TimesheetService

[services](../modules/services.md).TimesheetService

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
- [submitPeriod](services.timesheetservice.md#submitperiod)
- [unsubmitPeriod](services.timesheetservice.md#unsubmitperiod)

## Constructors

### constructor

\+ **new TimesheetService**(`context`: *Context*, `_msgraphSvc`: [*MSGraphService*](services.msgraphservice.md), `_googleCalSvc`: [*GoogleCalendarService*](services.googlecalendarservice.md), `_projectSvc`: [*ProjectService*](services.projectservice.md), `_teSvc`: [*TimeEntryService*](services.timeentryservice.md), `_fteSvc`: [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md), `_cperiodSvc`: [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md), `_fperiodSvc`: [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)): [*TimesheetService*](services.timesheetservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through typedi   |
`_msgraphSvc` | [*MSGraphService*](services.msgraphservice.md) | Injected `MSGraphService` through typedi   |
`_googleCalSvc` | [*GoogleCalendarService*](services.googlecalendarservice.md) | Injected `GoogleCalendarService` through typedi   |
`_projectSvc` | [*ProjectService*](services.projectservice.md) | Injected `ProjectService` through typedi   |
`_teSvc` | [*TimeEntryService*](services.timeentryservice.md) | Injected `TimeEntryService` through typedi   |
`_fteSvc` | [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md) | Injected `ForecastedTimeEntryService` through typedi   |
`_cperiodSvc` | [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md) | Injected `ConfirmedPeriodsService` through typedi   |
`_fperiodSvc` | [*ForecastedPeriodsService*](services.forecastedperiodsservice.md) | Injected `ForecastedPeriodsService` through typedi    |

**Returns:** [*TimesheetService*](services.timesheetservice.md)

Defined in: [services/timesheet/index.ts:34](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L34)

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

Defined in: [services/timesheet/index.ts:292](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L292)

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

Defined in: [services/timesheet/index.ts:183](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L183)

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

Defined in: [services/timesheet/index.ts:235](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L235)

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

Defined in: [services/timesheet/index.ts:254](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L254)

___

### getTimesheet

▸ **getTimesheet**(`parameters`: IGetTimesheetParameters): *Promise*<any[]\>

Get timesheet

#### Parameters:

Name | Type |
:------ | :------ |
`parameters` | IGetTimesheetParameters |

**Returns:** *Promise*<any[]\>

Defined in: [services/timesheet/index.ts:63](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L63)

___

### submitPeriod

▸ **submitPeriod**(`parameters`: ISubmitPeriodParameters): *Promise*<void\>

Submit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parameters` | ISubmitPeriodParameters | Submit period params    |

**Returns:** *Promise*<void\>

Defined in: [services/timesheet/index.ts:113](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L113)

___

### unsubmitPeriod

▸ **unsubmitPeriod**(`parameters`: IUnsubmitPeriodParameters): *Promise*<void\>

Unsubmit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parameters` | IUnsubmitPeriodParameters | Unsubmit period params    |

**Returns:** *Promise*<void\>

Defined in: [services/timesheet/index.ts:152](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L152)
