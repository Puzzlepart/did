[did-server - v0.11.2](../README.md) / [GraphQL](../modules/graphql.md) / TimesheetPeriodObject

# Class: TimesheetPeriodObject

[GraphQL](../modules/graphql.md).TimesheetPeriodObject

## Table of contents

### Constructors

- [constructor](graphql.timesheetperiodobject.md#constructor)

### Properties

- [\_id](graphql.timesheetperiodobject.md#_id)
- [endDate](graphql.timesheetperiodobject.md#enddate)
- [events](graphql.timesheetperiodobject.md#events)
- [forecastedHours](graphql.timesheetperiodobject.md#forecastedhours)
- [hours](graphql.timesheetperiodobject.md#hours)
- [id](graphql.timesheetperiodobject.md#id)
- [isConfirmed](graphql.timesheetperiodobject.md#isconfirmed)
- [isForecast](graphql.timesheetperiodobject.md#isforecast)
- [isForecasted](graphql.timesheetperiodobject.md#isforecasted)
- [month](graphql.timesheetperiodobject.md#month)
- [startDate](graphql.timesheetperiodobject.md#startdate)
- [userId](graphql.timesheetperiodobject.md#userid)
- [week](graphql.timesheetperiodobject.md#week)
- [year](graphql.timesheetperiodobject.md#year)

## Constructors

### constructor

\+ **new TimesheetPeriodObject**(`startDate`: *string*, `endDate`: *string*, `locale`: *string*): [*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)

Constructs a new instance of TimesheetPeriodObject

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDate` | *string* | Start date   |
`endDate` | *string* | End date   |
`locale` | *string* | User locale    |

**Returns:** [*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:82](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L82)

## Properties

### \_id

• **\_id**: *string*

Primary ID field.

Used as primary key (id) in CosmosDB

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:28](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L28)

___

### endDate

• **endDate**: *string*

End date

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:64](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L64)

___

### events

• `Optional` **events**: [*EventObject*](graphql.eventobject.md)[]

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:67](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L67)

___

### forecastedHours

• `Optional` **forecastedHours**: *number*

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:82](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L82)

___

### hours

• **hours**: *number*

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:79](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L79)

___

### id

• **id**: *string*

Temp ID field.

**`remarks`** Needs to be queryable by GraphQL for now.

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:20](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L20)

___

### isConfirmed

• **isConfirmed**: *boolean*= false

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:70](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L70)

___

### isForecast

• **isForecast**: *boolean*

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:76](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L76)

___

### isForecasted

• **isForecasted**: *boolean*= false

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:73](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L73)

___

### month

• **month**: *string*

Month name

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:46](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L46)

___

### startDate

• **startDate**: *string*

Start date

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:58](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L58)

___

### userId

• **userId**: *string*

The full GUID of the user

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:34](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L34)

___

### week

• **week**: *number*

The week number.

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L40)

___

### year

• **year**: *number*

Year. Quite obvius.

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:52](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L52)
