[did-server - v0.9.8](../README.md) / [services/report](../modules/services_report.md) / ReportService

# Class: ReportService

[services/report](../modules/services_report.md).ReportService

## Table of contents

### Constructors

- [constructor](services_report.reportservice.md#constructor)

### Properties

- [context](services_report.reportservice.md#context)

### Methods

- [\_generatePresetQuery](services_report.reportservice.md#_generatepresetquery)
- [\_generateReport](services_report.reportservice.md#_generatereport)
- [getForecastReport](services_report.reportservice.md#getforecastreport)
- [getReport](services_report.reportservice.md#getreport)
- [getUserReport](services_report.reportservice.md#getuserreport)

## Constructors

### constructor

\+ **new ReportService**(`context`: [*Context*](graphql_context.context.md), `_project`: [*ProjectService*](services.projectservice.md), `_user`: [*UserService*](services.userservice.md), `_timeEntry`: [*TimeEntryService*](services.timeentryservice.md), `_forecastedTimeEntry`: [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md)): [*ReportService*](services_report.reportservice.md)

Constructor for ReportsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi   |
`_project` | [*ProjectService*](services.projectservice.md) | Injected `ProjectService` through typedi   |
`_user` | [*UserService*](services.userservice.md) | Injected `UserService` through typedi   |
`_timeEntry` | [*TimeEntryService*](services.timeentryservice.md) | Injected `TimeEntryService` through typedi   |
`_forecastedTimeEntry` | [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md) | Injected `ForecastedTimeEntryService` through typedi    |

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

Defined in: [server/services/report.ts:52](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L52)

___

### \_generateReport

▸ `Private`**_generateReport**(`__namedParameters`: IGenerateReportParameters): *any*[]

Generate report

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IGenerateReportParameters |

**Returns:** *any*[]

Defined in: [server/services/report.ts:87](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L87)

___

### getForecastReport

▸ **getForecastReport**(): *Promise*<Report\>

Get forecast report

**Returns:** *Promise*<Report\>

Defined in: [server/services/report.ts:163](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L163)

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

Defined in: [server/services/report.ts:134](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L134)

___

### getUserReport

▸ **getUserReport**(`preset`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset), `userId`: *string*, `sortAsc?`: *boolean*): *Promise*<Report\>

Get user report using presets

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query preset   |
`userId` | *string* | User ID   |
`sortAsc?` | *boolean* | Sort ascending    |

**Returns:** *Promise*<Report\>

Defined in: [server/services/report.ts:194](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L194)
