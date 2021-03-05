[did-server - v0.9.8](../README.md) / [graphql](../modules/graphql.md) / ReportsResolver

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

Defined in: [server/graphql/resolvers/reports/index.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L23)

## Methods

### forecastedReport

▸ **forecastedReport**(`query?`: [*ReportsQuery*](graphql.reportsquery.md)): *Promise*<Report\>

Get forecast report

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query?` | [*ReportsQuery*](graphql.reportsquery.md) | Query    |

**Returns:** *Promise*<Report\>

Defined in: [server/graphql/resolvers/reports/index.ts:60](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L60)

___

### report

▸ **report**(`preset?`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `query?`: [*ReportsQuery*](graphql.reportsquery.md), `sortAsc?`: *boolean*): *Promise*<Report\>

Get report

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset?` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query   |
`query?` | [*ReportsQuery*](graphql.reportsquery.md) | Query   |
`sortAsc?` | *boolean* | Sort ascending   |

**Returns:** *Promise*<Report\>

Defined in: [server/graphql/resolvers/reports/index.ts:43](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L43)

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

Defined in: [server/graphql/resolvers/reports/index.ts:76](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L76)
