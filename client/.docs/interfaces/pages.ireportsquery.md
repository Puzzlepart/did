[did-client - v0.11.5](../README.md) / [Pages](../modules/pages.md) / IReportsQuery

# Interface: IReportsQuery

[Pages](../modules/pages.md).IReportsQuery

## Hierarchy

* *IPivotItemProps*

  ↳ **IReportsQuery**

## Indexable

▪ [key: *string*]: *any*

## Table of contents

### Properties

- [exportFileName](pages.ireportsquery.md#exportfilename)
- [query](pages.ireportsquery.md#query)
- [reportLinkRef](pages.ireportsquery.md#reportlinkref)
- [reportLinks](pages.ireportsquery.md#reportlinks)
- [variables](pages.ireportsquery.md#variables)

## Properties

### exportFileName

• `Optional` **exportFileName**: *string*

Export file name template. {0} will be replaced
with the current date and time.

**`example`** TimeEntries-{0}.xlsx

Defined in: [pages/Reports/types.tsx:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L26)

___

### query

• **query**: *any*

GraphQL query

Defined in: [pages/Reports/types.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L13)

___

### reportLinkRef

• `Optional` **reportLinkRef**: *string*

Report link reference

Defined in: [pages/Reports/types.tsx:31](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L31)

___

### reportLinks

• `Optional` **reportLinks**: *ReportLink*[]

Report links for the current query. They
are matched by the `reportLinkRef` property
on the query to the `ref` property on the
report link.

Defined in: [pages/Reports/types.tsx:39](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L39)

___

### variables

• `Optional` **variables**: *any*

GraphQL query variables

Defined in: [pages/Reports/types.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/pages/Reports/types.tsx#L18)
