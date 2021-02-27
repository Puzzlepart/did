[did-server](../README.md) / [graphql](../modules/graphql.md) / EventObject

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

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:20](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L20)

___

### categories

• `Optional` **categories**: *string*[]

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:67](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L67)

___

### customer

• `Optional` **customer**: [*Customer*](graphql.customer.md)

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:44](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L44)

___

### customerKey

• `Optional` **customerKey**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:50](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L50)

___

### date

• `Optional` **date**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:32](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L32)

___

### day

• `Optional` **day**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:14](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L14)

___

### duration

• `Optional` **duration**: *number*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:35](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L35)

___

### endDateTime

• `Optional` **endDateTime**: Date

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:29](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L29)

___

### error

• `Optional` **error**: [*EventError*](graphql.eventerror.md)

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:59](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L59)

___

### id

• **id**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:11](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L11)

___

### isOrganizer

• `Optional` **isOrganizer**: *boolean*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:23](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L23)

___

### isSystemIgnored

• `Optional` **isSystemIgnored**: *boolean*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:65](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L65)

___

### labels

• `Optional` **labels**: [*LabelObject*](graphql.labelobject.md)[]

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:56](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L56)

___

### manualMatch

• `Optional` **manualMatch**: *boolean*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:62](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L62)

___

### project

• **project**: [*Project*](graphql.project.md)

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:38](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L38)

___

### projectKey

• `Optional` **projectKey**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:47](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L47)

___

### startDateTime

• `Optional` **startDateTime**: Date

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:26](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L26)

___

### suggestedProject

• `Optional` **suggestedProject**: [*Project*](graphql.project.md)

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:41](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L41)

___

### title

• `Optional` **title**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:17](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L17)

___

### webLink

• `Optional` **webLink**: *string*

Defined in: [server/graphql/resolvers/timesheet/types/EventObject.ts:53](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/timesheet/types/EventObject.ts#L53)
