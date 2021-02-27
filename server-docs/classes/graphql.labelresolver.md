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

\+ **new LabelResolver**(`_mongo`: [*MongoService*](services.mongoservice.md)): [*LabelResolver*](graphql.labelresolver.md)

Constructor for LabelResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_mongo` | [*MongoService*](services.mongoservice.md) | Mongo service    |

**Returns:** [*LabelResolver*](graphql.labelresolver.md)

Defined in: [server/graphql/resolvers/label/index.ts:13](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/label/index.ts#L13)

## Methods

### addOrUpdateLabel

▸ **addOrUpdateLabel**(`label`: [*LabelInput*](graphql.labelinput.md), `update`: *boolean*): *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Add or update label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelInput*](graphql.labelinput.md) | Label   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Defined in: [server/graphql/resolvers/label/index.ts:38](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/label/index.ts#L38)

___

### deleteLabel

▸ **deleteLabel**(`name`: *string*): *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Delete label by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<[*BaseResult*](graphql.baseresult.md)\>

Defined in: [server/graphql/resolvers/label/index.ts:55](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/label/index.ts#L55)

___

### labels

▸ **labels**(): *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Get labels

**Returns:** *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Defined in: [server/graphql/resolvers/label/index.ts:26](https://github.com/Puzzlepart/did/blob/5da6768a/server/graphql/resolvers/label/index.ts#L26)
