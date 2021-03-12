[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / TimesheetService

# Class: TimesheetService

[services](../modules/services.md).TimesheetService

## Table of contents

### Constructors

- [constructor](services.timesheetservice.md#constructor)

### Methods

- [\_connectEvents](services.timesheetservice.md#_connectevents)
- [\_createUniqueEventId](services.timesheetservice.md#_createuniqueeventid)
- [\_getPeriodData](services.timesheetservice.md#_getperioddata)
- [getPeriods](services.timesheetservice.md#getperiods)
- [getTimesheet](services.timesheetservice.md#gettimesheet)
- [submitPeriod](services.timesheetservice.md#submitperiod)
- [unsubmitPeriod](services.timesheetservice.md#unsubmitperiod)

## Constructors

### constructor

\+ **new TimesheetService**(`context`: [*Context*](graphql_context.context.md), `_msgraphSvc`: [*MSGraphService*](services.msgraphservice.md), `_projectSvc`: [*ProjectService*](services.projectservice.md), `_teSvc`: [*TimeEntryService*](services.timeentryservice.md), `_fteSvc`: [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md), `_cperiodSvc`: [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md), `_fperiodSvc`: [*ForecastedPeriodsService*](services.forecastedperiodsservice.md)): [*TimesheetService*](services.timesheetservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi   |
`_msgraphSvc` | [*MSGraphService*](services.msgraphservice.md) | Injected `MSGraphService` through typedi   |
`_projectSvc` | [*ProjectService*](services.projectservice.md) | Injected `ProjectService` through typedi   |
`_teSvc` | [*TimeEntryService*](services.timeentryservice.md) | Injected `TimeEntryService` through typedi   |
`_fteSvc` | [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md) | Injected `ForecastedTimeEntryService` through typedi   |
`_cperiodSvc` | [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md) | Injected `ConfirmedPeriodsService` through typedi   |
`_fperiodSvc` | [*ForecastedPeriodsService*](services.forecastedperiodsservice.md) | Injected `ForecastedPeriodsService` through typedi    |

**Returns:** [*TimesheetService*](services.timesheetservice.md)

Defined in: [server/services/timesheet/index.ts:25](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L25)

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

Defined in: [server/services/timesheet/index.ts:263](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L263)

___

### \_createUniqueEventId

▸ `Private`**_createUniqueEventId**(`eventId`: *string*, `startDateTime`: Date): *string*

Create unique ID consisting of event ID + event start date time

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`eventId` | *string* | Event ID   |
`startDateTime` | Date | Start date time    |

**Returns:** *string*

Defined in: [server/services/timesheet/index.ts:193](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L193)

___

### \_getPeriodData

▸ `Private`**_getPeriodData**(`id`: *string*, `userId`: *string*): *object*

Get period data from id

* Generates an _id for Mongo DB
* Returns week, month, year and userId

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | Id   |
`userId` | *string* | User ID    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`_id` | *string* |
`month` | *number* |
`userId` | *string* |
`week` | *number* |
`year` | *number* |

Defined in: [server/services/timesheet/index.ts:206](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L206)

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

Defined in: [server/services/timesheet/index.ts:225](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L225)

___

### getTimesheet

▸ **getTimesheet**(`parameters`: IGetTimesheetParameters): *Promise*<any[]\>

Get timesheet

#### Parameters:

Name | Type |
:------ | :------ |
`parameters` | IGetTimesheetParameters |

**Returns:** *Promise*<any[]\>

Defined in: [server/services/timesheet/index.ts:52](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L52)

___

### submitPeriod

▸ **submitPeriod**(`parameters`: ISubmitPeriodParameters): *Promise*<void\>

Submit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parameters` | ISubmitPeriodParameters | Submit period params    |

**Returns:** *Promise*<void\>

Defined in: [server/services/timesheet/index.ts:113](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L113)

___

### unsubmitPeriod

▸ **unsubmitPeriod**(`parameters`: IUnsubmitPeriodParameters): *Promise*<void\>

Unsubmit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`parameters` | IUnsubmitPeriodParameters | Unsubmit period params    |

**Returns:** *Promise*<void\>

Defined in: [server/services/timesheet/index.ts:166](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L166)
