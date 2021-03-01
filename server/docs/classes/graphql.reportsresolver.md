[did-server - v0.10.0](../README.md) / [graphql](../modules/graphql.md) / ReportsResolver

# Class: ReportsResolver

[graphql](../modules/graphql.md).ReportsResolver

## Table of contents

### Constructors

- [constructor](graphql.reportsresolver.md#constructor)

### Methods

- [timeentries](graphql.reportsresolver.md#timeentries)

## Constructors

### constructor

\+ **new ReportsResolver**(`_reports`: [*ReportsService*](services.reportsservice.md)): [*ReportsResolver*](graphql.reportsresolver.md)

Constructor for ReportsResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_reports` | [*ReportsService*](services.reportsservice.md) | Reports service    |

**Returns:** [*ReportsResolver*](graphql.reportsresolver.md)

Defined in: [server/graphql/resolvers/reports/index.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L16)

## Methods

### timeentries

▸ **timeentries**(`query`: [*ReportsQuery*](graphql.reportsquery.md), `currentUser`: *boolean*, `sortAsc`: *boolean*, `context`: [*Context*](graphql_context.context.md)): *Promise*<Report\>

Get time entries

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*ReportsQuery*](graphql.reportsquery.md) | Query   |
`currentUser` | *boolean* | Current user   |
`sortAsc` | *boolean* | Sort ascending   |
`context` | [*Context*](graphql_context.context.md) | - |

**Returns:** *Promise*<Report\>

Defined in: [server/graphql/resolvers/reports/index.ts:36](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reports/index.ts#L36)
