[did-server - v0.9.8](../README.md) / [services](../modules/services.md) / ReportService

# Class: ReportService

[services](../modules/services.md).ReportService

## Table of contents

### Constructors

- [constructor](services.reportservice.md#constructor)

### Properties

- [context](services.reportservice.md#context)

### Methods

- [\_generatePresetQuery](services.reportservice.md#_generatepresetquery)
- [\_generateReport](services.reportservice.md#_generatereport)
- [getForecastReport](services.reportservice.md#getforecastreport)
- [getReport](services.reportservice.md#getreport)
- [getUserReport](services.reportservice.md#getuserreport)

## Constructors

### constructor

\+ **new ReportService**(`context`: [*Context*](graphql_context.context.md), `_project`: [*ProjectService*](services.projectservice.md), `_user`: [*UserService*](services.userservice.md), `_timeEntry`: [*TimeEntryService*](services.timeentryservice.md), `_forecastedTimeEntry`: [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md)): [*ReportService*](services_report.reportservice.md)

Constructor for ReportsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Context    |
`_project` | [*ProjectService*](services.projectservice.md) | - |
`_user` | [*UserService*](services.userservice.md) | - |
`_timeEntry` | [*TimeEntryService*](services.timeentryservice.md) | - |
`_forecastedTimeEntry` | [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md) | - |

**Returns:** [*ReportService*](services_report.reportservice.md)

Defined in: [server/services/report.ts:29](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L29)

## Properties

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### \_generatePresetQuery

▸ `Private`**_generatePresetQuery**(`preset`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset)): *FilterQuery*<[*TimeEntry*](graphql.timeentry.md)\>

Generate preset query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query preset    |

**Returns:** *FilterQuery*<[*TimeEntry*](graphql.timeentry.md)\>

Defined in: [server/services/report.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L48)

___

### \_generateReport

▸ `Private`**_generateReport**(`__namedParameters`: IGenerateReportParameters): *any*[]

Generate report

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IGenerateReportParameters |

**Returns:** *any*[]

Defined in: [server/services/report.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L83)

___

### getForecastReport

▸ **getForecastReport**(`query?`: [*ReportsQuery*](graphql.reportsquery.md), `sortAsc?`: *boolean*): *Promise*<Report\>

Get forecast report

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*ReportsQuery*](graphql.reportsquery.md) | Custom query   |
`sortAsc?` | *boolean* | Sort ascending    |

**Returns:** *Promise*<Report\>

Defined in: [server/services/report.ts:162](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L162)

___

### getReport

▸ **getReport**(`preset?`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `query?`: [*ReportsQuery*](graphql.reportsquery.md), `sortAsc?`: *boolean*): *Promise*<Report\>

Get report

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset?` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query preset   |
`query` | [*ReportsQuery*](graphql.reportsquery.md) | Custom query   |
`sortAsc?` | *boolean* | Sort ascending    |

**Returns:** *Promise*<Report\>

Defined in: [server/services/report.ts:130](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L130)

___

### getUserReport

▸ **getUserReport**(`preset`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `_userId`: *string*, `sortAsc?`: *boolean*): *Promise*<Report\>

Get user report using presets

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query preset   |
`_userId` | *string* | - |
`sortAsc?` | *boolean* | Sort ascending    |

**Returns:** *Promise*<Report\>

Defined in: [server/services/report.ts:192](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L192)
