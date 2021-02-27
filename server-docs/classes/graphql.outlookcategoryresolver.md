[did-server](../README.md) / [graphql](../modules/graphql.md) / OutlookCategoryResolver

# Class: OutlookCategoryResolver

[graphql](../modules/graphql.md).OutlookCategoryResolver

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
`_msgraph` | [*MSGraphService*](services.msgraphservice.md) | MSGraphService    |

**Returns:** [*OutlookCategoryResolver*](graphql.outlookcategoryresolver.md)

Defined in: [server/graphql/resolvers/outlookCategory/index.ts:12](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/outlookCategory/index.ts#L12)

## Methods

### createOutlookCategory

▸ **createOutlookCategory**(`category`: *string*): *Promise*<[*CreateOutlookCategoryResult*](graphql.createoutlookcategoryresult.md)\>

Create Outlook category

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`category` | *string* | Category    |

**Returns:** *Promise*<[*CreateOutlookCategoryResult*](graphql.createoutlookcategoryresult.md)\>

Defined in: [server/graphql/resolvers/outlookCategory/index.ts:39](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/outlookCategory/index.ts#L39)

___

### outlookCategories

▸ **outlookCategories**(): *Promise*<any[]\>

Get Outlook categories

**Returns:** *Promise*<any[]\>

Defined in: [server/graphql/resolvers/outlookCategory/index.ts:25](https://github.com/Puzzlepart/did/blob/4fe732f3/server/graphql/resolvers/outlookCategory/index.ts#L25)
