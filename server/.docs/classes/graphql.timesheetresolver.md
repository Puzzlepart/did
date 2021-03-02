[did-server - v0.9.8](../README.md) / [graphql](../modules/graphql.md) / TimesheetResolver

# Class: TimesheetResolver

[graphql](../modules/graphql.md).TimesheetResolver

Resolver for `TimesheetPeriodObject`.

`TimesheetService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

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

Defined in: [server/graphql/resolvers/timesheet/index.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/index.ts#L27)

## Methods

### submitPeriod

▸ **submitPeriod**(`period`: [*TimesheetPeriodInput*](graphql.timesheetperiodinput.md), `options`: [*TimesheetOptions*](graphql.timesheetoptions.md)): *Promise*<BaseResult\>

Submit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`period` | [*TimesheetPeriodInput*](graphql.timesheetperiodinput.md) | Period   |
`options` | [*TimesheetOptions*](graphql.timesheetoptions.md) | Timesheet options (forecast, tzoffset etc)    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/timesheet/index.ts:67](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/index.ts#L67)

___

### timesheet

▸ **timesheet**(`query`: [*TimesheetQuery*](graphql.timesheetquery.md), `options`: [*TimesheetOptions*](graphql.timesheetoptions.md)): *Promise*<any[]\>

Get timesheet

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*TimesheetQuery*](graphql.timesheetquery.md) | Query   |
`options` | [*TimesheetOptions*](graphql.timesheetoptions.md) | Options    |

**Returns:** *Promise*<any[]\>

Defined in: [server/graphql/resolvers/timesheet/index.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/index.ts#L45)

___

### unsubmitPeriod

▸ **unsubmitPeriod**(`period`: [*TimesheetPeriodInput*](graphql.timesheetperiodinput.md), `options`: [*TimesheetOptions*](graphql.timesheetoptions.md)): *Promise*<BaseResult\>

Unsubmit period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`period` | [*TimesheetPeriodInput*](graphql.timesheetperiodinput.md) | Period   |
`options` | [*TimesheetOptions*](graphql.timesheetoptions.md) | - |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/timesheet/index.ts:96](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/index.ts#L96)
