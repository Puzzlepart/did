[did-server - v0.9.11](../README.md) / [Services](../modules/services.md) / ReportService

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

\+ **new ReportService**(`context`: *Context*, `_projectSvc`: [*ProjectService*](services.projectservice.md), `_userSvc`: [*UserService*](services.userservice.md), `_teSvc`: [*TimeEntryService*](services.timeentryservice.md), `_fteSvc`: [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md), `_cperiodSvc`: [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md)): [*ReportService*](services.reportservice.md)

Constructor for ReportsService

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | *Context* | Injected context through `typedi`   |
`_projectSvc` | [*ProjectService*](services.projectservice.md) | Injected `ProjectService` through `typedi`   |
`_userSvc` | [*UserService*](services.userservice.md) | Injected `UserService` through `typedi`   |
`_teSvc` | [*TimeEntryService*](services.timeentryservice.md) | Injected `TimeEntryService` through `typedi`   |
`_fteSvc` | [*ForecastedTimeEntryService*](services.forecastedtimeentryservice.md) | Injected `ForecastedTimeEntryService` through `typedi`   |
`_cperiodSvc` | [*ConfirmedPeriodsService*](services.confirmedperiodsservice.md) | Injected `ConfirmedPeriodsService` through `typedi`    |

**Returns:** [*ReportService*](services.reportservice.md)

Defined in: [services/report.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L39)

## Properties

### context

• `Readonly` **context**: *Context*

## Methods

### \_generatePresetQuery

▸ `Private`**_generatePresetQuery**(`preset`: [*ReportsQueryPreset*](../modules/graphql.md#reportsquerypreset)): *any*

Generate preset query

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

Defined in: [services/report.ts:89](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L89)

___

### getConfirmedPeriods

▸ **getConfirmedPeriods**(`queries`: [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[]): *Promise*<any[]\>

Get confirmed periods

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`queries` | [*ConfirmedPeriodsQuery*](graphql.confirmedperiodsquery.md)[] | Queries    |

**Returns:** *Promise*<any[]\>

Defined in: [services/report.ts:132](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L132)

___

### getForecastReport

▸ **getForecastReport**(): *Promise*<Report\>

Get forecast report

**Returns:** *Promise*<Report\>

Defined in: [services/report.ts:172](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L172)

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

Defined in: [services/report.ts:143](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L143)

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

Defined in: [services/report.ts:203](https://github.com/Puzzlepart/did/blob/dev/server/services/report.ts#L203)
