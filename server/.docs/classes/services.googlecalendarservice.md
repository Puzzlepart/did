[did-server - v0.9.11](../README.md) / [services](../modules/services.md) / GoogleCalendarService

# Class: GoogleCalendarService

[services](../modules/services.md).GoogleCalendarService

Google calendar service

## Table of contents

### Constructors

- [constructor](services.googlecalendarservice.md#constructor)

### Properties

- [\_cal](services.googlecalendarservice.md#_cal)

### Methods

- [getCalendars](services.googlecalendarservice.md#getcalendars)
- [getEvents](services.googlecalendarservice.md#getevents)

## Constructors

### constructor

\+ **new GoogleCalendarService**(`_request`: *any*): [*GoogleCalendarService*](services.googlecalendarservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_request` | *any* |

**Returns:** [*GoogleCalendarService*](services.googlecalendarservice.md)

Defined in: [services/google/index.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/services/google/index.ts#L17)

## Properties

### \_cal

• `Private` **\_cal**: *Calendar*

Defined in: [services/google/index.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/services/google/index.ts#L17)

## Methods

### getCalendars

▸ **getCalendars**(`accessRole?`: *string*): *Promise*<Schema$CalendarListEntry[]\>

Get calendars

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`accessRole` | *string* | 'owner' | Access role   |

**Returns:** *Promise*<Schema$CalendarListEntry[]\>

Calendars with the specified `accessRole`

Defined in: [services/google/index.ts:41](https://github.com/Puzzlepart/did/blob/dev/server/services/google/index.ts#L41)

___

### getEvents

▸ **getEvents**(`startDateTimeIso`: *string*, `endDateTimeIso`: *string*): *Promise*<any[]\>

Get events for the specified period using Google APIs

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`startDateTimeIso` | *string* | Start date time in `ISO format`   |
`endDateTimeIso` | *string* | End date time in `ISO format`    |

**Returns:** *Promise*<any[]\>

Defined in: [services/google/index.ts:55](https://github.com/Puzzlepart/did/blob/dev/server/services/google/index.ts#L55)
