[did-server - v0.9.9](../README.md) / [services/report](../modules/services_report.md) / ReportService

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
- [getConfirmedPeriods](services_report.reportservice.md#getconfirmedperiods)
- [getForecastReport](services_report.reportservice.md#getforecastreport)
- [getReport](services_report.reportservice.md#getreport)
- [getUserReport](services_report.reportservice.md#getuserreport)

## Constructors

### constructor

\+ **new ReportService**(`context`: [*Context*](graphql_context.context.md), `_projectSvc`: [*ProjectService*](services.projectservice.md), `_userSvc`: [*UserService*](services.userservice.md), `_teSvc`: [*TimeEntryService*](services.timeentryservice.md), `_fteSvc`: [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md), `_cperiodSvc`: [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md)): [*ReportService*](services_report.reportservice.md)

Constructor for ReportsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi   |
`_projectSvc` | [*ProjectService*](services.projectservice.md) | Injected `ProjectService` through typedi   |
`_userSvc` | [*UserService*](services.userservice.md) | Injected `UserService` through typedi   |
`_teSvc` | [*TimeEntryService*](services.timeentryservice.md) | Injected `TimeEntryService` through typedi   |
`_fteSvc` | [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md) | Injected `ForecastedTimeEntryService` through typedi   |
`_cperiodSvc` | [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md) | Injected `ConfirmedPeriodsService` through typedi    |

**Returns:** [*ReportService*](services_report.reportservice.md)

Defined in: [server/services/report.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L33)

## Properties

### context

• `Readonly` **context**: [*Context*](graphql_context.context.md)

## Methods

### \_generatePresetQuery

▸ `Private`**_generatePresetQuery**(`preset`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset)): *any*

Generate preset query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`preset` | [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset) | Query preset    |

**Returns:** *any*

Defined in: [server/services/report.ts:58](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L58)

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

### getConfirmedPeriods

▸ **getConfirmedPeriods**(`queries`: [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[]): *Promise*<any[]\>

Get confirmed periods

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[] | Queries    |

**Returns:** *Promise*<any[]\>

Defined in: [server/services/report.ts:132](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L132)

___

### getForecastReport

▸ **getForecastReport**(): *Promise*<Report\>

Get forecast report

**Returns:** *Promise*<Report\>

Defined in: [server/services/report.ts:172](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L172)

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

Defined in: [server/services/report.ts:143](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L143)

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

Defined in: [server/services/report.ts:203](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L203)
