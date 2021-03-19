[did-client - v0.9.11](../README.md) / [Pages](../modules/pages.md) / TimesheetPeriod

# Class: TimesheetPeriod

[Pages](../modules/pages.md).TimesheetPeriod

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

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:29](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L29)

___

### \_uiIgnoredEventsStorage

• `Private` **\_uiIgnoredEventsStorage**: [*BrowserStorage*](utils.browserstorage.md)<string[]\>

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:32](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L32)

___

### \_uiMatchedEvents

• `Private` **\_uiMatchedEvents**: *Record*<string, Project\>

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:30](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L30)

___

### \_uiMatchedEventsStorage

• `Private` **\_uiMatchedEventsStorage**: [*BrowserStorage*](utils.browserstorage.md)<Record<string, Project\>\>

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:31](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L31)

___

### endDate

• `Private` `Readonly` **endDate**: *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:21](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L21)

___

### events

• `Private` **events**: *EventObject*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:28](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L28)

___

### forecastedHours

• `Readonly` **forecastedHours**: *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L26)

___

### id

• **id**: *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:19](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L19)

___

### isConfirmed

• `Optional` `Readonly` **isConfirmed**: *boolean*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:23](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L23)

___

### isForecast

• `Readonly` **isForecast**: *boolean*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L25)

___

### isForecasted

• `Readonly` **isForecasted**: *boolean*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:24](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L24)

___

### month

• `Private` `Readonly` **month**: *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:27](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L27)

___

### startDate

• `Private` `Readonly` **startDate**: *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L20)

___

### week

• `Readonly` **week**: *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:22](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L22)

## Accessors

### data

• get **data**(): *TimesheetPeriodInput*

Get data for the period

**Returns:** *TimesheetPeriodInput*

Data for the period

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:224](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L224)

___

### errors

• get **errors**(): *any*[]

**Returns:** *any*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:130](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L130)

___

### ignoredEvents

• get **ignoredEvents**(): *string*[]

Get ignored events

**Returns:** *string*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:123](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L123)

___

### isComplete

• get **isComplete**(): *boolean*

Period is complete meaning all events are matched

**Returns:** *boolean*

true if the unmatched duration (unmatchedDuration) is equal to zero (0)

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:260](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L260)

___

### isPast

• get **isPast**(): *boolean*

Period is in the past

**Returns:** *boolean*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:267](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L267)

___

### matchedDuration

• get **matchedDuration**(): *number*

**Returns:** *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:147](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L147)

___

### matchedEvents

• `Private`get **matchedEvents**(): *EventInput*[]

Get matched events with properties

**Returns:** *EventInput*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:204](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L204)

___

### path

• get **path**(): *string*

Returns URL path for the period

**Returns:** *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:248](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L248)

___

### totalDuration

• get **totalDuration**(): *number*

Get total duration of events in the period

**Returns:** *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:140](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L140)

___

### unmatchedDuration

• get **unmatchedDuration**(): *number*

Get unmatched duration for the events in the period

**Returns:** *number*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:157](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L157)

## Methods

### \_checkUiManualMatch

▸ `Private`**_checkUiManualMatch**(`event`: *EventObject*): *EventObject*

Check manual match in localStorage

If it find a match project/customer and manualMatch is set for the
event

If the event has manualMatch set, but it cannot be found in localStorage
project/customer is set to null for the event

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | *EventObject* | Event object    |

**Returns:** *EventObject*

an extended event object

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:79](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L79)

___

### clearIgnoredEvents

▸ **clearIgnoredEvents**(): *void*

Clear ignored events from browser storage

**Returns:** *void*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:196](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L196)

___

### clearManualMatch

▸ **clearManualMatch**(`eventId`: *string*): *void*

Clear manual match from local storage

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`eventId` | *string* | Event id    |

**Returns:** *void*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:178](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L178)

___

### getEvents

▸ **getEvents**(`includeUnmatched?`: *boolean*): *EventObject*[]

Get events

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`includeUnmatched` | *boolean* | true | Include unmatched events    |

**Returns:** *EventObject*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:106](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L106)

___

### getName

▸ **getName**(`t`: TFunction, `includeMonth?`: *boolean*): *string*

Get name of period

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate function   |
`includeMonth?` | *boolean* | Include month    |

**Returns:** *string*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:60](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L60)

___

### ignoreEvent

▸ **ignoreEvent**(`eventId`: *string*): *void*

Store ignored event in browser storage

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`eventId` | *string* | Event id    |

**Returns:** *void*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:188](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L188)

___

### initialize

▸ **initialize**(`period`: *TimesheetPeriodObject*): [*TimesheetPeriod*](pages.timesheetperiod.md)

Initializes a new period instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`period` | *TimesheetPeriodObject* | Period    |

**Returns:** [*TimesheetPeriod*](pages.timesheetperiod.md)

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:39](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L39)

___

### setManualMatch

▸ **setManualMatch**(`eventId`: *string*, `project`: *Project*): *void*

Save manual match in browser storage

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`eventId` | *string* | Event id   |
`project` | *Project* | Project    |

**Returns:** *void*

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:167](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L167)

___

### weekdays

▸ **weekdays**(`dayFormat?`: *string*): *string*[]

Get weekdays in the specified format

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`dayFormat` | *string* | 'dddd DD' | Day format    |

**Returns:** *string*[]

Defined in: [client/pages/Timesheet/TimesheetPeriod.ts:240](https://github.com/Puzzlepart/did/blob/dev/client/pages/Timesheet/TimesheetPeriod.ts#L240)
