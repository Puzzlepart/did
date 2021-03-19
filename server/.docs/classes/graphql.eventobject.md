[did-server - v0.9.11](../README.md) / [GraphQL](../modules/graphql.md) / EventObject

# Class: EventObject

[GraphQL](../modules/graphql.md).EventObject

An Object type that describes a Event

## Table of contents

### Constructors

- [constructor](graphql.eventobject.md#constructor)

### Properties

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

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:78](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L78)

## Properties

### body

• `Optional` **body**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:28](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L28)

___

### categories

• `Optional` **categories**: *string*[]

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:78](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L78)

___

### customer

• `Optional` **customer**: [*Customer*](graphql.customer.md)

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:55](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L55)

___

### customerKey

• `Optional` **customerKey**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:61](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L61)

___

### date

• `Optional` **date**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L40)

___

### day

• `Optional` **day**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:22](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L22)

___

### duration

• `Optional` **duration**: *number*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:43](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L43)

___

### endDateTime

• `Optional` **endDateTime**: Date

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:37](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L37)

___

### error

• `Optional` **error**: *EventError*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:70](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L70)

___

### id

• **id**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:19](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L19)

___

### isOrganizer

• `Optional` **isOrganizer**: *boolean*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:31](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L31)

___

### isSystemIgnored

• `Optional` **isSystemIgnored**: *boolean*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:76](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L76)

___

### labels

• `Optional` **labels**: [*LabelObject*](graphql.labelobject.md)[]

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:67](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L67)

___

### manualMatch

• `Optional` **manualMatch**: *boolean*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:73](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L73)

___

### project

• `Optional` **project**: [*Project*](graphql.project.md)

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:49](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L49)

___

### projectId

• `Optional` **projectId**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:46](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L46)

___

### projectKey

• `Optional` **projectKey**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:58](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L58)

___

### startDateTime

• `Optional` **startDateTime**: Date

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:34](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L34)

___

### suggestedProject

• `Optional` **suggestedProject**: [*Project*](graphql.project.md)

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:52](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L52)

___

### title

• `Optional` **title**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:25](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L25)

___

### webLink

• `Optional` **webLink**: *string*

Defined in: [graphql/resolvers/timesheet/types/EventObject.ts:64](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L64)
