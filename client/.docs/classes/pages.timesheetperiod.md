[did-client - v0.11.2](../README.md) / [Pages](../modules/pages.md) / TimesheetPeriod

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
- [holidays](pages.timesheetperiod.md#holidays)
- [id](pages.timesheetperiod.md#id)
- [isConfirmed](pages.timesheetperiod.md#isconfirmed)
- [isForecast](pages.timesheetperiod.md#isforecast)
- [isForecasted](pages.timesheetperiod.md#isforecasted)
- [month](pages.timesheetperiod.md#month)
- [startDate](pages.timesheetperiod.md#startdate)
- [week](pages.timesheetperiod.md#week)

### Accessors

- [data](pages.timesheetperiod.md#data)
- [endDateIndex](pages.timesheetperiod.md#enddateindex)
- [errors](pages.timesheetperiod.md#errors)
- [ignoredEvents](pages.timesheetperiod.md#ignoredevents)
- [isComplete](pages.timesheetperiod.md#iscomplete)
- [isPast](pages.timesheetperiod.md#ispast)
- [matchedDuration](pages.timesheetperiod.md#matchedduration)
- [matchedEvents](pages.timesheetperiod.md#matchedevents)
- [startDateIndex](pages.timesheetperiod.md#startdateindex)
- [totalDuration](pages.timesheetperiod.md#totalduration)
- [unmatchedDuration](pages.timesheetperiod.md#unmatchedduration)

### Methods

- [\_checkUiManualMatch](pages.timesheetperiod.md#_checkuimanualmatch)
- [clearIgnoredEvents](pages.timesheetperiod.md#clearignoredevents)
- [clearManualMatch](pages.timesheetperiod.md#clearmanualmatch)
- [getEvents](pages.timesheetperiod.md#getevents)
- [getName](pages.timesheetperiod.md#getname)
- [ignoreAllEvents](pages.timesheetperiod.md#ignoreallevents)
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

UI ignored events for the period

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:50](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L50)

___

### \_uiIgnoredEventsStorage

• `Private` **\_uiIgnoredEventsStorage**: [*BrowserStorage*](utils.browserstorage.md)<string[]\>

Ignored events for the period persisted in browser storage

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:65](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L65)

___

### \_uiMatchedEvents

• `Private` **\_uiMatchedEvents**: *Record*<string, Project\>

UI matched events for the period

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:55](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L55)

___

### \_uiMatchedEventsStorage

• `Private` **\_uiMatchedEventsStorage**: [*BrowserStorage*](utils.browserstorage.md)<Record<string, Project\>\>

Matched events for the period persisted in browser storage

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:60](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L60)

___

### endDate

• `Readonly` **endDate**: *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:33](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L33)

___

### events

• `Private` **events**: *EventObject*[]

Events for the period

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:45](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L45)

___

### forecastedHours

• `Readonly` **forecastedHours**: *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:38](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L38)

___

### holidays

• `Readonly` **holidays**: *any*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:40](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L40)

___

### id

• **id**: *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L31)

___

### isConfirmed

• `Optional` `Readonly` **isConfirmed**: *boolean*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:35](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L35)

___

### isForecast

• `Readonly` **isForecast**: *boolean*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:37](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L37)

___

### isForecasted

• `Readonly` **isForecasted**: *boolean*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:36](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L36)

___

### month

• `Readonly` **month**: *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:39](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L39)

___

### startDate

• `Readonly` **startDate**: *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L32)

___

### week

• `Readonly` **week**: *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:34](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L34)

## Accessors

### data

• get **data**(): *TimesheetPeriodInput*

Get data for the period. Returns
`id`, `startDate`, `endDate`, `forecastedHours`
and `matchedEvents`

**`memberof`** TimesheetPeriod

**Returns:** *TimesheetPeriodInput*

Data for the period

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:318](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L318)

___

### endDateIndex

• get **endDateIndex**(): *number*

Get end date index with Monday = 0

**Returns:** *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:374](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L374)

___

### errors

• get **errors**(): *any*[]

Get aggregated errors from the events in the period

**`memberof`** TimesheetPeriod

**Returns:** *any*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:179](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L179)

___

### ignoredEvents

• get **ignoredEvents**(): *string*[]

Get ignored events for the period

**`memberof`** TimesheetPeriod

**Returns:** *string*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:170](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L170)

___

### isComplete

• get **isComplete**(): *boolean*

Period is complete meaning all events are matched

**`memberof`** TimesheetPeriod

**Returns:** *boolean*

`true` if the unmatched duration (`unmatchedDuration`) is equal to zero (0)

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:348](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L348)

___

### isPast

• get **isPast**(): *boolean*

Period is in the past

**`memberof`** TimesheetPeriod

**Returns:** *boolean*

`true` if the `endDate` is before today

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:359](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L359)

___

### matchedDuration

• get **matchedDuration**(): *number*

Get matched duration for the events in the period

**`memberof`** TimesheetPeriod

**Returns:** *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:200](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L200)

___

### matchedEvents

• get **matchedEvents**(): *ClientEventInput*[]

Get matched events with properties

**`memberof`** TimesheetPeriod

**Returns:** *ClientEventInput*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:281](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L281)

___

### startDateIndex

• get **startDateIndex**(): *number*

Get start date index with Monday = 0

**Returns:** *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:366](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L366)

___

### totalDuration

• get **totalDuration**(): *number*

Get total duration of events in the period

**`memberof`** TimesheetPeriod

**Returns:** *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:191](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L191)

