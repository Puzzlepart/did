[did-server - v0.12.0](../README.md) / [GraphQL](../modules/graphql.md) / ReportLinkInput

# Class: ReportLinkInput

[GraphQL](../modules/graphql.md).ReportLinkInput

Input object for ReportLink used in GraphQL mutation `addOrUpdateReportLink`

## Table of contents

### Constructors

- [constructor](graphql.reportlinkinput.md#constructor)

### Properties

- [description](graphql.reportlinkinput.md#description)
- [externalUrl](graphql.reportlinkinput.md#externalurl)
- [icon](graphql.reportlinkinput.md#icon)
- [iconColor](graphql.reportlinkinput.md#iconcolor)
- [month](graphql.reportlinkinput.md#month)
- [name](graphql.reportlinkinput.md#name)
- [promoted](graphql.reportlinkinput.md#promoted)
- [published](graphql.reportlinkinput.md#published)
- [year](graphql.reportlinkinput.md#year)

## Constructors

### constructor

\+ **new ReportLinkInput**(): [*ReportLinkInput*](graphql.reportlinkinput.md)

**Returns:** [*ReportLinkInput*](graphql.reportlinkinput.md)

## Properties

### description

• **description**: *string*

Defined in: [graphql/resolvers/reportLink/types.ts:19](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L19)

___

### externalUrl

• **externalUrl**: *string*

External URL to the report (e.g. Google Drive, Sharepoint, etc.)

Defined in: [graphql/resolvers/reportLink/types.ts:31](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L31)

___

### icon

• **icon**: *string*

Defined in: [graphql/resolvers/reportLink/types.ts:22](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L22)

___

### iconColor

• **iconColor**: *string*

Defined in: [graphql/resolvers/reportLink/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L25)

___

### month

• **month**: *number*

Zero-indexed month number

Defined in: [graphql/resolvers/reportLink/types.ts:43](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L43)

___

### name

• **name**: *string*

Defined in: [graphql/resolvers/reportLink/types.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L16)

___

### promoted

• `Optional` **promoted**: *boolean*

Whether the report is promoted or not (`true` or `false`). If the
report is promoted, it will be shown on the Reports front page.

Defined in: [graphql/resolvers/reportLink/types.ts:56](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L56)

___

### published

• `Optional` **published**: *boolean*

Whether the report is published or not (`true` or `false`).

Defined in: [graphql/resolvers/reportLink/types.ts:49](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L49)

___

### year

• **year**: *number*

Year number for the report in format `YYYY`

Defined in: [graphql/resolvers/reportLink/types.ts:37](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/types.ts#L37)
