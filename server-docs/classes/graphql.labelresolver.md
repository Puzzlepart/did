[did-server](../README.md) / [graphql](../modules/graphql.md) / LabelResolver

# Class: LabelResolver

[graphql](../modules/graphql.md).LabelResolver

## Table of contents

### Constructors

- [constructor](graphql.labelresolver.md#constructor)

### Methods

- [addOrUpdateLabel](graphql.labelresolver.md#addorupdatelabel)
- [deleteLabel](graphql.labelresolver.md#deletelabel)
- [labels](graphql.labelresolver.md#labels)

## Constructors

### constructor

\+ **new LabelResolver**(`_mongo`: *MongoService*): [*LabelResolver*](graphql.labelresolver.md)

Constructor for LabelResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_mongo` | *MongoService* | Mongo service    |

**Returns:** [*LabelResolver*](graphql.labelresolver.md)

Defined in: [server/graphql/resolvers/label/index.ts:13](https://github.com/Puzzlepart/did/blob/31669ccf/server/graphql/resolvers/label/index.ts#L13)

## Methods

### addOrUpdateLabel

▸ **addOrUpdateLabel**(`label`: *LabelInput*, `update`: *boolean*): *Promise*<BaseResult\>

Add or update label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | *LabelInput* | Label   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/label/index.ts:38](https://github.com/Puzzlepart/did/blob/31669ccf/server/graphql/resolvers/label/index.ts#L38)

___

### deleteLabel

▸ **deleteLabel**(`name`: *string*): *Promise*<BaseResult\>

Delete label by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/label/index.ts:55](https://github.com/Puzzlepart/did/blob/31669ccf/server/graphql/resolvers/label/index.ts#L55)

___

### labels

▸ **labels**(): *Promise*<LabelObject[]\>

Get labels

**Returns:** *Promise*<LabelObject[]\>

Defined in: [server/graphql/resolvers/label/index.ts:26](https://github.com/Puzzlepart/did/blob/31669ccf/server/graphql/resolvers/label/index.ts#L26)
