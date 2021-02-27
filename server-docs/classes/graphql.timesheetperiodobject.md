[did-server](../README.md) / [graphql](../modules/graphql.md) / TimesheetPeriodObject

# Class: TimesheetPeriodObject

[graphql](../modules/graphql.md).TimesheetPeriodObject

## Table of contents

### Constructors

- [constructor](graphql.timesheetperiodobject.md#constructor)

### Properties

- [endDate](graphql.timesheetperiodobject.md#enddate)
- [events](graphql.timesheetperiodobject.md#events)
- [forecastedHours](graphql.timesheetperiodobject.md#forecastedhours)
- [id](graphql.timesheetperiodobject.md#id)
- [isConfirmed](graphql.timesheetperiodobject.md#isconfirmed)
- [isForecast](graphql.timesheetperiodobject.md#isforecast)
- [isForecasted](graphql.timesheetperiodobject.md#isforecasted)
- [month](graphql.timesheetperiodobject.md#month)
- [startDate](graphql.timesheetperiodobject.md#startdate)
- [week](graphql.timesheetperiodobject.md#week)

## Constructors

### constructor

\+ **new TimesheetPeriodObject**(`startDate`: *string*, `endDate`: *string*, `locale`: *string*): [*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)

#### Parameters:

Name | Type |
:------ | :------ |
`startDate` | *string* |
`endDate` | *string* |
`locale` | *string* |

**Returns:** [*TimesheetPeriodObject*](graphql.timesheetperiodobject.md)

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:39](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L39)

## Properties

### endDate

• **endDate**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:24](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L24)

___

### events

• `Optional` **events**: [*EventObject*](graphql.eventobject.md)[]

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:27](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L27)

___

### forecastedHours

• `Optional` **forecastedHours**: *number*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:39](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L39)

___

### id

• **id**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:12](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L12)

___

### isConfirmed

• **isConfirmed**: *boolean*= false

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:30](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L30)

___

### isForecast

• **isForecast**: *boolean*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:36](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L36)

___

### isForecasted

• **isForecasted**: *boolean*= false

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:33](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L33)

___

### month

• **month**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:18](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L18)

___

### startDate

• **startDate**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:21](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L21)

___

### week

• **week**: *number*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:15](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L15)
