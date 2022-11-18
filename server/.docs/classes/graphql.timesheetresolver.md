[did-server - v0.11.1](../README.md) / [GraphQL](../modules/graphql.md) / TimesheetResolver

# Class: TimesheetResolver

[GraphQL](../modules/graphql.md).TimesheetResolver

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
- [vacation](graphql.timesheetresolver.md#vacation)

## Constructors

### constructor

\+ **new TimesheetResolver**(`_timesheet`: [*TimesheetService*](services.timesheetservice.md)): [*TimesheetResolver*](graphql.timesheetresolver.md)

Constructor for TimesheetResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_timesheet` | [*TimesheetService*](services.timesheetservice.md) | Timesheet service    |

**Returns:** [*TimesheetResolver*](graphql.timesheetresolver.md)

Defined in: [graphql/resolvers/timesheet/index.ts:28](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/index.ts#L28)

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

Defined in: [graphql/resolvers/timesheet/index.ts:94](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/index.ts#L94)

___

### timesheet

▸ **timesheet**(`context`: *Context*, `query`: [*TimesheetQuery*](graphql.timesheetquery.md), `options`: [*TimesheetOptions*](graphql.timesheetoptions.md)): *Promise*<any[]\>

Get timesheet

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | - |
`query` | [*TimesheetQuery*](graphql.timesheetquery.md) | Query   |
`options` | [*TimesheetOptions*](graphql.timesheetoptions.md) | Options    |

**Returns:** *Promise*<any[]\>

Defined in: [graphql/resolvers/timesheet/index.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/index.ts#L47)

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

Defined in: [graphql/resolvers/timesheet/index.ts:123](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/index.ts#L123)

___

### vacation

▸ **vacation**(`context`: *Context*): *Promise*<[*VacationSummary*](graphql.vacationsummary.md)\>

Get vacation summary

Total vacation days, used and remaining.

#### Parameters:

Name | Type |
:------ | :------ |
`context` | *Context* |

**Returns:** *Promise*<[*VacationSummary*](graphql.vacationsummary.md)\>

Defined in: [graphql/resolvers/timesheet/index.ts:73](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/index.ts#L73)
