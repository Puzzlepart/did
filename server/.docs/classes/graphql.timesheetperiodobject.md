[did-server - v0.9.11](../README.md) / [graphql](../modules/graphql.md) / TimesheetPeriodObject

# Class: TimesheetPeriodObject

[graphql](../modules/graphql.md).TimesheetPeriodObject

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

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L83)

## Properties

### \_id

• **\_id**: *string*

Primary ID field.

Used as primary key (id) in CosmosDB

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:29](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L29)

___

### endDate

• **endDate**: *string*

End date

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:65](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L65)

___

### events

• `Optional` **events**: [*EventObject*](graphql.eventobject.md)[]

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L68)

___

### forecastedHours

• `Optional` **forecastedHours**: *number*

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L83)

___

### hours

• **hours**: *number*

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:80](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L80)

___

### id

• **id**: *string*

Temp ID field.

**`remarks`** Needs to be queryable by GraphQL for now.

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L21)

___

### isConfirmed

• **isConfirmed**: *boolean*= false

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L71)

___

### isForecast

• **isForecast**: *boolean*

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:77](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L77)

___

### isForecasted

• **isForecasted**: *boolean*= false

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:74](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L74)

___

### month

• **month**: *string*

Month name

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:47](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L47)

___

### startDate

• **startDate**: *string*

Start date

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:59](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L59)

___

### userId

• **userId**: *string*

The full GUID of the user

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L35)

___

### week

• **week**: *number*

The week number.

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:41](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L41)

___

### year

• **year**: *number*

Year. Quite obvius.

Defined in: [graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:53](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L53)
