[did-server](../README.md) / [services](../modules/services.md) / TimesheetService

# Class: TimesheetService

[services](../modules/services.md).TimesheetService

## Table of contents

### Constructors

- [constructor](services.timesheetservice.md#constructor)

### Methods

- [getPeriods](services.timesheetservice.md#getperiods)
- [getTimesheet](services.timesheetservice.md#gettimesheet)
- [submitPeriod](services.timesheetservice.md#submitperiod)
- [unsubmitPeriod](services.timesheetservice.md#unsubmitperiod)

## Constructors

### constructor

\+ **new TimesheetService**(`context`: [*Context*](graphql_context.context.md), `_msgraph`: [*MSGraphService*](services.msgraphservice.md), `_mongo`: *MongoService*): [*TimesheetService*](services.timesheetservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Context   |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MSGraphService   |
`_mongo` | *MongoService* | MongoService    |

**Returns:** [*TimesheetService*](services.timesheetservice.md)

Defined in: [server/services/timesheet/index.ts:23](https://github.com/Puzzlepart/did/blob/aeee6e68/server/services/timesheet/index.ts#L23)

## Methods

### getPeriods

▸ **getPeriods**(`startDate`: *string*, `endDate`: *string*, `locale`: *string*): *TimesheetPeriodObject*[]

Get periods between startDate and endDate

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDate` | *string* | Start date   |
`endDate` | *string* | End date   |
`locale` | *string* | Locale    |

**Returns:** *TimesheetPeriodObject*[]

Defined in: [server/services/timesheet/index.ts:221](https://github.com/Puzzlepart/did/blob/aeee6e68/server/services/timesheet/index.ts#L221)

___

### getTimesheet

▸ **getTimesheet**(`params`: IGetTimesheetParams): *Promise*<any[]\>

Get timesheet

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`params` | IGetTimesheetParams | Timesheet params    |

**Returns:** *Promise*<any[]\>

Defined in: [server/services/timesheet/index.ts:49](https://github.com/Puzzlepart/did/blob/aeee6e68/server/services/timesheet/index.ts#L49)

___

### submitPeriod

▸ **submitPeriod**(`params`: ISubmitPeriodParams): *Promise*<void\>

Submit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`params` | ISubmitPeriodParams | Submit period params    |

**Returns:** *Promise*<void\>

Defined in: [server/services/timesheet/index.ts:109](https://github.com/Puzzlepart/did/blob/aeee6e68/server/services/timesheet/index.ts#L109)

___

### unsubmitPeriod

▸ **unsubmitPeriod**(`__namedParameters`: IUnsubmitPeriodParams): *Promise*<void\>

Unsubmit period

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IUnsubmitPeriodParams |

**Returns:** *Promise*<void\>

Defined in: [server/services/timesheet/index.ts:162](https://github.com/Puzzlepart/did/blob/aeee6e68/server/services/timesheet/index.ts#L162)