___

### unmatchedDuration

• get **unmatchedDuration**(): *number*

Get unmatched duration for the events in the period

**`memberof`** TimesheetPeriod

**Returns:** *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:212](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L212)

## Methods

### \_checkUiManualMatch

▸ `Private`**_checkUiManualMatch**(`event`: *EventObject*): *EventObject*

Check manual match in localStorage

If it find a match project/customer and manualMatch is set for the
event

If the event has manualMatch set, but it cannot be found in localStorage
project/customer is set to null for the event

**`remarks`** A bit hacky this one, but it works for now.
Should be refactored in the near future though. Probably
using hooks or something similiar.

**`memberof`** TimesheetPeriod

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | *EventObject* | Event object    |

**Returns:** *EventObject*

an extended event object

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:117](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L117)

___

### clearIgnoredEvents

▸ **clearIgnoredEvents**(): *void*

Clear ignored events from browser storage

**`memberof`** TimesheetPeriod

**Returns:** *void*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:259](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L259)

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

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:237](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L237)

___

### getEvents

▸ **getEvents**(`option?`: [*GetEventsOption*](../enums/pages.geteventsoption.md)): *EventObject*[]

Get events

**`memberof`** TimesheetPeriod

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`option` | [*GetEventsOption*](../enums/pages.geteventsoption.md) | Get events option    |

**Returns:** *EventObject*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:146](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L146)

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

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:92](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L92)

___

### ignoreAllEvents

▸ **ignoreAllEvents**(): *void*

Ignore all unmatched events

**`memberof`** TimesheetPeriod

**Returns:** *void*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:269](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L269)

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

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:249](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L249)

___

### initialize

▸ **initialize**(`period`: *TimesheetPeriodObject*): [*TimesheetPeriod*](pages.timesheetperiod.md)

Constructor for `TimesheetPeriod`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`period` | *TimesheetPeriodObject* | Period    |

**Returns:** [*TimesheetPeriod*](pages.timesheetperiod.md)

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:72](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L72)

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

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:224](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L224)

___

### weekdays

▸ **weekdays**<T\>(`template?`: *string*): T[]

Get weekdays in the specified format

**`memberof`** TimesheetPeriod

#### Type parameters:

Name | Default |
:------ | :------ |
`T` | *string* |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`template` | *string* | 'dddd DD' | Template    |

**Returns:** T[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:336](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L336)
