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

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:43](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L43)

## Properties

### endDate

• **endDate**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:28](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L28)

___

### events

• `Optional` **events**: [*EventObject*](graphql.eventobject.md)[]

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:31](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L31)

___

### forecastedHours

• `Optional` **forecastedHours**: *number*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:43](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L43)

___

### id

• **id**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L16)

___

### isConfirmed

• **isConfirmed**: *boolean*= false

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:34](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L34)

___

### isForecast

• **isForecast**: *boolean*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L40)

___

### isForecasted

• **isForecasted**: *boolean*= false

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:37](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L37)

___

### month

• **month**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:22](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L22)

___

### startDate

• **startDate**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:25](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L25)

___

### week

• **week**: *number*

Defined in: [server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts:19](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/TimesheetPeriodObject.ts#L19)
