[did-server - v0.12.0](../README.md) / [GraphQL](../modules/graphql.md) / ReportLink

# Class: ReportLink

[GraphQL](../modules/graphql.md).ReportLink

A type that describes a ReportLink

## Table of contents

### Constructors

- [constructor](graphql.reportlink.md#constructor)

### Properties

- [\_id](graphql.reportlink.md#_id)
- [createdAt](graphql.reportlink.md#createdat)
- [createdBy](graphql.reportlink.md#createdby)
- [description](graphql.reportlink.md#description)
- [externalUrl](graphql.reportlink.md#externalurl)
- [icon](graphql.reportlink.md#icon)
- [iconColor](graphql.reportlink.md#iconcolor)
- [month](graphql.reportlink.md#month)
- [name](graphql.reportlink.md#name)
- [promoted](graphql.reportlink.md#promoted)
- [published](graphql.reportlink.md#published)
- [updatedAt](graphql.reportlink.md#updatedat)
- [updatedBy](graphql.reportlink.md#updatedby)
- [year](graphql.reportlink.md#year)

### Accessors

- [linkRef](graphql.reportlink.md#linkref)

## Constructors

### constructor

\+ **new ReportLink**(`input?`: [*ReportLinkInput*](graphql.reportlinkinput.md)): [*ReportLink*](graphql.reportlink.md)

Constructs a new ReportLink

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`input?` | [*ReportLinkInput*](graphql.reportlinkinput.md) | Input    |

**Returns:** [*ReportLink*](graphql.reportlink.md)

Defined in: [graphql/resolvers/reportLink/types.ts:157](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L157)

## Properties

### \_id

• **\_id**: *string*

Defined in: [graphql/resolvers/reportLink/types.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L81)

___

### createdAt

• **createdAt**: Date

Date when the report was created

Defined in: [graphql/resolvers/reportLink/types.ts:105](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L105)

___

### createdBy

• **createdBy**: *string*

User display name for the user who created the report

Defined in: [graphql/resolvers/reportLink/types.ts:117](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L117)

___

### description

• **description**: *string*

Defined in: [graphql/resolvers/reportLink/types.ts:87](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L87)

___

### externalUrl

• **externalUrl**: *string*

External URL to the report (e.g. Google Drive, Sharepoint, etc.)

Defined in: [graphql/resolvers/reportLink/types.ts:99](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L99)

___

### icon

• **icon**: *string*

Defined in: [graphql/resolvers/reportLink/types.ts:90](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L90)

___

### iconColor

• **iconColor**: *string*

Defined in: [graphql/resolvers/reportLink/types.ts:93](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L93)

___

### month

• **month**: *number*

Zero-indexed month number

Defined in: [graphql/resolvers/reportLink/types.ts:135](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L135)

___

### name

• **name**: *string*

Defined in: [graphql/resolvers/reportLink/types.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L84)

___

### promoted

• `Optional` **promoted**: *boolean*

Whether the report is promoted or not (`true` or `false`). If the
report is promoted, it will be shown on the Reports front page.

Defined in: [graphql/resolvers/reportLink/types.ts:157](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L157)

___

### published

• `Optional` **published**: *boolean*

Whether the report is published or not (`true` or `false`)

Defined in: [graphql/resolvers/reportLink/types.ts:150](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L150)

___

### updatedAt

• **updatedAt**: Date

Date when the report was last updated

Defined in: [graphql/resolvers/reportLink/types.ts:111](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L111)

___

### updatedBy

• **updatedBy**: *string*

User display name for the user who last updated the report

Defined in: [graphql/resolvers/reportLink/types.ts:123](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L123)

___

### year

• **year**: *number*

Year number for the report in format `YYYY`

Defined in: [graphql/resolvers/reportLink/types.ts:129](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L129)

## Accessors

### linkRef

• get **linkRef**(): *string*

Link reference. The format is `YYYY_MM` where January is `1` (not zero-indexed).
If the report is not associated with a month (but with the year as a whole), the format is `YYYY`.

**Returns:** *string*

Defined in: [graphql/resolvers/reportLink/types.ts:142](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L142)
