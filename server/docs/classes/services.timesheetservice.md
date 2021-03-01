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

\+ **new TimesheetService**(`context`: [*Context*](graphql_context.context.md), `_msgraph`: [*MSGraphService*](services.msgraphservice.md), `_project`: [*ProjectService*](services.projectservice.md)): [*TimesheetService*](services.timesheetservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi   |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MS Graph service   |
`_project` | [*ProjectService*](services.projectservice.md) | Project service    |

**Returns:** [*TimesheetService*](services.timesheetservice.md)

Defined in: [server/services/timesheet/index.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L24)

## Properties

### \_confirmed\_periods

• `Private` **\_confirmed\_periods**: *Collection*<any\>

Defined in: [server/services/timesheet/index.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L21)

___

### \_forecasted\_periods

• `Private` **\_forecasted\_periods**: *Collection*<any\>

Defined in: [server/services/timesheet/index.ts:22](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L22)

___

### \_forecasted\_time\_entries

• `Private` **\_forecasted\_time\_entries**: *Collection*<any\>

Defined in: [server/services/timesheet/index.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L24)

___

### \_time\_entries

• `Private` **\_time\_entries**: *Collection*<any\>

Defined in: [server/services/timesheet/index.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L23)

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

Defined in: [server/services/timesheet/index.ts:267](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L267)

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

Defined in: [server/services/timesheet/index.ts:197](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L197)

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

Defined in: [server/services/timesheet/index.ts:210](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L210)

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

Defined in: [server/services/timesheet/index.ts:229](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L229)

___

### getTimesheet

▸ **getTimesheet**(`parameters`: IGetTimesheetParameters): *Promise*<any[]\>

Get timesheet

#### Parameters:

Name | Type |
:------ | :------ |
`parameters` | IGetTimesheetParameters |

**Returns:** *Promise*<any[]\>

Defined in: [server/services/timesheet/index.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L50)

___

### submitPeriod

▸ **submitPeriod**(`parameters`: ISubmitPeriodParameters): *Promise*<void\>

Submit period

#### Parameters:

Name | Type |
:------ | :------ |
`parameters` | ISubmitPeriodParameters |

**Returns:** *Promise*<void\>

Defined in: [server/services/timesheet/index.ts:113](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L113)

___

### unsubmitPeriod

▸ **unsubmitPeriod**(`__namedParameters`: IUnsubmitPeriodParameters): *Promise*<void\>

Unsubmit period

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IUnsubmitPeriodParameters |

**Returns:** *Promise*<void\>

Defined in: [server/services/timesheet/index.ts:168](https://github.com/Puzzlepart/did/blob/dev/server/services/timesheet/index.ts#L168)
