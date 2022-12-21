[did-server - v0.11.4](../README.md) / [GraphQL](../modules/graphql.md) / EventObject

# Class: EventObject

[GraphQL](../modules/graphql.md).EventObject

An Object type that describes a Event

## Table of contents

### Constructors

- [constructor](graphql.eventobject.md#constructor)

### Properties

- [adjustedMinutes](graphql.eventobject.md#adjustedminutes)
- [body](graphql.eventobject.md#body)
- [categories](graphql.eventobject.md#categories)
- [customer](graphql.eventobject.md#customer)
- [customerKey](graphql.eventobject.md#customerkey)
- [date](graphql.eventobject.md#date)
- [day](graphql.eventobject.md#day)
- [duration](graphql.eventobject.md#duration)
- [endDateTime](graphql.eventobject.md#enddatetime)
- [error](graphql.eventobject.md#error)
- [id](graphql.eventobject.md#id)
- [isOrganizer](graphql.eventobject.md#isorganizer)
- [isSystemIgnored](graphql.eventobject.md#issystemignored)
- [labels](graphql.eventobject.md#labels)
- [manualMatch](graphql.eventobject.md#manualmatch)
- [originalDuration](graphql.eventobject.md#originalduration)
- [project](graphql.eventobject.md#project)
- [projectId](graphql.eventobject.md#projectid)
- [projectKey](graphql.eventobject.md#projectkey)
- [startDateTime](graphql.eventobject.md#startdatetime)
- [suggestedProject](graphql.eventobject.md#suggestedproject)
- [title](graphql.eventobject.md#title)
- [webLink](graphql.eventobject.md#weblink)

## Constructors

### constructor

\+ **new EventObject**(`id`: *string*, `title`: *string*, `body`: *string*, `isOrganizer`: *boolean*, `start`: DateWithTimezone, `end`: DateWithTimezone, `webLink`: *string*, `categories?`: *string*[]): [*EventObject*](graphql.eventobject.md)

Constructs a new EventObject

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | ID   |
`title` | *string* | Title   |
`body` | *string* | Body   |
`isOrganizer` | *boolean* | Is organizer   |
`start` | DateWithTimezone | Start date with timezone   |
`end` | DateWithTimezone | End date with timezone   |
`webLink` | *string* | Web link   |
`categories` | *string*[] | Categories    |

**Returns:** [*EventObject*](graphql.eventobject.md)

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L83)

## Properties

### adjustedMinutes

• `Optional` **adjustedMinutes**: *number*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L48)

___

### body

• `Optional` **body**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L27)

___

### categories

• `Optional` **categories**: *string*[]

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:83](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L83)

___

### customer

• `Optional` **customer**: [*Customer*](graphql.customer.md)

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:60](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L60)

___

### customerKey

• `Optional` **customerKey**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L66)

___

### date

• `Optional` **date**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L39)

___

### day

• `Optional` **day**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L21)

___

### duration

• `Optional` **duration**: *number*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:42](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L42)

___

### endDateTime

• `Optional` **endDateTime**: Date

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:36](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L36)

___

### error

• `Optional` **error**: *EventError*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:75](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L75)

___

### id

• **id**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L18)

___

### isOrganizer

• `Optional` **isOrganizer**: *boolean*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L30)

___

### isSystemIgnored

• `Optional` **isSystemIgnored**: *boolean*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L81)

___

### labels

• `Optional` **labels**: [*LabelObject*](graphql.labelobject.md)[]

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:72](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L72)

___

### manualMatch

• `Optional` **manualMatch**: *boolean*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:78](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L78)

___

### originalDuration

• `Optional` **originalDuration**: *number*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L45)

___

### project

• `Optional` **project**: [*Project*](graphql.project.md)

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:54](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L54)

___

### projectId

• `Optional` **projectId**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:51](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L51)

___

### projectKey

• `Optional` **projectKey**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:63](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L63)

___

### startDateTime

• `Optional` **startDateTime**: Date

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L33)

___

### suggestedProject

• `Optional` **suggestedProject**: [*Project*](graphql.project.md)

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:57](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L57)

___

### title

• `Optional` **title**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L24)

___

### webLink

• `Optional` **webLink**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:69](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L69)
