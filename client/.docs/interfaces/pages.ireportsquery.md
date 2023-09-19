[did-client - v0.12.0](../README.md) / [Pages](../modules/pages.md) / IReportsQuery

# Interface: IReportsQuery

[Pages](../modules/pages.md).IReportsQuery

## Hierarchy

* *ITabProps*

  ↳ **IReportsQuery**

## Table of contents

### Properties

- [description](pages.ireportsquery.md#description)
- [exportFileName](pages.ireportsquery.md#exportfilename)
- [icon](pages.ireportsquery.md#icon)
- [id](pages.ireportsquery.md#id)
- [periods](pages.ireportsquery.md#periods)
- [permission](pages.ireportsquery.md#permission)
- [query](pages.ireportsquery.md#query)
- [reportLinkRef](pages.ireportsquery.md#reportlinkref)
- [reportLinks](pages.ireportsquery.md#reportlinks)
- [text](pages.ireportsquery.md#text)
- [variables](pages.ireportsquery.md#variables)

## Properties

### description

• `Optional` **description**: *string*

An optional description for the tab to display in the tab list header.

Inherited from: void

Defined in: [client/components/Tabs/types.ts:72](https://github.com/Puzzlepart/did/blob/dev/client/components/Tabs/types.ts#L72)

___

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name template. {0} will be replaced
with the current date and time.

**`example`** TimeEntries-{0}.xlsx

Defined in: [client/pages/Reports/types.tsx:33](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L33)

___

### icon

• `Optional` **icon**: *string*

Icon to display for the tab in the tab list header.

Inherited from: void

Defined in: [client/components/Tabs/types.ts:77](https://github.com/Puzzlepart/did/blob/dev/client/components/Tabs/types.ts#L77)

___

### id

• **id**: *string*

Unique query identifier

Overrides: void

Defined in: [client/pages/Reports/types.tsx:15](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L15)

___

### periods

• `Optional` **periods**: IDatePeriod[]

Defined in: [client/pages/Reports/types.tsx:50](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L50)

___

### permission

• `Optional` **permission**: PermissionScope

Permission scope required to view the tab.

Inherited from: void

Defined in: [client/components/Tabs/types.ts:82](https://github.com/Puzzlepart/did/blob/dev/client/components/Tabs/types.ts#L82)

___

### query

• **query**: *any*

GraphQL query

Defined in: [client/pages/Reports/types.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L20)

___

### reportLinkRef

• `Optional` **reportLinkRef**: *string*

Report link reference. String in the format
`{year}_{month}`. This is used to match
report links to queries.

Defined in: [client/pages/Reports/types.tsx:40](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L40)

___

### reportLinks

• `Optional` **reportLinks**: *ReportLink*[]

Report links for the current query. They
are matched by the `reportLinkRef` property
on the query to the `ref` property on the
report link.

Defined in: [client/pages/Reports/types.tsx:48](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L48)

___

### text

• `Optional` **text**: *string*

An optional text for the tab to display in the tab list header.

Inherited from: void

Defined in: [client/components/Tabs/types.ts:67](https://github.com/Puzzlepart/did/blob/dev/client/components/Tabs/types.ts#L67)

___

### variables

• `Optional` **variables**: *any*

GraphQL query variables

Defined in: [client/pages/Reports/types.tsx:25](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L25)
