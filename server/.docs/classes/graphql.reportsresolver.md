[did-server - v0.9.9](../README.md) / [graphql](../modules/graphql.md) / ReportsResolver

# Class: ReportsResolver

[graphql](../modules/graphql.md).ReportsResolver

Resolver for `TimeEntry`.

`ReportsService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

## Table of contents

### Constructors

- [constructor](graphql.reportsresolver.md#constructor)

### Methods

- [confirmedPeriods](graphql.reportsresolver.md#confirmedperiods)
- [forecastedReport](graphql.reportsresolver.md#forecastedreport)
- [report](graphql.reportsresolver.md#report)
- [userReport](graphql.reportsresolver.md#userreport)

## Constructors

### constructor

\+ **new ReportsResolver**(`_report`: [*ReportService*](services_report.reportservice.md)): [*ReportsResolver*](graphql.reportsresolver.md)

Constructor for ReportsResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_report` | [*ReportService*](services_report.reportservice.md) | Report service    |

**Returns:** [*ReportsResolver*](graphql.reportsresolver.md)

Defined in: [server/graphql/resolvers/reports/index.ts:29](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L29)

## Methods

### confirmedPeriods

▸ **confirmedPeriods**(`queries`: [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[]): *Promise*<[*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)[]\>

Get confirmed periods matching the specified queries

#### Parameters:

Name | Type |
:------ | :------ |
`queries` | [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[] |

**Returns:** *Promise*<[*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)[]\>

Defined in: [server/graphql/resolvers/reports/index.ts:64](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L64)

___

### forecastedReport

▸ **forecastedReport**(): *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Get forecast report

**Returns:** *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Defined in: [server/graphql/resolvers/reports/index.ts:80](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L80)

___

### report

▸ **report**(`preset?`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `query?`: [*ReportsQuery*](graphql.reportsquery.md), `sortAsc?`: *boolean*): *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Get report

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset?` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query   |
`query?` | [*ReportsQuery*](graphql.reportsquery.md) | Query   |
`sortAsc?` | *boolean* | Sort ascending   |

**Returns:** *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Defined in: [server/graphql/resolvers/reports/index.ts:49](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L49)

___

### userReport

▸ **userReport**(`preset?`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `context?`: [*Context*](graphql_context.context.md)): *Promise*<Report\>

Get report

#### Parameters:

Name | Type |
:------ | :------ |
`preset?` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) |
`context?` | [*Context*](graphql_context.context.md) |

**Returns:** *Promise*<Report\>

Defined in: [server/graphql/resolvers/reports/index.ts:94](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L94)
