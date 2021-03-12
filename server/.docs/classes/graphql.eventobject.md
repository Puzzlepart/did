[did-server - v0.9.8](../README.md) / [graphql](../modules/graphql.md) / EventObject

# Class: EventObject

[graphql](../modules/graphql.md).EventObject

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

\+ **new EventObject**(): [*EventObject*](graphql.eventobject.md)

**Returns:** [*EventObject*](graphql.eventobject.md)

## Properties

### body

• `Optional` **body**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:24](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L24)

___

### categories

• `Optional` **categories**: *string*[]

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:74](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L74)

___

### customer

• `Optional` **customer**: [*Customer*](graphql.customer.md)

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:51](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L51)

___

### customerKey

• `Optional` **customerKey**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:57](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L57)

___

### date

• `Optional` **date**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:36](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L36)

___

### day

• `Optional` **day**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:18](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L18)

___

### duration

• `Optional` **duration**: *number*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:39](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L39)

___

### endDateTime

• `Optional` **endDateTime**: Date

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:33](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L33)

___

### error

• `Optional` **error**: *EventError*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L66)

___

### id

• **id**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:15](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L15)

___

### isOrganizer

• `Optional` **isOrganizer**: *boolean*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L27)

___

### isSystemIgnored

• `Optional` **isSystemIgnored**: *boolean*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:72](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L72)

___

### labels

• `Optional` **labels**: [*LabelObject*](graphql.labelobject.md)[]

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:63](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L63)

___

### manualMatch

• `Optional` **manualMatch**: *boolean*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:69](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L69)

___

### project

• **project**: [*Project*](graphql.project.md)

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L45)

___

### projectId

• `Optional` **projectId**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:42](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L42)

___

### projectKey

• `Optional` **projectKey**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:54](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L54)

___

### startDateTime

• `Optional` **startDateTime**: Date

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L30)

___

### suggestedProject

• `Optional` **suggestedProject**: [*Project*](graphql.project.md)

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L48)

___

### title

• `Optional` **title**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L21)

___

### webLink

• `Optional` **webLink**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:60](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/timesheet/types/EventObject.ts#L60)
