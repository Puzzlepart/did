[did-server - v0.13.0](../README.md) / [Services](../modules/services.md) / ReportService

# Class: ReportService

[Services](../modules/services.md).ReportService

Report service

## Table of contents

### Constructors

- [constructor](services.reportservice.md#constructor)

### Properties

- [context](services.reportservice.md#context)

### Methods

- [\_generatePresetQuery](services.reportservice.md#_generatepresetquery)
- [\_generateReport](services.reportservice.md#_generatereport)
- [getConfirmedPeriods](services.reportservice.md#getconfirmedperiods)
- [getForecastReport](services.reportservice.md#getforecastreport)
- [getReport](services.reportservice.md#getreport)
- [getUserReport](services.reportservice.md#getuserreport)

## Constructors

### constructor

\+ **new ReportService**(`context`: [*Context*](graphql.context.md), `_projectSvc`: [*ProjectService*](services.projectservice.md), `_userSvc`: [*UserService*](services.userservice.md), `_timeEntrySvc`: [*TimeEntryService*](services.timeentryservice.md), `_forecastTimeEntrySvc`: [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md), `_confirmedPeriodSvc`: [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md)): [*ReportService*](services.reportservice.md)

Constructor for ReportsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql.context.md) | Injected context through `typedi`   |
`_projectSvc` | [*ProjectService*](services.projectservice.md) | Injected `ProjectService` through `typedi`   |
`_userSvc` | [*UserService*](services.userservice.md) | Injected `UserService` through `typedi`   |
`_timeEntrySvc` | [*TimeEntryService*](services.timeentryservice.md) | Injected `TimeEntryService` through `typedi`   |
`_forecastTimeEntrySvc` | [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md) | Injected `ForecastedTimeEntryService` through `typedi`   |
`_confirmedPeriodSvc` | [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md) | Injected `ConfirmedPeriodsService` through `typedi`    |

**Returns:** [*ReportService*](services.reportservice.md)

Defined in: [services/report.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L39)

## Properties

### context

• `Readonly` **context**: [*Context*](graphql.context.md)

## Methods

### \_generatePresetQuery

▸ `Private`**_generatePresetQuery**(`preset`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset)): *any*

Generate preset query.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query preset    |

**Returns:** *any*

Defined in: [services/report.ts:64](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L64)

___

### \_generateReport

▸ `Private`**_generateReport**(`__namedParameters`: IGenerateReportParameters): *any*[]

Generate report

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IGenerateReportParameters |

**Returns:** *any*[]

Defined in: [services/report.ts:94](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L94)

___

### getConfirmedPeriods

▸ **getConfirmedPeriods**(`queries`: [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[]): *Promise*<any[]\>

Get confirmed periods

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[] | Queries    |

**Returns:** *Promise*<any[]\>

Defined in: [services/report.ts:144](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L144)

___

### getForecastReport

▸ **getForecastReport**(): *Promise*<Report\>

Get forecast report

**Returns:** *Promise*<Report\>

Defined in: [services/report.ts:188](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L188)

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

Defined in: [services/report.ts:155](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L155)

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

Defined in: [services/report.ts:218](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L218)
