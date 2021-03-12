[did-server - v0.9.8](../README.md) / [graphql](../modules/graphql.md) / TimesheetPeriodObject

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

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:80](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L80)

## Properties

### \_id

• **\_id**: *string*

Primary ID field.

Used as primary key (id) in CosmosDB

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:26](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L26)

___

### endDate

• **endDate**: *string*

End date

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:62](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L62)

___

### events

• `Optional` **events**: [*EventObject*](graphql.eventobject.md)[]

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:65](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L65)

___

### forecastedHours

• `Optional` **forecastedHours**: *number*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:80](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L80)

___

### hours

• **hours**: *number*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:77](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L77)

___

### id

• **id**: *string*

Temp ID field.

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L18)

___

### isConfirmed

• **isConfirmed**: *boolean*= false

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:68](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L68)

___

### isForecast

• **isForecast**: *boolean*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:74](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L74)

___

### isForecasted

• **isForecasted**: *boolean*= false

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:71](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L71)

___

### month

• **month**: *string*

Month name

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:44](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L44)

___

### startDate

• **startDate**: *string*

Start date

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:56](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L56)

___

### userId

• **userId**: *string*

The full GUID of the user

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:32](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L32)

___

### week

• **week**: *number*

The week number.

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:38](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L38)

___

### year

• **year**: *number*

Year. Quite obvius.

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:50](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L50)
