[did-server](../README.md) / [graphql](../modules/graphql.md) / TimesheetResolver

# Class: TimesheetResolver

[graphql](../modules/graphql.md).TimesheetResolver

## Table of contents

### Constructors

- [constructor](graphql.timesheetresolver.md#constructor)

### Methods

- [submitPeriod](graphql.timesheetresolver.md#submitperiod)
- [timesheet](graphql.timesheetresolver.md#timesheet)
- [unsubmitPeriod](graphql.timesheetresolver.md#unsubmitperiod)

## Constructors

### constructor

\+ **new TimesheetResolver**(`_timesheet`: [*TimesheetService*](services.timesheetservice.md)): [*TimesheetResolver*](graphql.timesheetresolver.md)

Constructor for TimesheetResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_timesheet` | [*TimesheetService*](services.timesheetservice.md) | Timesheet service    |

**Returns:** [*TimesheetResolver*](graphql.timesheetresolver.md)

Defined in: [server/graphql/resolvers/timesheet/index.ts:16](https://github.com/Puzzlepart/did/blob/ca0344a0/server/graphql/resolvers/timesheet/index.ts#L16)

## Methods

### submitPeriod

▸ **submitPeriod**(`period`: *TimesheetPeriodInput*, `options`: *TimesheetOptions*): *Promise*<BaseResult\>

Submit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`period` | *TimesheetPeriodInput* | Period   |
`options` | *TimesheetOptions* | Timesheet options (forecast, tzoffset etc)    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/timesheet/index.ts:56](https://github.com/Puzzlepart/did/blob/ca0344a0/server/graphql/resolvers/timesheet/index.ts#L56)

___

### timesheet

▸ **timesheet**(`query`: *TimesheetQuery*, `options`: *TimesheetOptions*): *Promise*<any[]\>

Get timesheet

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | *TimesheetQuery* | Query   |
`options` | *TimesheetOptions* | Options    |

**Returns:** *Promise*<any[]\>

Defined in: [server/graphql/resolvers/timesheet/index.ts:34](https://github.com/Puzzlepart/did/blob/ca0344a0/server/graphql/resolvers/timesheet/index.ts#L34)

___

### unsubmitPeriod

▸ **unsubmitPeriod**(`period`: *TimesheetPeriodInput*, `options`: *TimesheetOptions*): *Promise*<BaseResult\>

Unsubmit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`period` | *TimesheetPeriodInput* | Period   |
`options` | *TimesheetOptions* | - |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/timesheet/index.ts:85](https://github.com/Puzzlepart/did/blob/ca0344a0/server/graphql/resolvers/timesheet/index.ts#L85)
