[did-server - v0.10.3](../README.md) / [GraphQL](../modules/graphql.md) / ReportsResolver

# Class: ReportsResolver

[GraphQL](../modules/graphql.md).ReportsResolver

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

\+ **new ReportsResolver**(`_report`: [*ReportService*](services.reportservice.md)): [*ReportsResolver*](graphql.reportsresolver.md)

Constructor for ReportsResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_report` | [*ReportService*](services.reportservice.md) | Report service    |

**Returns:** [*ReportsResolver*](graphql.reportsresolver.md)

Defined in: [graphql/resolvers/reports/index.ts:29](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L29)

## Methods

### confirmedPeriods

▸ **confirmedPeriods**(`queries`: [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[]): *Promise*<[*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)[]\>

Get confirmed periods matching the specified queries

#### Parameters:

Name | Type |
:------ | :------ |
`queries` | [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[] |

**Returns:** *Promise*<[*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)[]\>

Defined in: [graphql/resolvers/reports/index.ts:67](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L67)

___

### forecastedReport

▸ **forecastedReport**(): *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Get forecast report

**Returns:** *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Defined in: [graphql/resolvers/reports/index.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L83)

___

### report

▸ **report**(`preset?`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `query?`: [*ReportsQuery*](graphql.reportsquery.md), `sortAsc?`: *boolean*): *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Get report

**`remarks`** Temporarily removed auth options. See discussion #969
and issue #967.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset?` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query   |
`query?` | [*ReportsQuery*](graphql.reportsquery.md) | Query   |
`sortAsc?` | *boolean* | Sort ascending   |

**Returns:** *Promise*<[*TimeEntry*](graphql.timeentry.md)[]\>

Defined in: [graphql/resolvers/reports/index.ts:52](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L52)

___

### userReport

▸ **userReport**(`preset?`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `context?`: *Context*): *Promise*<Report\>

Get report

#### Parameters:

Name | Type |
:------ | :------ |
`preset?` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) |
`context?` | *Context* |

**Returns:** *Promise*<Report\>

Defined in: [graphql/resolvers/reports/index.ts:97](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L97)
