[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / TimesheetPeriod

# Class: TimesheetPeriod

[Pages](../modules/pages.md).TimesheetPeriod

Handles a part of a `TimesheetScope`. Represented
by the combination of weeek number, month index and
year.

**`remarks`** Look into creating a `react` hook
that can ease working with the periods

## Table of contents

### Constructors

- [constructor](pages.timesheetperiod.md#constructor)

### Properties

- [\_uiIgnoredEvents](pages.timesheetperiod.md#_uiignoredevents)
- [\_uiIgnoredEventsStorage](pages.timesheetperiod.md#_uiignoredeventsstorage)
- [\_uiMatchedEvents](pages.timesheetperiod.md#_uimatchedevents)
- [\_uiMatchedEventsStorage](pages.timesheetperiod.md#_uimatchedeventsstorage)
- [endDate](pages.timesheetperiod.md#enddate)
- [events](pages.timesheetperiod.md#events)
- [forecastedHours](pages.timesheetperiod.md#forecastedhours)
- [id](pages.timesheetperiod.md#id)
- [isConfirmed](pages.timesheetperiod.md#isconfirmed)
- [isForecast](pages.timesheetperiod.md#isforecast)
- [isForecasted](pages.timesheetperiod.md#isforecasted)
- [month](pages.timesheetperiod.md#month)
- [startDate](pages.timesheetperiod.md#startdate)
- [week](pages.timesheetperiod.md#week)

### Accessors

- [data](pages.timesheetperiod.md#data)
- [errors](pages.timesheetperiod.md#errors)
- [ignoredEvents](pages.timesheetperiod.md#ignoredevents)
- [isComplete](pages.timesheetperiod.md#iscomplete)
- [isPast](pages.timesheetperiod.md#ispast)
- [matchedDuration](pages.timesheetperiod.md#matchedduration)
- [matchedEvents](pages.timesheetperiod.md#matchedevents)
- [path](pages.timesheetperiod.md#path)
- [totalDuration](pages.timesheetperiod.md#totalduration)
- [unmatchedDuration](pages.timesheetperiod.md#unmatchedduration)

### Methods

- [\_checkUiManualMatch](pages.timesheetperiod.md#_checkuimanualmatch)
- [clearIgnoredEvents](pages.timesheetperiod.md#clearignoredevents)
- [clearManualMatch](pages.timesheetperiod.md#clearmanualmatch)
- [getEvents](pages.timesheetperiod.md#getevents)
- [getName](pages.timesheetperiod.md#getname)
- [ignoreEvent](pages.timesheetperiod.md#ignoreevent)
- [initialize](pages.timesheetperiod.md#initialize)
- [setManualMatch](pages.timesheetperiod.md#setmanualmatch)
- [weekdays](pages.timesheetperiod.md#weekdays)

## Constructors

### constructor

\+ **new TimesheetPeriod**(): [*TimesheetPeriod*](pages.timesheetperiod.md)

**Returns:** [*TimesheetPeriod*](pages.timesheetperiod.md)

## Properties

### \_uiIgnoredEvents

• `Private` **\_uiIgnoredEvents**: *string*[]

Defined in: [pages/Timesheet/TimesheetPeriod.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L36)

___

### \_uiIgnoredEventsStorage

• `Private` **\_uiIgnoredEventsStorage**: [*BrowserStorage*](utils.browserstorage.md)<string[]\>

Defined in: [pages/Timesheet/TimesheetPeriod.ts:39](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L39)

___

### \_uiMatchedEvents

• `Private` **\_uiMatchedEvents**: *Record*<string, Project\>

Defined in: [pages/Timesheet/TimesheetPeriod.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L37)

___

### \_uiMatchedEventsStorage

• `Private` **\_uiMatchedEventsStorage**: [*BrowserStorage*](utils.browserstorage.md)<Record<string, Project\>\>

Defined in: [pages/Timesheet/TimesheetPeriod.ts:38](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L38)

___

### endDate

• `Private` `Readonly` **endDate**: *string*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L28)

___

### events

• `Private` **events**: *EventObject*[]

Defined in: [pages/Timesheet/TimesheetPeriod.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L35)

___

### forecastedHours

• `Readonly` **forecastedHours**: *number*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:33](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L33)

___

### id

• **id**: *string*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L26)

___

### isConfirmed

• `Optional` `Readonly` **isConfirmed**: *boolean*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L30)

___

### isForecast

• `Readonly` **isForecast**: *boolean*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L32)

___

### isForecasted

• `Readonly` **isForecasted**: *boolean*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L31)

___

### month

• `Readonly` **month**: *string*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:34](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L34)

___

### startDate

• `Private` `Readonly` **startDate**: *string*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L27)

___

### week

• `Readonly` **week**: *number*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:29](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L29)

## Accessors

### data

• get **data**(): *TimesheetPeriodInput*

Get data for the period. Returns
`id`, `startDate`, `endDate`, `forecastedHours`
and `matchedEvents`

**`memberof`** TimesheetPeriod

**Returns:** *TimesheetPeriodInput*

Data for the period

Defined in: [pages/Timesheet/TimesheetPeriod.ts:259](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L259)

___

### errors

• get **errors**(): *any*[]

Get aggregated errors from the events in the period

**`memberof`** TimesheetPeriod

**Returns:** *any*[]

Defined in: [pages/Timesheet/TimesheetPeriod.ts:145](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L145)

___

### ignoredEvents

• get **ignoredEvents**(): *string*[]

Get ignored events

**`memberof`** TimesheetPeriod

**Returns:** *string*[]

Defined in: [pages/Timesheet/TimesheetPeriod.ts:136](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L136)

___

### isComplete

• get **isComplete**(): *boolean*

Period is complete meaning all events are matched

**`memberof`** TimesheetPeriod

**Returns:** *boolean*

`true` if the unmatched duration (`unmatchedDuration`) is equal to zero (0)

Defined in: [pages/Timesheet/TimesheetPeriod.ts:300](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L300)

___

### isPast

• get **isPast**(): *boolean*

Period is in the past

**`memberof`** TimesheetPeriod

**Returns:** *boolean*

`true` if the `endDate` is before today

Defined in: [pages/Timesheet/TimesheetPeriod.ts:311](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L311)

___

### matchedDuration

• get **matchedDuration**(): *number*

Get matched duration for the events in the period

**`memberof`** TimesheetPeriod

**Returns:** *number*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:166](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L166)

___

### matchedEvents

• get **matchedEvents**(): *EventInput*[]

Get matched events with properties

**`memberof`** TimesheetPeriod

**Returns:** *EventInput*[]

Defined in: [pages/Timesheet/TimesheetPeriod.ts:235](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L235)

___

### path

• get **path**(): *string*

Returns URL path for the period

**`example`** `11_3_2021` => `11/3/2021`

**`memberof`** TimesheetPeriod

**Returns:** *string*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:289](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L289)

___

### totalDuration

• get **totalDuration**(): *number*

Get total duration of events in the period

**`memberof`** TimesheetPeriod

**Returns:** *number*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:157](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L157)

___

### unmatchedDuration

• get **unmatchedDuration**(): *number*

Get unmatched duration for the events in the period

**`memberof`** TimesheetPeriod

**Returns:** *number*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:178](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L178)

## Methods

### \_checkUiManualMatch

▸ `Private`**_checkUiManualMatch**(`event`: *EventObject*): *EventObject*

Check manual match in localStorage

If it find a match project/customer and manualMatch is set for the
event

If the event has manualMatch set, but it cannot be found in localStorage
project/customer is set to null for the event

**`memberof`** TimesheetPeriod

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | *EventObject* | Event object   |

**Returns:** *EventObject*

an extended event object

Defined in: [pages/Timesheet/TimesheetPeriod.ts:88](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L88)

___

### clearIgnoredEvents

▸ **clearIgnoredEvents**(): *void*

Clear ignored events from browser storage

**`memberof`** TimesheetPeriod

**Returns:** *void*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:225](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L225)

___

### clearManualMatch

▸ **clearManualMatch**(`eventId`: *string*): *void*

Clear manual match from local storage

**`memberof`** TimesheetPeriod

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`eventId` | *string* | Event id    |

**Returns:** *void*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:203](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L203)

___

### getEvents

▸ **getEvents**(`includeUnmatched?`: *boolean*): *EventObject*[]

Get events

**`memberof`** TimesheetPeriod

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`includeUnmatched` | *boolean* | true | Include unmatched events    |

**Returns:** *EventObject*[]

Defined in: [pages/Timesheet/TimesheetPeriod.ts:117](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L117)

___

### getName

▸ **getName**(`t`: TFunction, `includeMonth?`: *boolean*): *string*

Get name of period

**`memberof`** TimesheetPeriod

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`includeMonth?` | *boolean* | Include month   |

**Returns:** *string*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:68](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L68)

___

### ignoreEvent

▸ **ignoreEvent**(`eventId`: *string*): *void*

Store ignored event in browser storage

**`memberof`** TimesheetPeriod

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`eventId` | *string* | Event id    |

**Returns:** *void*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:215](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L215)

___

### initialize

▸ **initialize**(`period`: *TimesheetPeriodObject*): [*TimesheetPeriod*](pages.timesheetperiod.md)

Constructor for `TimesheetPeriod`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`period` | *TimesheetPeriodObject* | Period    |

**Returns:** [*TimesheetPeriod*](pages.timesheetperiod.md)

Defined in: [pages/Timesheet/TimesheetPeriod.ts:46](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L46)

___

### setManualMatch

▸ **setManualMatch**(`eventId`: *string*, `project`: *Project*): *void*

Save manual match in browser storage

**`memberof`** TimesheetPeriod

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`eventId` | *string* | Event id   |
`project` | *Project* | Project    |

**Returns:** *void*

Defined in: [pages/Timesheet/TimesheetPeriod.ts:190](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L190)

___

### weekdays

▸ **weekdays**(`template?`: *string*): *string*[]

Get weekdays in the specified format

**`memberof`** TimesheetPeriod

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`template` | *string* | 'dddd DD' | Template    |

**Returns:** *string*[]

Defined in: [pages/Timesheet/TimesheetPeriod.ts:277](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L277)
