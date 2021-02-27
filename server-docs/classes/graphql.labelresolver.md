[did-server - v0.10.0](../README.md) / [graphql](../modules/graphql.md) / LabelResolver

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

Defined in: [server/graphql/resolvers/label/index.ts:16](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/label/index.ts#L16)

## Methods

### addOrUpdateLabel

▸ **addOrUpdateLabel**(`label`: [*LabelInput*](graphql.labelinput.md), `update`: *boolean*): *Promise*<BaseResult\>

Add or update label

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`label` | [*LabelInput*](graphql.labelinput.md) | Label   |
`update` | *boolean* | Update    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/label/index.ts:41](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/label/index.ts#L41)

___

### deleteLabel

▸ **deleteLabel**(`name`: *string*): *Promise*<BaseResult\>

Delete label by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/label/index.ts:58](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/label/index.ts#L58)

___

### labels

▸ **labels**(): *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Get labels

**Returns:** *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Defined in: [server/graphql/resolvers/label/index.ts:29](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/label/index.ts#L29)
