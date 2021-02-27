[did-server](../README.md) / [graphql](../modules/graphql.md) / CreateOutlookCategoryResult

# Class: CreateOutlookCategoryResult

[graphql](../modules/graphql.md).CreateOutlookCategoryResult

## Hierarchy

* [*BaseResult*](graphql.baseresult.md)

  ↳ **CreateOutlookCategoryResult**

## Table of contents

### Constructors

- [constructor](graphql.createoutlookcategoryresult.md#constructor)

### Properties

- [data](graphql.createoutlookcategoryresult.md#data)
- [error](graphql.createoutlookcategoryresult.md#error)
- [success](graphql.createoutlookcategoryresult.md#success)

## Constructors

### constructor

\+ **new CreateOutlookCategoryResult**(): [*CreateOutlookCategoryResult*](graphql.createoutlookcategoryresult.md)

**Returns:** [*CreateOutlookCategoryResult*](graphql.createoutlookcategoryresult.md)

Inherited from: [BaseResult](graphql.baseresult.md)

## Properties

### data

• **data**: [*OutlookCategory*](graphql.outlookcategory.md)

Defined in: [server/graphql/resolvers/outlookCategory/types.ts:29](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/outlookCategory/types.ts#L29)

___

### error

• `Optional` **error**: [*Error*](graphql.error.md)

Inherited from: [BaseResult](graphql.baseresult.md).[error](graphql.baseresult.md#error)

Defined in: [server/graphql/resolvers/types.ts:26](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/types.ts#L26)

___

### success

• **success**: *boolean*

Inherited from: [BaseResult](graphql.baseresult.md).[success](graphql.baseresult.md#success)

Defined in: [server/graphql/resolvers/types.ts:23](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/types.ts#L23)
