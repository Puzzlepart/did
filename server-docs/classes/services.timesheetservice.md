[did-server - v0.10.0](../README.md) / [services](../modules/services.md) / TimesheetService

# Class: TimesheetService

[services](../modules/services.md).TimesheetService

## Table of contents

### Constructors

- [constructor](services.timesheetservice.md#constructor)

### Properties

- [\_confirmed\_periods](services.timesheetservice.md#_confirmed_periods)
- [\_forecasted\_periods](services.timesheetservice.md#_forecasted_periods)
- [\_forecasted\_time\_entries](services.timesheetservice.md#_forecasted_time_entries)
- [\_time\_entries](services.timesheetservice.md#_time_entries)

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

\+ **new TimesheetService**(`context`: [*Context*](graphql_context.context.md), `_msgraph`: [*MSGraphService*](services.msgraphservice.md), `_mongo`: [*MongoService*](services.mongoservice.md)): [*TimesheetService*](services.timesheetservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi   |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MSGraphService   |
`_mongo` | [*MongoService*](services.mongoservice.md) | MongoService    |

**Returns:** [*TimesheetService*](services.timesheetservice.md)

Defined in: [server/services/timesheet/index.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L23)

## Properties

### \_confirmed\_periods

• `Private` **\_confirmed\_periods**: *Collection*<any\>

Defined in: [server/services/timesheet/index.ts:20](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L20)

___

### \_forecasted\_periods

• `Private` **\_forecasted\_periods**: *Collection*<any\>

Defined in: [server/services/timesheet/index.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L21)

___

### \_forecasted\_time\_entries

• `Private` **\_forecasted\_time\_entries**: *Collection*<any\>

Defined in: [server/services/timesheet/index.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L23)

___

### \_time\_entries

• `Private` **\_time\_entries**: *Collection*<any\>

Defined in: [server/services/timesheet/index.ts:22](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L22)

## Methods

### \_connectEvents

▸ `Private`**_connectEvents**(`__namedParameters`: IConnectEventsParams): *any*[]

Connect events to projects

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IConnectEventsParams |

**Returns:** *any*[]

Defined in: [server/services/timesheet/index.ts:260](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L260)

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

Defined in: [server/services/timesheet/index.ts:192](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L192)

___

### \_getPeriodData

▸ `Private`**_getPeriodData**(`id`: *string*, `userId`: *string*): *object*

Get period data from id

* Generates an _id for Mongo DB
* Returns week, month, year and _userId

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | Id   |
`userId` | *string* | User ID    |

**Returns:** *object*

Name | Type |
:------ | :------ |
`_id` | *string* |
`_userId` | *string* |
`month` | *number* |
`week` | *number* |
`year` | *number* |

Defined in: [server/services/timesheet/index.ts:205](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L205)

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
`userId` | *string* | - |

**Returns:** [*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)[]

Defined in: [server/services/timesheet/index.ts:224](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L224)

___

### getTimesheet

▸ **getTimesheet**(`params`: IGetTimesheetParams): *Promise*<any[]\>

Get timesheet

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`params` | IGetTimesheetParams | Timesheet params    |

**Returns:** *Promise*<any[]\>

Defined in: [server/services/timesheet/index.ts:49](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L49)

___

### submitPeriod

▸ **submitPeriod**(`params`: ISubmitPeriodParams): *Promise*<void\>

Submit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`params` | ISubmitPeriodParams | Submit period params    |

**Returns:** *Promise*<void\>

Defined in: [server/services/timesheet/index.ts:110](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L110)

___

### unsubmitPeriod

▸ **unsubmitPeriod**(`__namedParameters`: IUnsubmitPeriodParams): *Promise*<void\>

Unsubmit period

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IUnsubmitPeriodParams |

**Returns:** *Promise*<void\>

Defined in: [server/services/timesheet/index.ts:163](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L163)
