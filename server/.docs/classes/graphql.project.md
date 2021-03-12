[did-server - v0.9.9](../README.md) / [graphql](../modules/graphql.md) / Project

# Class: Project

[graphql](../modules/graphql.md).Project

## Table of contents

### Constructors

- [constructor](graphql.project.md#constructor)

### Properties

- [\_id](graphql.project.md#_id)
- [customer](graphql.project.md#customer)
- [customerKey](graphql.project.md#customerkey)
- [description](graphql.project.md#description)
- [externalSystemURL](graphql.project.md#externalsystemurl)
- [icon](graphql.project.md#icon)
- [inactive](graphql.project.md#inactive)
- [key](graphql.project.md#key)
- [labels](graphql.project.md#labels)
- [name](graphql.project.md#name)
- [outlookCategory](graphql.project.md#outlookcategory)
- [tag](graphql.project.md#tag)
- [webLink](graphql.project.md#weblink)

## Constructors

### constructor

\+ **new Project**(`input?`: [*ProjectInput*](graphql.projectinput.md)): [*Project*](graphql.project.md)

Constructs a new Project

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`input?` | [*ProjectInput*](graphql.projectinput.md) | Input    |

**Returns:** [*Project*](graphql.project.md)

Defined in: [server/graphql/resolvers/project/types.ts:87](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L87)

## Properties

### \_id

• **\_id**: *string*

Defined in: [server/graphql/resolvers/project/types.ts:51](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L51)

___

### customer

• `Optional` **customer**: [*Customer*](graphql.customer.md)

Defined in: [server/graphql/resolvers/project/types.ts:78](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L78)

___

### customerKey

• **customerKey**: *string*

Defined in: [server/graphql/resolvers/project/types.ts:60](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L60)

___

### description

• **description**: *string*

Defined in: [server/graphql/resolvers/project/types.ts:66](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L66)

___

### externalSystemURL

• `Optional` **externalSystemURL**: *string*

Defined in: [server/graphql/resolvers/project/types.ts:75](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L75)

___

### icon

• **icon**: *string*

Defined in: [server/graphql/resolvers/project/types.ts:69](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L69)

___

### inactive

• `Optional` **inactive**: *boolean*

Defined in: [server/graphql/resolvers/project/types.ts:84](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L84)

___

### key

• **key**: *string*

Defined in: [server/graphql/resolvers/project/types.ts:57](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L57)

___

### labels

• `Optional` **labels**: *string*[] \| [*LabelObject*](graphql.labelobject.md)[]

Defined in: [server/graphql/resolvers/project/types.ts:87](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L87)

___

### name

• **name**: *string*

Defined in: [server/graphql/resolvers/project/types.ts:63](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L63)

___

### outlookCategory

• `Optional` **outlookCategory**: [*OutlookCategory*](graphql.outlookcategory.md)

Defined in: [server/graphql/resolvers/project/types.ts:81](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L81)

___

### tag

• `Optional` **tag**: *string*

Defined in: [server/graphql/resolvers/project/types.ts:54](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L54)

___

### webLink

• `Optional` **webLink**: *string*

Defined in: [server/graphql/resolvers/project/types.ts:72](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L72)
