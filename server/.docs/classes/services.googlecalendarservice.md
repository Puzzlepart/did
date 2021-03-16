[did-server - v0.9.9](../README.md) / [services](../modules/services.md) / GoogleCalendarService

# Class: GoogleCalendarService

[services](../modules/services.md).GoogleCalendarService

## Table of contents

### Constructors

- [constructor](services.googlecalendarservice.md#constructor)

### Properties

- [\_cal](services.googlecalendarservice.md#_cal)

### Methods

- [getEvents](services.googlecalendarservice.md#getevents)

## Constructors

### constructor

\+ **new GoogleCalendarService**(`_request`: *any*): [*GoogleCalendarService*](services.googlecalendarservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`_request` | *any* |

**Returns:** [*GoogleCalendarService*](services.googlecalendarservice.md)

Defined in: [server/services/google/index.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/google/index.ts#L11)

## Properties

### \_cal

• `Private` **\_cal**: *Calendar*

Defined in: [server/services/google/index.ts:11](https://github.com/Puzzlepart/did/blob/dev/server/services/google/index.ts#L11)

## Methods

### getEvents

▸ **getEvents**(`startDate`: *string*, `endDate`: *string*, `tzOffset`: *number*): *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`startDate` | *string* |
`endDate` | *string* |
`tzOffset` | *number* |

**Returns:** *Promise*<[*EventObject*](graphql.eventobject.md)[]\>

Defined in: [server/services/google/index.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/services/google/index.ts#L27)
