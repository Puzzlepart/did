[did-server - v0.9.11](../README.md) / [GraphQL](../modules/graphql.md) / OutlookCategoryResolver

# Class: OutlookCategoryResolver

[GraphQL](../modules/graphql.md).OutlookCategoryResolver

Resolver for `OutlookCategory`.

`MSGraphService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

## Table of contents

### Constructors

- [constructor](graphql.outlookcategoryresolver.md#constructor)

### Methods

- [createOutlookCategory](graphql.outlookcategoryresolver.md#createoutlookcategory)
- [outlookCategories](graphql.outlookcategoryresolver.md#outlookcategories)

## Constructors

### constructor

\+ **new OutlookCategoryResolver**(`_msgraph`: [*MSGraphService*](services.msgraphservice.md)): [*OutlookCategoryResolver*](graphql.outlookcategoryresolver.md)

Constructor for OutlookCategoryResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | Microsoft Graph service    |

**Returns:** [*OutlookCategoryResolver*](graphql.outlookcategoryresolver.md)

Defined in: [graphql/resolvers/outlookCategory/index.ts:21](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/outlookCategory/index.ts#L21)

## Methods

### createOutlookCategory

▸ **createOutlookCategory**(`category`: *string*): *Promise*<[*CreateOutlookCategoryResult*](graphql.createoutlookcategoryresult.md)\>

Create Outlook category

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category    |

**Returns:** *Promise*<[*CreateOutlookCategoryResult*](graphql.createoutlookcategoryresult.md)\>

Defined in: [graphql/resolvers/outlookCategory/index.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/outlookCategory/index.ts#L48)

___

### outlookCategories

▸ **outlookCategories**(): *Promise*<any[]\>

Get Outlook categories

**Returns:** *Promise*<any[]\>

Defined in: [graphql/resolvers/outlookCategory/index.ts:34](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/outlookCategory/index.ts#L34)
