[did-server - v0.12.0](../README.md) / [GraphQL](../modules/graphql.md) / ReportLinkResolver

# Class: ReportLinkResolver

[GraphQL](../modules/graphql.md).ReportLinkResolver

Resolver for `ReportLink`.

`ReportLinkService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

## Table of contents

### Constructors

- [constructor](graphql.reportlinkresolver.md#constructor)

### Methods

- [addOrUpdateReportLink](graphql.reportlinkresolver.md#addorupdatereportlink)
- [deleteReportLink](graphql.reportlinkresolver.md#deletereportlink)
- [reportLinks](graphql.reportlinkresolver.md#reportlinks)

## Constructors

### constructor

\+ **new ReportLinkResolver**(`_reportLink`: [*ReportLinkService*](services.reportlinkservice.md)): [*ReportLinkResolver*](graphql.reportlinkresolver.md)

Constructor for ReportLinkResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_reportLink` | [*ReportLinkService*](services.reportlinkservice.md) | Label service    |

**Returns:** [*ReportLinkResolver*](graphql.reportlinkresolver.md)

Defined in: [graphql/resolvers/reportLink/index.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/index.ts#L23)

## Methods

### addOrUpdateReportLink

▸ **addOrUpdateReportLink**(`reportLink`: [*ReportLinkInput*](graphql.reportlinkinput.md), `update`: *boolean*): *Promise*<BaseResult\>

Add or update report link. The `update` flag determines if the
report link is added or updated. Permission scope `MANAGE_REPORT_LINKS`
is required.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reportLink` | [*ReportLinkInput*](graphql.reportlinkinput.md) | Report link   |
`update` | *boolean* | Update flag    |

**Returns:** *Promise*<BaseResult\>

Defined in: [graphql/resolvers/reportLink/index.ts:55](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/index.ts#L55)

___

### deleteReportLink

▸ **deleteReportLink**(`name`: *string*): *Promise*<BaseResult\>

Delete report link by name. Permission scope `MANAGE_REPORT_LINKS` is
required.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<BaseResult\>

Defined in: [graphql/resolvers/reportLink/index.ts:74](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/index.ts#L74)

___

### reportLinks

▸ **reportLinks**(`query`: [*ReportLinkQuery*](graphql.reportlinkquery.md)): *Promise*<[*ReportLink*](graphql.reportlink.md)[]\>

Get report links using the specified query.

#### Parameters:

Name | Type |
:------ | :------ |
`query` | [*ReportLinkQuery*](graphql.reportlinkquery.md) |

**Returns:** *Promise*<[*ReportLink*](graphql.reportlink.md)[]\>

Defined in: [graphql/resolvers/reportLink/index.ts:38](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/reportLink/index.ts#L38)
