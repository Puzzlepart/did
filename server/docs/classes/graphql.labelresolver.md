[did-server - v0.10.0](../README.md) / [graphql](../modules/graphql.md) / LabelResolver

# Class: LabelResolver

[graphql](../modules/graphql.md).LabelResolver

Resolver for `Label`.

`LabelService` are injected through
_dependendy injection_.

**`see`** https://typegraphql.com/docs/dependency-injection.html

## Table of contents

### Constructors

- [constructor](graphql.labelresolver.md#constructor)

### Methods

- [addOrUpdateLabel](graphql.labelresolver.md#addorupdatelabel)
- [deleteLabel](graphql.labelresolver.md#deletelabel)
- [labels](graphql.labelresolver.md#labels)

## Constructors

### constructor

\+ **new LabelResolver**(`_label`: [*LabelService*](services.labelservice.md)): [*LabelResolver*](graphql.labelresolver.md)

Constructor for LabelResolver

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`_label` | [*LabelService*](services.labelservice.md) | Label service    |

**Returns:** [*LabelResolver*](graphql.labelresolver.md)

Defined in: [server/graphql/resolvers/label/index.ts:23](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/label/index.ts#L23)

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

Defined in: [server/graphql/resolvers/label/index.ts:48](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/label/index.ts#L48)

___

### deleteLabel

▸ **deleteLabel**(`name`: *string*): *Promise*<BaseResult\>

Delete label by name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | Name    |

**Returns:** *Promise*<BaseResult\>

Defined in: [server/graphql/resolvers/label/index.ts:64](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/label/index.ts#L64)

___

### labels

▸ **labels**(): *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Get labels

**Returns:** *Promise*<[*LabelObject*](graphql.labelobject.md)[]\>

Defined in: [server/graphql/resolvers/label/index.ts:36](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/label/index.ts#L36)
